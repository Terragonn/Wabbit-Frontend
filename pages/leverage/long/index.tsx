import type {NextPage} from "next";
import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../../providers/useChainData";
import useProtocolData from "../../../providers/useProtocolData";
import useProtocolMax from "../../../providers/useProtocolMax";
import useProtocolMethods from "../../../providers/useProtocolMethods";
import useContracts from "../../../providers/useContracts";

import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import TokenSegment from "../../../components/TokenSegment";
import TokenSelect from "../../../components/TokenSelect";
import displayString from "../../../utils/displayString";
import parseError from "../../../utils/parseError";
import parseNumber, {parseNumberFloat} from "../../../utils/parseNumber";

const LeverageLong: NextPage = () => {
    const contracts = useContracts();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();
    const protocolMax = useProtocolMax();

    const [token, setToken] = useState<Approved | null>(contracts?.config.approved.filter((approved) => approved.oracle && approved.marginLongCollateral)[0] || null);

    const [bannerData, setBannerData] = useState<{
        borrowAPR: number | undefined;
        liquidity: ethers.BigNumber | undefined;
        totalCollateralValue: ethers.BigNumber | undefined;
    } | null>(null);
    const [mainData, setMainData] = useState<{
        available: ethers.BigNumber | undefined;
        availableValue: ethers.BigNumber | undefined;
        minCollateral: ethers.BigNumber | undefined;

        collateralAmount: ethers.BigNumber | undefined;
        collateralValue: ethers.BigNumber | undefined;

        borrowedAmount: ethers.BigNumber | undefined;
        currentBorrowedValue: ethers.BigNumber | undefined;
        initialBorrowedValue: ethers.BigNumber | undefined;
        minMarginLevel: number | undefined;
        maxLeverage: number | undefined;

        totalAccountValue: ethers.BigNumber | undefined;
        totalAccountCollateralValue: ethers.BigNumber | undefined;
        totalAccountInterest: ethers.BigNumber | undefined;
        totalAccountInitialBorrowedValue: ethers.BigNumber | undefined;
        totalAccountBorrowedValue: ethers.BigNumber | undefined;
        marginLevel: number | undefined;
        currentLeverage: number | undefined;
        liquidatableBorrowPrice: ethers.BigNumber;
    } | null>(null);
    const [maxData, setMaxData] = useState<{
        maxAvailableToken: [ethers.BigNumber, number] | undefined;
        maxAvailableCollateral: [ethers.BigNumber, number] | undefined;
        maxAvailableLeverage: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        if (!protocolData || !token) setBannerData(null);
        else {
            (async () => {
                const borrowAPR = await parseError(async () => await protocolData.borrowAPR(token));
                const liquidity = await parseError(async () => await protocolData.totalTokenAmountLiquidity(token));
                const totalCollateralValue = await parseError(async () => await protocolData.totalCollateralPrice());

                setBannerData({borrowAPR, liquidity, totalCollateralValue});
            })();
        }
    }, [protocolData, token]);

    useEffect(() => {
        if (!protocolData || !token) setMainData(null);
        else {
            (async () => {
                const available = await parseError(async () => await protocolData.availableTokenAmount(token));
                const availableValue = await parseError(async () => await protocolData.availableTokenPrice(token));
                const minCollateral = await parseError(async () => await protocolData.minCollateralPrice());

                const collateralAmount = await parseError(async () => await protocolData.accountCollateralAmount(token));
                const collateralValue = await parseError(async () => await protocolData.accountCollateralPrice(token));

                const borrowedAmount = await parseError(async () => await protocolData.accountBorrowedAmount(token));
                const currentBorrowedValue = await parseError(async () => await protocolData.accountBorrowedPrice(token));
                const initialBorrowedValue = await parseError(async () => await protocolData.initialBorrowedPrice(token));
                const minMarginLevel = await parseError(async () => await protocolData.minMarginLevel());
                const maxLeverage = await parseError(async () => await protocolData.maxLeverage());

                const totalAccountValue = await parseError(async () => await protocolData.accountTotalPrice());
                const totalAccountCollateralValue = await parseError(async () => await protocolData.accountCollateralTotalPrice());
                const totalAccountInterest = await parseError(async () => await protocolData.totalInterest());
                const totalAccountInitialBorrowedValue = await parseError(async () => await protocolData.totalInitialBorrowedPrice());
                const totalAccountBorrowedValue = await parseError(async () => await protocolData.accountBorrowedTotalPrice());
                const marginLevel = await parseError(async () => await protocolData.marginLevel());
                const currentLeverage = await parseError(async () => await protocolData.currentLeverage());
                const liquidatableBorrowPrice = await parseError(async () => await protocolData.liquidatablePrice());

                setMainData({
                    available,
                    availableValue,
                    minCollateral,
                    collateralAmount,
                    collateralValue,
                    borrowedAmount,
                    currentBorrowedValue,
                    initialBorrowedValue,
                    minMarginLevel,
                    maxLeverage,
                    totalAccountValue,
                    totalAccountCollateralValue,
                    totalAccountInterest,
                    totalAccountInitialBorrowedValue,
                    totalAccountBorrowedValue,
                    marginLevel,
                    currentLeverage,
                    liquidatableBorrowPrice,
                });
            })();
        }
    }, [protocolData, token]);

    useEffect(() => {
        if (!protocolMax || !token) setMaxData(null);
        else {
            (async () => {
                const maxAvailableToken = await parseError(async () => await protocolMax.availableToken(token));
                const maxAvailableCollateral = await parseError(async () => await protocolMax.availableCollateral(token));
                const maxAvailableLeverage = await parseError(async () => protocolMax.availableLeverage(token));

                setMaxData({
                    maxAvailableToken,
                    maxAvailableCollateral,
                    maxAvailableLeverage,
                });
            })();
        }
    }, [protocolMax, token]);

    return (
        <>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Borrow APR", body: parseNumberFloat(bannerData?.borrowAPR) + " %"},
                        {title: "Liquidity Available", body: parseNumber(bannerData?.liquidity) + " " + displayString(token?.symbol)},
                        {title: "Total Collateral Value", body: "$ " + parseNumber(bannerData?.totalCollateralValue)},
                    ]}
                />
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Leverage Long</h2>
            <div className="p-12 bg-neutral-900 bg-opacity-75 rounded-xl glow flex flex-col items-start pb-10 my-10">
                <div className="w-full lg:mb-16 mb-20">
                    <TokenSelect title="Token" setToken={setToken} allowed={["marginLongCollateral", "marginLongBorrow"]} contracts={contracts} />
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full lg:mr-6">
                        <TokenSegment
                            title="Deposit"
                            keys={[
                                ["Available amount", parseNumber(mainData?.available) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(mainData?.availableValue)],
                                ["", ""],
                                ["Minimum collateral to borrow", "$ " + parseNumber(mainData?.minCollateral)],
                            ]}
                            token={token}
                            contracts={contracts}
                            max={maxData?.maxAvailableToken}
                            callback={
                                protocolMethods && contracts
                                    ? [
                                          {
                                              cta: "Deposit",
                                              fn: async (token, num) => await protocolMethods.depositCollateral(token, num),
                                              approve: async (token, num) => await protocolMethods.approve(token.address, contracts.marginLong.address, num),
                                          },
                                      ]
                                    : []
                            }
                        />
                    </div>
                    <div className="w-full lg:ml-6">
                        <TokenSegment
                            title="Withdraw"
                            keys={[
                                ["Available amount", parseNumber(mainData?.collateralAmount) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(mainData?.collateralValue)],
                            ]}
                            token={token}
                            contracts={contracts}
                            max={maxData?.maxAvailableCollateral}
                            callback={protocolMethods ? [{cta: "Withdraw", fn: async (token, num) => await protocolMethods.withdrawCollateral(token, num)}] : []}
                        />
                    </div>
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full mt-20">
                    <div className="w-full flex flex-col lg:items-center items-stretch mr-6">
                        <TokenSegment
                            title="Leverage"
                            keys={[
                                ["Borrowed amount", parseNumber(mainData?.borrowedAmount) + " " + displayString(token?.symbol)],
                                ["Initial borrowed value", "$ " + parseNumber(mainData?.initialBorrowedValue)],
                                ["Current borrowed value", "$ " + parseNumber(mainData?.currentBorrowedValue)],
                                ["", ""],
                                ["Min margin level", parseNumberFloat(mainData?.minMarginLevel)],
                                ["Maximum leverage", parseNumberFloat(mainData?.maxLeverage) + "x"],
                            ]}
                            token={token}
                            contracts={contracts}
                            max={maxData?.maxAvailableLeverage}
                            callback={
                                protocolMethods && contracts
                                    ? [
                                          {cta: "Leverage", fn: async (token, num) => await protocolMethods.borrowLong(token, num)},
                                          {cta: "Repay", fn: async (token, num) => await protocolMethods.repayLong(token)},
                                      ]
                                    : []
                            }
                        />
                    </div>
                    <div className="w-full ml-6">
                        <TokenSegment
                            title="Total Leverage"
                            keys={[
                                ["Total account value", "$ " + parseNumber(mainData?.totalAccountValue)],
                                ["", ""],
                                ["Total collateral value", "$ " + parseNumber(mainData?.totalAccountCollateralValue)],
                                ["Total accumulated interest", "$ " + parseNumber(mainData?.totalAccountInterest)],
                                ["Total initial borrowed value", "$ " + parseNumber(mainData?.totalAccountInitialBorrowedValue)],
                                ["Total current borrowed value", "$ " + parseNumber(mainData?.totalAccountBorrowedValue)],
                                ["", ""],
                                ["Margin level", parseNumberFloat(mainData?.marginLevel)],
                                ["Current leverage", parseNumberFloat(mainData?.currentLeverage) + "x"],
                                ["Liquidatable borrowed price", "$ " + parseNumber(mainData?.liquidatableBorrowPrice)],
                            ]}
                            token={token}
                            contracts={contracts}
                            hideInput={true}
                            callback={protocolMethods ? [{cta: "Repay All", fn: async (num, token) => await protocolMethods?.repayLongAll()}] : []}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeverageLong;
