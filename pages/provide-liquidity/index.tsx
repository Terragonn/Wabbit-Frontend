import type {NextPage} from "next";
import {ethers} from "ethers";
import {useEffect, useState} from "react";

import useContracts from "../../providers/useContracts";
import useProtocolMax from "../../providers/useProtocolMax";
import useProtocolData from "../../providers/useProtocolData";
import {Approved} from "../../providers/useChainData";
import useProtocolMethods from "../../providers/useProtocolMethods";

import Banner from "../../components/Banner";
import TokenSegment from "../../components/TokenSegment";
import TokenSelect from "../../components/TokenSelect";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";
import displayString from "../../utils/displayString";
import parseError from "../../utils/parseError";

const ProvideLiquidity: NextPage = () => {
    const contracts = useContracts();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();
    const protocolMax = useProtocolMax();

    const [token, setToken] = useState<Approved | null>(contracts?.config.approved.filter((approved) => approved.oracle && approved.leveragePool)[0] || null);

    const [bannerData, setBannerData] = useState<{
        provideLiquidityAPY: number | undefined;
        totalAmountLocked: ethers.BigNumber | undefined;
        totalValueLocked: ethers.BigNumber | undefined;
    } | null>(null);
    const [mainData, setMainData] = useState<{
        available: ethers.BigNumber | undefined;
        availableValue: ethers.BigNumber | undefined;
        totalPotentialLP: ethers.BigNumber | undefined;

        availableLP: ethers.BigNumber | undefined;
        LPRedeemAmount: ethers.BigNumber | undefined;
        LPRedeemValue: ethers.BigNumber | undefined;
    } | null>(null);
    const [maxData, setMaxData] = useState<{
        maxAvailableToken: [ethers.BigNumber, number] | undefined;
        maxAvailableLPToken: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        if (!protocolData || !token) setBannerData(null);
        else {
            (async () => {
                const provideLiquidityAPY = await parseError(async () => await protocolData.provideLiquidityAPY(token));
                const totalAmountLocked = await parseError(async () => await protocolData.totalTokenAmountLocked(token));
                const totalValueLocked = await parseError(async () => await protocolData.totalTokenPriceLocked(token));

                setBannerData({
                    provideLiquidityAPY,
                    totalAmountLocked,
                    totalValueLocked,
                });
            })();
        }
    }, [protocolData, token]);

    useEffect(() => {
        if (!protocolData || !token) setMainData(null);
        else {
            (async () => {
                const available = await parseError(async () => await protocolData.availableTokenAmount(token));
                const availableValue = await parseError(async () => await protocolData.availableTokenPrice(token));
                const totalPotentialLP = await parseError(async () => await protocolData.LPTokenAmount(token));

                const availableLP = await parseError(async () => await protocolData.liquidityProvidedTokenAmount(token));
                const LPRedeemAmount = await parseError(async () => await protocolData.redeemLiquidityTokenAmount(token));
                const LPRedeemValue = await parseError(async () => await protocolData.redeemLiquidityTokenPrice(token));

                setMainData({
                    totalPotentialLP,
                    available,
                    availableValue,
                    availableLP,
                    LPRedeemAmount,
                    LPRedeemValue,
                });
            })();
        }
    }, [protocolData, token]);

    useEffect(() => {
        if (!protocolMax || !token) setMaxData(null);
        else {
            (async () => {
                const maxAvailableToken = await parseError(async () => await protocolMax.availableToken(token));
                const maxAvailableLPToken = await parseError(async () => await protocolMax.availableLPToken(token));

                setMaxData({maxAvailableToken, maxAvailableLPToken});
            })();
        }
    }, [protocolMax, token]);

    return (
        <>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Provide Liquidity APY", body: parseNumberFloat(bannerData?.provideLiquidityAPY) + " %"},
                        {title: "Total Amount Locked", body: parseNumber(bannerData?.totalAmountLocked) + " " + displayString(token?.symbol)},
                        {title: "Total Value Locked", body: "$ " + parseNumber(bannerData?.totalValueLocked)},
                    ]}
                />
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Provide Liquidity</h2>
            <div className="p-12 bg-neutral-900 bg-opacity-75 rounded-xl glow flex flex-col items-start pb-10 my-10">
                <div className="w-full lg:mb-16 mb-20">
                    <TokenSelect title="Token" setToken={setToken} allowed={["leveragePool"]} contracts={contracts} />
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full lg:mr-6">
                        <TokenSegment
                            title="Provide Liquidity"
                            keys={[
                                ["Available", parseNumber(mainData?.available) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(mainData?.availableValue)],
                                [
                                    "Potential LP tokens",
                                    parseNumber(mainData?.totalPotentialLP) + " " + displayString(contracts?.config.LPPrefixSymbol) + displayString(token?.symbol),
                                ],
                            ]}
                            token={token}
                            contracts={contracts}
                            max={maxData?.maxAvailableToken}
                            callback={
                                protocolMethods && contracts
                                    ? [
                                          {
                                              cta: "Provide",
                                              fn: async (token, num) => await protocolMethods.provideLiquidity(token, num),
                                              approve: async (token, num) => await protocolMethods.approve(token.address, contracts.lPool.address, num),
                                          },
                                      ]
                                    : []
                            }
                        />
                    </div>
                    <div className="w-full lg:ml-6">
                        <TokenSegment
                            title="Redeem Liquidity"
                            keys={[
                                ["Available", parseNumber(mainData?.availableLP) + " " + displayString(contracts?.config.LPPrefixSymbol) + displayString(token?.symbol)],
                                ["Total redeem amount", parseNumber(mainData?.LPRedeemAmount) + " " + displayString(token?.symbol)],
                                ["Total redeem value", "$ " + parseNumber(mainData?.LPRedeemValue)],
                            ]}
                            token={token}
                            contracts={contracts}
                            max={maxData?.maxAvailableLPToken}
                            callback={
                                protocolMethods && contracts
                                    ? [
                                          {
                                              cta: "Redeem",
                                              fn: async (token, num) => await protocolMethods.redeem(token, num),
                                              approve: async (token, num) => {
                                                  const lpToken = await contracts.lPool.LPFromPT(token.address);
                                                  return await protocolMethods.approve(lpToken, contracts.lPool.address, num);
                                              },
                                          },
                                      ]
                                    : []
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProvideLiquidity;
