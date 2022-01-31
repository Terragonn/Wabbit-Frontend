import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import TokenSegment from "../../../components/TokenSegment";
import TokenSelect from "../../../components/TokenSelect";
import displayString from "../../../utils/displayString";
import parseError from "../../../utils/parseError";
import parseNumber, {parseNumberFloat, ROUND_CONSTANT} from "../../../utils/parseNumber";
import useChainData, {Approved} from "../../../utils/useChainData";
import useProtocolData from "../../../utils/useProtocolData";
import useProtocolMax from "../../../utils/useProtocolMax";
import useProtocolMethods from "../../../utils/useProtocolMethods";

export default function LeverageLong() {
    const {config} = useChainData();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();
    const protocolMax = useProtocolMax();

    const [data, setData] = useState<{
        borrowAPR: number | undefined;
        liquidity: ethers.BigNumber | undefined;
        totalCollateral: ethers.BigNumber | undefined;
        available: ethers.BigNumber | undefined;
        availableValue: ethers.BigNumber | undefined;
        totalValue: ethers.BigNumber | undefined;
        collateralAmount: ethers.BigNumber | undefined;
        collateralValue: ethers.BigNumber | undefined;
        minMarginLevel: number | undefined;
        maxLeverage: ethers.BigNumber | undefined;
        minCollateral: ethers.BigNumber | undefined;
        marginLevel: number | undefined;
        marginBalanceAll: ethers.BigNumber | undefined;
        currentLeverage: number | undefined;
        borrowedAmount: ethers.BigNumber | undefined;
        borrowedValue: ethers.BigNumber | undefined;
        totalBorrowedValue: ethers.BigNumber | undefined;
        interest: ethers.BigNumber | undefined;
        interestAll: ethers.BigNumber | undefined;
        initialBorrowedValue: ethers.BigNumber | undefined;
        initialBorrowedValueAll: ethers.BigNumber | undefined;
        maxAvailableToken: [ethers.BigNumber, number] | undefined;
        maxAvailableCollateral: [ethers.BigNumber, number] | undefined;
        maxAvailableLeverage: [ethers.BigNumber, number] | undefined;
    } | null>(null);
    const [token, setToken] = useState<Approved | null>(config?.approved.filter((approved) => approved.oracle && approved.marginLongCollateral)[0] || null);

    useEffect(() => {
        if (!protocolData || !protocolMax || !token) setData(null);
        else {
            (async () => {
                // const borrowAPR = await parseError(async () => await protocolData.borrowAPR(token));
                // const liquidity = await parseError(async () => await protocolData.liquidityProvidedTokenAmount(token));
                // const totalCollateral = await parseError(async () => await protocolData.totalCollateralPrice());
                // const available = await parseError(async () => await protocolData.availableTokenAmount(token));
                // const availableValue = await parseError(async () => await protocolData.availableTokenPrice(token));
                // const totalValue = await parseError(async () => await protocolData.getCollateralTotalValue());
                // const collateralAmount = await parseError(async () => await protocolData.getCollateralAmount(token));
                // const collateralValue = await parseError(async () => await protocolData.getCollateralValue(token));
                // const minMarginLevel = await parseError(async () => await protocolData.minMarginLevel());
                // const maxLeverage = await parseError(async () => await protocolData.maxLeverage());
                // const minCollateral = await parseError(async () => await protocolData.minCollateralPrice());
                // const marginLevel = await parseError(async () => await protocolData.marginLevel());
                // const marginBalanceAll = await parseError(async () => await protocolData.marginBalanceAll());
                // const currentLeverage = await parseError(async () => await protocolData.currentLeverage());
                // const borrowedAmount = await parseError(async () => await protocolData.borrowedAmount(token));
                // const borrowedValue = await parseError(async () => await protocolData.borrowedValue(token));
                // const totalBorrowedValue = await parseError(async () => await protocolData.totalBorrowedValue());
                // const interest = await parseError(async () => await protocolData.interest(token));
                // const interestAll = await parseError(async () => await protocolData.interestAll());
                // const initialBorrowedValue = await parseError(async () => await protocolData.initialBorrowedValue(token));
                // const initialBorrowedValueAll = await parseError(async () => await protocolData.initialBorrowedValueAll());
                // const maxAvailableToken = await parseError(async () => await protocolMax.availableToken(token));
                // const maxAvailableCollateral = await parseError(async () => await protocolMax.availableCollateral(token));
                // const maxAvailableLeverage = await parseError(async () => protocolMax.availableLeverage(token));
                // setData({
                //     borrowAPR,
                //     liquidity,
                //     totalCollateral,
                //     available,
                //     availableValue,
                //     totalValue,
                //     collateralAmount,
                //     collateralValue,
                //     minMarginLevel,
                //     maxLeverage,
                //     minCollateral,
                //     marginLevel,
                //     marginBalanceAll,
                //     currentLeverage,
                //     borrowedAmount,
                //     borrowedValue,
                //     totalBorrowedValue,
                //     interest,
                //     interestAll,
                //     initialBorrowedValue,
                //     initialBorrowedValueAll,
                //     maxAvailableToken,
                //     maxAvailableCollateral,
                //     maxAvailableLeverage,
                // });
            })();
        }
    }, [protocolData, protocolMax, token]);

    return (
        <div>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Borrow APR", body: parseNumberFloat(data?.borrowAPR) + " %"},
                        {title: "Liquidity Available", body: parseNumber(data?.liquidity) + " " + displayString(token?.symbol)},
                        {title: "Total Collateral", body: parseNumber(data?.totalCollateral) + " " + displayString(token?.symbol)},
                    ]}
                />
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Leverage Long</h2>
            <div className="p-12 bg-neutral-900 rounded-xl glow flex flex-col items-start justify-evenly pb-10 my-10">
                <div className="w-full lg:mb-16 mb-20">
                    <TokenSelect title="Token" setToken={setToken} allowed={["marginLongCollateral", "marginLongBorrow"]} />
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full lg:mr-6">
                        <TokenSegment
                            title="Deposit"
                            keys={[
                                ["Available amount", parseNumber(data?.available) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(data?.availableValue)],
                                ["Minimum collateral to borrow", "$ " + parseNumber(data?.minCollateral)],
                            ]}
                            cta="Deposit"
                            token={token}
                            max={data?.maxAvailableToken}
                            callback={(num, token) => protocolMethods?.depositCollateral(token.address, num)}
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
                            max={data?.maxAvailableCollateral}
                            callback={(num, token) => protocolMethods?.withdrawCollateral(token.address, num)}
                        />
                    </div>
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full mt-20">
                    <div className="w-full flex flex-col lg:items-center items-stretch justify-center mr-6">
                        <TokenSegment
                            title="Leverage"
                            keys={[
                                ["Borrowed amount", parseNumber(data?.borrowedAmount) + " " + displayString(token?.symbol)],
                                ["Accumulated interest", "$ " + parseNumber(data?.interest)],
                                ["Initial borrowed value", "$ " + parseNumber(data?.borrowedValue)],
                                ["Current borrowed value", "$ " + parseNumber(data?.initialBorrowedValue)],
                                ["Min margin level", parseNumberFloat(data?.minMarginLevel)],
                                ["Maximum leverage", parseNumber(data?.maxLeverage?.mul(ROUND_CONSTANT)) + "x"],
                            ]}
                            cta="Leverage"
                            token={token}
                            max={data?.maxAvailableLeverage}
                            callback={(num, token) => protocolMethods?.borrowLong(token.address, num)}
                        />
                        <div className="lg:w-4/5">
                            <Button onClick={async () => protocolMethods?.repayLongAll()}>Repay</Button>
                        </div>
                    </div>
                    <div className="w-full ml-6">
                        <TokenSegment
                            title="Total Leverage"
                            keys={[
                                ["Total account value", "$ " + parseNumber(data?.marginBalanceAll)],
                                ["Total collateral value", "$ " + parseNumber(data?.totalValue)],
                                ["Total accumulated interest", "$ " + parseNumber(data?.interestAll)],
                                ["Total initial borrowed value", "$ " + parseNumber(data?.initialBorrowedValueAll)],
                                ["Total borrowed current value", "$ " + parseNumber(data?.totalBorrowedValue)],
                                ["", ""],
                                ["Margin level", parseNumberFloat(data?.marginLevel)],
                                ["Current leverage", parseNumberFloat(data?.currentLeverage) + "x"],
                            ]}
                            cta="Repay All"
                            token={token}
                            hideInput={true}
                            callback={(num, token) => protocolMethods?.repayLongAll()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
