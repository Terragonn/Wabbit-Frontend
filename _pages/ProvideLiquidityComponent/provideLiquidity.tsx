import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import {Contracts} from "../../providers/useContracts";
import {ProtocolData} from "../../providers/useProtocolData";
import {ProtocolMaxData} from "../../providers/useProtocolMax";
import {ProtocolMethods} from "../../providers/useProtocolMethods";

import TokenSegment from "../../components/TokenSegment";
import parseError from "../../utils/parseError";
import {parseNumber} from "../../utils/parseNumber";

export default function ProvideLiquidity({
    token,
    protocolData,
    protocolMethods,
    protocolMax,
    contracts,
}: {
    token: Approved;
    protocolData: ProtocolData;
    protocolMethods: ProtocolMethods;
    protocolMax: ProtocolMaxData;
    contracts: Contracts;
}) {
    const [data, setData] = useState<{
        available: ethers.BigNumber | undefined;
        availableValue: ethers.BigNumber | undefined;
        totalPotentialLP: ethers.BigNumber | undefined;
    } | null>(null);

    const [maxData, setMaxData] = useState<{
        maxAvailableToken: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const available = await parseError(async () => await protocolData.availableTokenAmount(token));
            const availableValue = await parseError(async () => await protocolData.availableTokenPrice(token));
            const totalPotentialLP = await parseError(async () => await protocolData.LPTokenAmount(token));

            setData({
                totalPotentialLP,
                available,
                availableValue,
            });
        })();
    }, [token, protocolData]);

    useEffect(() => {
        (async () => {
            const maxAvailableToken = await parseError(async () => await protocolMax.availableToken(token));
            setMaxData({maxAvailableToken});
        })();
    }, [token, protocolMax]);

    return (
        <TokenSegment
            title="Provide Liquidity"
            keys={[
                ["Available", parseNumber(data?.available) + " " + token.symbol],
                ["Available value", "$ " + parseNumber(data?.availableValue)],
                ["Potential LP tokens", parseNumber(data?.totalPotentialLP) + " " + contracts.config.LPPrefixSymbol + token.symbol],
            ]}
            token={token}
            max={maxData?.maxAvailableToken}
            callback={[
                {
                    cta: "Provide",
                    fn: async (token, num) => await protocolMethods.provideLiquidity(token, num),
                    approve: async (token, num) => await protocolMethods.approve(token.address, contracts.lPool.address, num),
                },
            ]}
        />
    );
}
