import {ethers} from "ethers";
import {useEffect, useState} from "react";
import TokenSegment from "../../components/TokenSegment";
import displayString from "../../utils/displayString";
import parseNumber from "../../utils/parseNumber";
import useProtocolData from "../../utils/useProtocolData";
import useProtocolMax from "../../utils/useProtocolMax";
import useProtocolMethods from "../../utils/useProtocolMethods";

export default function Wrap() {
    const protocolData = useProtocolData();
    const protocolMax = useProtocolMax();
    const protocolMethods = useProtocolMethods();

    const [data, setData] = useState<{
        nativeCoinName: string | undefined;
        nativeCoinWrappedName: string | undefined;
        nativeCoinWrappedAddress: string | undefined;
        availableNativeCoinAmount: ethers.BigNumber | undefined;
        availableWrappedTokenAmount: ethers.BigNumber | undefined;
        maxAvailableNativeCoinAmount: [ethers.BigNumber, number] | undefined;
        maxAvailableWrappedTokenAmount: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        if (!protocolData || !protocolMax) setData(null);
        else {
            (async () => {
                const nativeCoinName = protocolData.nativeCoinName();
                const nativeCoinWrappedName = protocolData.nativeCoinWrappedName();
                const nativeCoinWrappedAddress = protocolData.nativeCoinWrappedAddress();
                const availableNativeCoinAmount = await protocolData.availableNativeCoinAmount();
                const availableWrappedTokenAmount = await protocolData.availableWrappedTokenAmount();

                const maxAvailableNativeCoinAmount = await protocolMax.availableNativeCoinAmount();
                const maxAvailableWrappedTokenAmount = await protocolMax.availableWrappedTokenAmount();

                setData({
                    nativeCoinName,
                    nativeCoinWrappedName,
                    nativeCoinWrappedAddress,
                    availableNativeCoinAmount,
                    availableWrappedTokenAmount,
                    maxAvailableNativeCoinAmount,
                    maxAvailableWrappedTokenAmount,
                });
            })();
        }
    }, [protocolData, protocolMax]);

    return (
        <>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Wrap</h2>
            <div className="lg:mt-20 p-12 bg-neutral-900 rounded-xl glow flex flex-col items-start pb-10 my-10">
                <p className="text-neutral-400 font-medium text-lg">
                    To use your native chain coins {data ? <span className="font-bold text-neutral-300">({data?.nativeCoinName})</span> : null} with Torque, you must
                    first wrap them into their ERC20 wrapped equivalent{" "}
                    {data ? <span className="font-bold text-neutral-300">({data?.nativeCoinWrappedName})</span> : null}.
                </p>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full mt-16">
                    <div className="w-full lg:mr-6">
                        <TokenSegment
                            title="Wrap"
                            keys={[["Available", parseNumber(data?.availableNativeCoinAmount) + " " + displayString(data?.nativeCoinName)]]}
                            cta="Provide"
                            token={data ? data.nativeCoinWrappedAddress : ""}
                            max={data?.maxAvailableNativeCoinAmount}
                            callback={protocolMethods ? (token, num) => protocolMethods?.provideLiquidity(token, num) : undefined}
                        />
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
