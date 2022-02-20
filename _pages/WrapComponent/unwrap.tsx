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

export default function Unwrap({
    wrappedCoin,
    protocolData,
    protocolMethods,
    protocolMax,
    contracts,
}: {
    wrappedCoin: Approved;
    protocolData: ProtocolData;
    protocolMethods: ProtocolMethods;
    protocolMax: ProtocolMaxData;
    contracts: Contracts;
}) {
    const [data, setData] = useState<{
        availableWrappedTokenAmount: ethers.BigNumber | undefined;
    } | null>(null);

    const [maxData, setMaxData] = useState<{
        maxAvailableWrappedTokenAmount: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const availableWrappedTokenAmount = await parseError(async () => await protocolData.availableTokenAmount(wrappedCoin));
            setData({availableWrappedTokenAmount});
        })();
    }, [wrappedCoin, protocolData]);

    useEffect(() => {
        (async () => {
            const maxAvailableWrappedTokenAmount = await parseError(async () => await protocolMax.availableToken(wrappedCoin));
            setMaxData({maxAvailableWrappedTokenAmount});
        })();
    }, [wrappedCoin, protocolData]);

    return (
        <TokenSegment
            title="Unwrap"
            keys={[["Available", parseNumber(data?.availableWrappedTokenAmount) + " " + wrappedCoin.symbol]]}
            token={wrappedCoin}
            max={maxData?.maxAvailableWrappedTokenAmount}
            callback={[
                {
                    cta: "Unwrap",
                    fn: async (token, num) => await protocolMethods.unwrap(num),
                    approve: async (token, num) => await protocolMethods.approve(token.address, contracts.converter.address, num),
                },
            ]}
        />
    );
}
