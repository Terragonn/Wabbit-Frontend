import type {NextPage} from "next";
import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../../utils/providers/useChainData";
import useProtocolData from "../../../utils/providers/useProtocolData";
import useProtocolMax from "../../../utils/providers/useProtocolMax";
import useProtocolMethods from "../../../utils/providers/useProtocolMethods";
import useContracts from "../../../utils/providers/useContracts";

import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import TokenSegment from "../../../components/TokenSegment";
import TokenSelect from "../../../components/TokenSelect";
import displayString from "../../../utils/displayString";
import parseError from "../../../utils/parseError";
import parseNumber, {parseNumberFloat, ROUND_CONSTANT} from "../../../utils/parseNumber";

const LeverageLong: NextPage = () => {
    const contracts = useContracts();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();
    const protocolMax = useProtocolMax();

    const [data, setData] = useState<{
        borrowAPR: number | undefined;
        liquidity: ethers.BigNumber | undefined;
        totalCollateralValue: ethers.BigNumber | undefined;

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

        maxAvailableToken: [ethers.BigNumber, number] | undefined;
        maxAvailableCollateral: [ethers.BigNumber, number] | undefined;
        maxAvailableLeverage: [ethers.BigNumber, number] | undefined;
    } | null>(null);
    const [token, setToken] = useState<Approved | null>(contracts?.config.approved.filter((approved) => approved.oracle && approved.marginLongCollateral)[0] || null);

    useEffect(() => {
        if (!protocolData || !protocolMax || !token) setData(null);
        else {
            (async () => {
                const borrowAPR = await parseError(async () => await protocolData.borrowAPR(token));
                const liquidity = await parseError(async () => await protocolData.liquidityProvidedTokenAmount(token));
                const totalCollateralValue = await parseError(async () => await protocolData.totalCollateralPrice());

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

                const maxAvailableToken = await parseError(async () => await protocolMax.availableToken(token));
                const maxAvailableCollateral = await parseError(async () => await protocolMax.availableCollateral(token));
                const maxAvailableLeverage = await parseError(async () => protocolMax.availableLeverage(token));
                setData({
                    borrowAPR,
                    liquidity,
                    totalCollateralValue,
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
                    maxAvailableToken,
                    maxAvailableCollateral,
                    maxAvailableLeverage,
                });
            })();
        }
    }, [protocolData, protocolMax, token]);

    return (
        <>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Borrow APR", body: parseNumberFloat(data?.borrowAPR) + " %"},
                        {title: "Liquidity Available", body: parseNumber(data?.liquidity) + " " + displayString(token?.symbol)},
                        {title: "Total Collateral Value", body: "$ " + parseNumber(data?.totalCollateralValue)},
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
                                ["Available amount", parseNumber(data?.available) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(data?.availableValue)],
                                ["", ""],
                                ["Minimum collateral to borrow", "$ " + parseNumber(data?.minCollateral)],
                            ]}
                            cta="Deposit"
                            token={token}
                            contracts={contracts}
                            max={data?.maxAvailableToken}
                            callback={protocolMethods ? (token, num) => protocolMethods?.depositCollateral(token, num) : undefined}
                        />
                    </div>
                    <div className="w-full lg:ml-6">
                        <TokenSegment
                            title="Withdraw"
                            keys={[
                                ["Available amount", parseNumber(data?.collateralAmount) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(data?.collateralValue)],
                            ]}
                            cta="Withdraw"
                            token={token}
                            contracts={contracts}
                            max={data?.maxAvailableCollateral}
                            callback={protocolMethods ? (token, num) => protocolMethods?.withdrawCollateral(token, num) : undefined}
                        />
                    </div>
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full mt-20">
                    <div className="w-full flex flex-col lg:items-center items-stretch mr-6">
                        <TokenSegment
                            title="Leverage"
                            keys={[
                                ["Borrowed amount", parseNumber(data?.borrowedAmount) + " " + displayString(token?.symbol)],
                                ["Initial borrowed value", "$ " + parseNumber(data?.initialBorrowedValue)],
                                ["Current borrowed value", "$ " + parseNumber(data?.currentBorrowedValue)],
                                ["", ""],
                                ["Min margin level", parseNumberFloat(data?.minMarginLevel)],
                                ["Maximum leverage", parseNumberFloat(data?.maxLeverage) + "x"],
                            ]}
                            cta="Leverage"
                            token={token}
                            contracts={contracts}
                            max={data?.maxAvailableLeverage}
                            callback={protocolMethods ? (token, num) => protocolMethods?.borrowLong(token, num) : undefined}
                        />
                        <div className="lg:w-4/5">
                            <Button onClick={async () => protocolMethods?.repayLongAll()}>Repay</Button>
                        </div>
                    </div>
                    <div className="w-full ml-6">
                        <TokenSegment
                            title="Total Leverage"
                            keys={[
                                ["Total account value", "$ " + parseNumber(data?.totalAccountValue)],
                                ["", ""],
                                ["Total collateral value", "$ " + parseNumber(data?.totalAccountCollateralValue)],
                                ["Total accumulated interest", "$ " + parseNumber(data?.totalAccountInterest)],
                                ["Total initial borrowed value", "$ " + parseNumber(data?.totalAccountInitialBorrowedValue)],
                                ["Total current borrowed value", "$ " + parseNumber(data?.totalAccountBorrowedValue)],
                                ["Liquidatable borrow price", "$ " + parseNumber(data?.liquidatableBorrowPrice)],
                                ["", ""],
                                ["Margin level", parseNumberFloat(data?.marginLevel)],
                                ["Current leverage", parseNumberFloat(data?.currentLeverage) + "x"],
                            ]}
                            cta="Repay All"
                            token={token}
                            contracts={contracts}
                            hideInput={true}
                            callback={protocolMethods ? (num, token) => protocolMethods?.repayLongAll() : undefined}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeverageLong;
