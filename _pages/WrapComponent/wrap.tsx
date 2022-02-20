import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import {ProtocolData} from "../../providers/useProtocolData";
import {ProtocolMaxData} from "../../providers/useProtocolMax";
import {ProtocolMethods} from "../../providers/useProtocolMethods";

import TokenSegment from "../../components/TokenSegment";
import parseError from "../../utils/parseError";
import {parseNumber} from "../../utils/parseNumber";

export default function Wrap({
    nativeCoin,
    protocolData,
    protocolMethods,
    protocolMax,
}: {
    nativeCoin: Approved;
    protocolData: ProtocolData;
    protocolMethods: ProtocolMethods;
    protocolMax: ProtocolMaxData;
}) {
    const [data, setData] = useState<{availableNativeCoinAmount: ethers.BigNumber | undefined} | null>(null);
    const [maxData, setMaxData] = useState<{maxAvailableNativeCoinAmount: [ethers.BigNumber, number] | undefined} | null>(null);

    useEffect(() => {
        (async () => {
            const availableNativeCoinAmount = await parseError(async () => await protocolData.availableNativeCoinAmount());
            setData({availableNativeCoinAmount});
        })();
    }, [nativeCoin, protocolMethods]);

    useEffect(() => {
        (async () => {
            const maxAvailableNativeCoinAmount = await parseError(async () => await protocolMax.availableNativeCoinAmount());
            setMaxData({maxAvailableNativeCoinAmount});
        })();
    }, [nativeCoin, protocolMax]);

    return (
        <TokenSegment
            title="Wrap"
            keys={[["Available", parseNumber(data?.availableNativeCoinAmount) + " " + nativeCoin.symbol]]}
            token={nativeCoin}
            max={maxData?.maxAvailableNativeCoinAmount}
            callback={[{cta: "Wrap", fn: async (token, num) => await protocolMethods.wrap(num)}]}
        />
    );
}
