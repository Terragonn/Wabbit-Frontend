import type {NextPage} from "next";

import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Banner from "../../components/Banner";
import TokenSegment from "../../components/TokenSegment";
import TokenSelect from "../../components/TokenSelect";
import useProtocolData from "../../utils/providers/useProtocolData";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";
import useProtocolMethods from "../../utils/providers/useProtocolMethods";
import useChainData, {Approved} from "../../utils/providers/useChainData";
import displayString from "../../utils/displayString";
import parseError from "../../utils/parseError";
import useProtocolMax from "../../utils/providers/useProtocolMax";

const ProvideLiquidity: NextPage = () => {
    const {config} = useChainData();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();
    const protocolMax = useProtocolMax();

    const [data, setData] = useState<{
        provideLiquidityAPY: number | undefined;
        totalAmountLocked: ethers.BigNumber | undefined;
        totalValueLocked: ethers.BigNumber | undefined;

        available: ethers.BigNumber | undefined;
        availableValue: ethers.BigNumber | undefined;
        totalPotentialLP: ethers.BigNumber | undefined;

        availableLP: ethers.BigNumber | undefined;
        LPRedeemAmount: ethers.BigNumber | undefined;
        LPRedeemValue: ethers.BigNumber | undefined;

        maxAvailableToken: [ethers.BigNumber, number] | undefined;
        maxAvailableLPToken: [ethers.BigNumber, number] | undefined;
    } | null>(null);
    const [token, setToken] = useState<Approved | null>(config?.approved.filter((approved) => approved.oracle && approved.leveragePool)[0] || null);

    useEffect(() => {
        if (!protocolData || !protocolMax || !token) setData(null);
        else {
            (async () => {
                const provideLiquidityAPY = await parseError(async () => await protocolData.provideLiquidityAPY(token));
                const totalAmountLocked = await parseError(async () => await protocolData.totalTokenAmountLocked(token));
                const totalValueLocked = await parseError(async () => await protocolData.totalTokenPriceLocked(token));

                const available = await parseError(async () => await protocolData.availableTokenAmount(token));
                const availableValue = await parseError(async () => await protocolData.availableTokenPrice(token));
                const totalPotentialLP = await parseError(async () => await protocolData.LPTokenAmount(token));

                const availableLP = await parseError(async () => await protocolData.liquidityProvidedTokenAmount(token));
                const LPRedeemAmount = await parseError(async () => await protocolData.redeemLiquidityTokenAmount(token));
                const LPRedeemValue = await parseError(async () => await protocolData.redeemLiquidityTokenPrice(token));

                const maxAvailableToken = await parseError(async () => await protocolMax.availableToken(token));
                const maxAvailableLPToken = await parseError(async () => await protocolMax.availableLPToken(token));

                setData({
                    provideLiquidityAPY,
                    totalAmountLocked,
                    totalValueLocked,
                    totalPotentialLP,
                    available,
                    availableValue,
                    availableLP,
                    LPRedeemAmount,
                    LPRedeemValue,
                    maxAvailableToken,
                    maxAvailableLPToken,
                });
            })();
        }
    }, [protocolData, protocolMax, token]);

    return (
        <>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Provide Liquidity APY", body: parseNumberFloat(data?.provideLiquidityAPY) + " %"},
                        {title: "Total Amount Locked", body: parseNumber(data?.totalAmountLocked) + " " + displayString(token?.symbol)},
                        {title: "Total Value Locked", body: "$ " + parseNumber(data?.totalValueLocked)},
                    ]}
                />
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Provide Liquidity</h2>
            <div className="p-12 bg-neutral-900 rounded-xl glow flex flex-col items-start pb-10 my-10">
                <div className="w-full lg:mb-16 mb-20">
                    <TokenSelect title="Token" setToken={setToken} allowed={["leveragePool"]} />
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full lg:mr-6">
                        <TokenSegment
                            title="Provide Liquidity"
                            keys={[
                                ["Available", parseNumber(data?.available) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(data?.availableValue)],
                                ["Potential LP tokens", parseNumber(data?.totalPotentialLP) + " " + displayString(config?.LPPrefixSymbol) + displayString(token?.symbol)],
                            ]}
                            cta="Provide"
                            token={token}
                            max={data?.maxAvailableToken}
                            callback={protocolMethods ? (token, num) => protocolMethods?.provideLiquidity(token, num) : undefined}
                        />
                    </div>
                    <div className="w-full lg:ml-6">
                        <TokenSegment
                            title="Redeem"
                            keys={[
                                ["Available", parseNumber(data?.availableLP) + " " + displayString(config?.LPPrefixSymbol) + displayString(token?.symbol)],
                                ["Total redeem amount", parseNumber(data?.LPRedeemAmount) + " " + displayString(token?.symbol)],
                                ["Total redeem value", "$ " + parseNumber(data?.LPRedeemValue)],
                            ]}
                            cta="Redeem"
                            token={token}
                            max={data?.maxAvailableLPToken}
                            callback={protocolMethods ? (token, num) => protocolMethods?.redeem(token, num) : undefined}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProvideLiquidity;
