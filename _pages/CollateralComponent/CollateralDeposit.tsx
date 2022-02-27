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

export default function CollateralDeposit({
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
        minCollateralPrice: ethers.BigNumber | undefined;
    } | null>(null);

    const [maxData, setMaxData] = useState<{
        maxAvailableToken: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const available = await parseError(async () => await protocolData.availableTokenAmount(token));
            const availableValue = await parseError(async () => await protocolData.availableTokenPrice(token));
            const minCollateralPrice = await parseError(async () => await protocolData.minCollateralPrice());

            setData({available, availableValue, minCollateralPrice});
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
            title="Deposit"
            keys={[
                ["Available amount", parseNumber(data?.available) + " " + token.symbol],
                ["Available value", "$ " + parseNumber(data?.availableValue)],
                ["", ""],
                ["Minimum collateral to borrow", "$ " + parseNumber(data?.minCollateralPrice)],
            ]}
            token={token}
            max={maxData?.maxAvailableToken}
            callback={[
                {
                    cta: "Deposit",
                    fn: async (token, num) => await protocolMethods.depositCollateral(token, num),
                    approve: async (token, num) => await protocolMethods.approve(token.address, contracts.marginLong.address, num),
                },
            ]}
        />
    );
}
