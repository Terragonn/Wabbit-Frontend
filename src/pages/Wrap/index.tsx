import {ethers} from "ethers";
import {useEffect, useState} from "react";
import TokenSegment from "../../components/TokenSegment";
import useProtocolData from "../../utils/useProtocolData";
import useProtocolMax from "../../utils/useProtocolMax";
import useProtocolMethods from "../../utils/useProtocolMethods";

export default function Wrap() {
    const protocolData = useProtocolData();
    const protocolMax = useProtocolMax();

    const [data, setData] = useState<{
        wrappedNativeCoinToken: string | undefined;
        availableNativeCoinAmount: ethers.BigNumber | undefined;
        availableWrappedTokenAmount: ethers.BigNumber | undefined;
    } | null>(null);

    useEffect(() => {
        if (!protocolData || !protocolMax) setData(null);
        else {
            (async () => {
                const wrappedNativeCoinToken = protocolData.wrappedNativeCoinToken();
                const availableNativeCoinAmount = await protocolData.availableNativeCoinAmount();
                const availableWrappedTokenAmount = await protocolData.availableWrappedTokenAmount();

                setData({wrappedNativeCoinToken, availableNativeCoinAmount, availableWrappedTokenAmount});
            })();
        }
    }, [protocolData, protocolMax]);

    return (
        <>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Wrap</h2>
            <div className="lg:mt-20 p-12 bg-neutral-900 rounded-xl glow flex flex-col items-start pb-10 my-10">
                <p className="text-white font-medium text-lg">
                    To use your native chain coins (e.g. ETH, FTM) with Torque, you must first wrap them into their ERC20 equivalent (e.g. wETH, wFTM).
                </p>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full mt-16">
                    <div className="w-full lg:mr-6">
                        {/* <TokenSegment
                            title="Wrap"
                            keys={[
                                ["Available", parseNumber(data?.available) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(data?.availableValue)],
                                ["Potential LP tokens", parseNumber(data?.totalPotentialLP) + " " + displayString(config?.LPPrefixSymbol) + displayString(token?.symbol)],
                            ]}
                            cta="Provide"
                            token={token}
                            max={data?.maxAvailableToken}
                            callback={protocolMethods ? (token, num) => protocolMethods?.provideLiquidity(token, num) : undefined}
                        /> */}
                    </div>
                    <div className="w-full lg:ml-6">
                        {/* <TokenSegment
                            title="Unwrap"
                            keys={[
                                ["Total redeem amount", parseNumber(data?.LPRedeemAmount) + " " + displayString(token?.symbol)],
                                ["Total redeem value", "$ " + parseNumber(data?.LPRedeemValue)],
                            ]}
                            cta="Redeem"
                            token={token}
                            max={data?.maxAvailableLPToken}
                            callback={protocolMethods ? (token, num) => protocolMethods?.redeem(token, num) : undefined}
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
}
