import {ethers} from "ethers";
import {useEffect, useState} from "react";
import TokenSegment from "../../components/TokenSegment";
import parseNumber from "../../utils/parseNumber";
import {Approved} from "../../utils/useChainData";
import useProtocolData from "../../utils/useProtocolData";
import useProtocolMax from "../../utils/useProtocolMax";
import useProtocolMethods from "../../utils/useProtocolMethods";

export default function Wrap() {
    const protocolData = useProtocolData();
    const protocolMax = useProtocolMax();
    const protocolMethods = useProtocolMethods();

    const [tokenData, setTokenData] = useState<{nativeCoin: Approved | undefined; nativeCoinWrapped: Approved | undefined} | null>(null);

    const [data, setData] = useState<{
        availableNativeCoinAmount: ethers.BigNumber | undefined;
        availableWrappedTokenAmount: ethers.BigNumber | undefined;
        maxAvailableNativeCoinAmount: [ethers.BigNumber, number] | undefined;
        maxAvailableWrappedTokenAmount: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        if (!protocolData || !protocolMax) setTokenData(null);
        else {
            const nativeCoin = protocolData.nativeCoin();
            const nativeCoinWrapped = protocolData.nativeCoinWrapped();

            setTokenData({nativeCoin, nativeCoinWrapped});
        }
    }, [protocolData]);

    useEffect(() => {
        if (!protocolData || !protocolMax) setData(null);
        else {
            (async () => {
                const availableNativeCoinAmount = await protocolData.availableNativeCoinAmount();
                const availableWrappedTokenAmount = await protocolData.availableWrappedTokenAmount();

                const maxAvailableNativeCoinAmount = await protocolMax.availableNativeCoinAmount();
                const maxAvailableWrappedTokenAmount = await protocolMax.availableWrappedTokenAmount();

                setData({
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
                <h3 className="text-neutral-300 font-bold lg:text-center text-left text-2xl mb-4">Why Wrap?</h3>
                <p className="text-neutral-400 font-medium text-lg mb-4">
                    To use your {data ? <span className="font-bold text-neutral-300">({tokenData?.nativeCoin?.symbol})</span> : null} with Torque, you must first wrap it
                    into its ERC20 wrapped equivalent {data ? <span className="font-bold text-neutral-300">({tokenData?.nativeCoinWrapped?.symbol})</span> : null}. When
                    you are done, simply unwrap.
                </p>
                <p className="text-neutral-400 font-medium text-lg">
                    Make sure to keep enough {data ? <span className="font-bold text-neutral-300">({tokenData?.nativeCoin?.symbol})</span> : null} to pay for transaction
                    fees.
                </p>
                {tokenData && tokenData.nativeCoin && tokenData.nativeCoinWrapped ? (
                    <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full mt-16">
                        <div className="w-full lg:mr-6">
                            <TokenSegment
                                title="Wrap"
                                keys={[["Available", parseNumber(data?.availableNativeCoinAmount) + " " + tokenData.nativeCoin.symbol]]}
                                cta="Wrap"
                                token={tokenData.nativeCoin}
                                max={data?.maxAvailableNativeCoinAmount}
                                callback={protocolMethods ? (token, num) => protocolMethods?.wrap(num) : undefined}
                            />
                        </div>
                        <div className="w-full lg:ml-6">
                            <TokenSegment
                                title="Unwrap"
                                keys={[["Available", parseNumber(data?.availableWrappedTokenAmount) + " " + tokenData.nativeCoinWrapped.symbol]]}
                                cta="Unwrap"
                                token={tokenData.nativeCoinWrapped}
                                max={data?.maxAvailableWrappedTokenAmount}
                                callback={protocolMethods ? (token, num) => protocolMethods?.unwrap(num) : undefined}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}
