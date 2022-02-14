import type {NextPage} from "next";
import {ethers} from "ethers";
import {useEffect, useState} from "react";

import useContracts from "../../providers/useContracts";
import {Approved} from "../../providers/useChainData";
import useProtocolData from "../../providers/useProtocolData";
import useProtocolMax from "../../providers/useProtocolMax";
import useProtocolMethods from "../../providers/useProtocolMethods";

import TokenSegment from "../../components/TokenSegment";
import parseNumber from "../../utils/parseNumber";
import parseError from "../../utils/parseError";

const Wrap: NextPage = () => {
    const contracts = useContracts();

    const protocolData = useProtocolData();
    const protocolMax = useProtocolMax();
    const protocolMethods = useProtocolMethods();

    const [tokenData, setTokenData] = useState<{nativeCoin: Approved; nativeCoinWrapped: Approved} | null>(null);

    const [mainData, setMainData] = useState<{
        availableNativeCoinAmount: ethers.BigNumber | undefined;
        availableWrappedTokenAmount: ethers.BigNumber | undefined;
    } | null>(null);
    const [maxData, setMaxData] = useState<{
        maxAvailableNativeCoinAmount: [ethers.BigNumber, number] | undefined;
        maxAvailableWrappedTokenAmount: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        if (!contracts) setTokenData(null);
        else {
            const nativeCoin = contracts.config.nativeCoin;
            const nativeCoinWrapped = contracts.config.wrappedCoin;

            setTokenData({nativeCoin, nativeCoinWrapped});
        }
    }, [contracts]);

    useEffect(() => {
        if (!protocolMax || !tokenData) setMainData(null);
        else {
            (async () => {
                const maxAvailableNativeCoinAmount = await parseError(async () => await protocolMax.availableNativeCoinAmount());
                const maxAvailableWrappedTokenAmount = await parseError(async () => await protocolMax.availableToken(tokenData.nativeCoinWrapped));

                setMaxData({
                    maxAvailableNativeCoinAmount,
                    maxAvailableWrappedTokenAmount,
                });
            })();
        }
    }, [protocolMax, tokenData]);

    useEffect(() => {
        if (!protocolData || !tokenData) setMainData(null);
        else {
            (async () => {
                const availableNativeCoinAmount = await parseError(async () => await protocolData.availableNativeCoinAmount());
                const availableWrappedTokenAmount = await parseError(async () => await protocolData.availableTokenAmount(tokenData.nativeCoinWrapped));

                setMainData({
                    availableNativeCoinAmount,
                    availableWrappedTokenAmount,
                });
            })();
        }
    }, [protocolData, tokenData]);

    return (
        <>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Wrap</h2>
            <div className="lg:mt-20 p-12 bg-neutral-900 bg-opacity-75 rounded-xl glow flex flex-col items-start pb-10 my-10">
                <h3 className="text-neutral-300 font-bold lg:text-center text-left text-2xl mb-4">Why Wrap?</h3>
                <p className="text-neutral-400 font-medium text-lg mb-4">
                    To use your {mainData ? <span className="font-bold text-neutral-300">({tokenData?.nativeCoin?.symbol})</span> : null} with Torque, you must first wrap
                    it into its ERC20 wrapped equivalent {mainData ? <span className="font-bold text-neutral-300">({tokenData?.nativeCoinWrapped?.symbol})</span> : null}.
                    When you are done, simply unwrap.
                </p>
                <p className="text-neutral-400 font-medium text-lg">
                    Make sure to keep enough {mainData ? <span className="font-bold text-neutral-300">({tokenData?.nativeCoin?.symbol})</span> : null} to pay for
                    transaction fees.
                </p>
                {tokenData ? (
                    <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full mt-16">
                        <div className="w-full lg:mr-6">
                            <TokenSegment
                                title="Wrap"
                                keys={[["Available", parseNumber(mainData?.availableNativeCoinAmount) + " " + tokenData.nativeCoin.symbol]]}
                                cta="Wrap"
                                token={tokenData.nativeCoin}
                                contracts={contracts}
                                max={maxData?.maxAvailableNativeCoinAmount}
                                callback={protocolMethods ? (token, num) => protocolMethods?.wrap(num) : undefined}
                            />
                        </div>
                        <div className="w-full lg:ml-6">
                            <TokenSegment
                                title="Unwrap"
                                keys={[["Available", parseNumber(mainData?.availableWrappedTokenAmount) + " " + tokenData.nativeCoinWrapped.symbol]]}
                                cta="Unwrap"
                                token={tokenData.nativeCoinWrapped}
                                contracts={contracts}
                                max={maxData?.maxAvailableWrappedTokenAmount}
                                callback={protocolMethods ? (token, num) => protocolMethods?.unwrap(num) : undefined}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default Wrap;
