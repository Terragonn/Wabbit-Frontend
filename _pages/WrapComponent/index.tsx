import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import useContracts from "../../providers/useContracts";
import useProtocolData from "../../providers/useProtocolData";
import useProtocolMax from "../../providers/useProtocolMax";
import useProtocolMethods from "../../providers/useProtocolMethods";

import Information from "./information";
import Unwrap from "./unwrap";
import Wrap from "./wrap";

export default function WrapComponent() {
    const contracts = useContracts();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();
    const protocolMax = useProtocolMax();

    const [tokenData, setTokenData] = useState<{nativeCoin: Approved; wrappedCoin: Approved} | null>(null);

    useEffect(() => {
        if (!contracts) setTokenData(null);
        else {
            const nativeCoin = contracts.config.nativeCoin;
            const wrappedCoin = contracts.config.wrappedCoin;

            setTokenData({nativeCoin, wrappedCoin});
        }
    }, [contracts]);

    return (
        <>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Wrap</h2>
            <div className="lg:mt-20 p-12 bg-neutral-900 bg-opacity-75 rounded-xl glow flex flex-col items-start pb-10 my-10">
                {tokenData ? <Information nativeSymbol={tokenData.nativeCoin.symbol} wrappedSymbol={tokenData.wrappedCoin.symbol} /> : null}
                {tokenData && contracts && protocolData && protocolMethods && protocolMax ? (
                    <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full mt-16">
                        <div className="w-full lg:mr-6">
                            <Wrap nativeCoin={tokenData.nativeCoin} protocolData={protocolData} protocolMethods={protocolMethods} protocolMax={protocolMax} />
                        </div>
                        <div className="w-full lg:ml-6">
                            <Unwrap
                                wrappedCoin={tokenData.wrappedCoin}
                                protocolData={protocolData}
                                protocolMethods={protocolMethods}
                                protocolMax={protocolMax}
                                contracts={contracts}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}
