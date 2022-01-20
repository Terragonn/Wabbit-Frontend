import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import TokenSegment from "../../../components/TokenSegment";
import TokenSelect from "../../../components/TokenSelect";
import parseNumber, {parseNumberFloat} from "../../../utils/parseNumber";
import useChainData, {Approved} from "../../../utils/useChainData";
import useProtocolData from "../../../utils/useProtocolData";
import useProtocolMethods from "../../../utils/useProtocolMethods";

export default function LeverageLong() {
    const {config} = useChainData();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();

    const [data, setData] = useState<{
        borrowAPR: number | undefined;
        liquidity: ethers.BigNumber | undefined;
        utilizationRate: number | undefined;
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
    } | null>(null);
    const [token, setToken] = useState<Approved>(config.approved.filter((approved) => approved.oracle && approved.marginLongCollateral)[0]);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const borrowAPR = await protocolData.borrowAPR(token);
                const liquidity = await protocolData.liquidity(token);
                const utilizationRate = await protocolData.utilizationRate(token);

                const available = await protocolData.getAvailableBalance(token);
                const availableValue = await protocolData.getAvailableBalanceValue(token);

                const totalValue = await protocolData.getCollateralTotalValue();
                const collateralAmount = await protocolData.getCollateralAmount(token);
                const collateralValue = await protocolData.getCollateralValue(token);
                const minMarginLevel = await protocolData.minMarginLevel();
                const maxLeverage = await protocolData.maxLeverage();
                const minCollateral = await protocolData.minCollateralPrice();

                const marginLevel = await protocolData.marginLevel();
                const marginBalanceAll = await protocolData.marginBalanceAll();
                const currentLeverage = await protocolData.currentLeverage();
                const borrowedAmount = await protocolData.borrowedAmount(token);
                const borrowedValue = await protocolData.borrowedValue(token);
                const totalBorrowedValue = await protocolData.totalBorrowedValue();
                const interest = await protocolData.interest(token);
                const interestAll = await protocolData.interestAll();
                const initialBorrowedValue = await protocolData.initialBorrowedValue(token);
                const initialBorrowedValueAll = await protocolData.initialBorrowedValueAll();

                setData({
                    borrowAPR,
                    liquidity,
                    utilizationRate,
                    available,
                    availableValue,
                    totalValue,
                    collateralAmount,
                    collateralValue,
                    minMarginLevel,
                    maxLeverage,
                    minCollateral,
                    marginLevel,
                    marginBalanceAll,
                    currentLeverage,
                    borrowedAmount,
                    borrowedValue,
                    totalBorrowedValue,
                    interest,
                    interestAll,
                    initialBorrowedValue,
                    initialBorrowedValueAll,
                });
            })();
        }
    }, [protocolData, token]);

    return (
        <div>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Borrow APR", body: parseNumberFloat(data?.borrowAPR) + " %"},
                        {title: "Liquidity Available", body: parseNumber(data?.liquidity) + " " + token.symbol},
                        {title: "Utilization Rate", body: parseNumberFloat(data?.utilizationRate) + " %"},
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
                            keys={{
                                "Available amount": parseNumber(data?.available) + " " + token.symbol,
                                "Available value": "$ " + parseNumber(data?.availableValue),
                                "Minimum collateral to borrow": "$ " + parseNumber(data?.minCollateral),
                            }}
                            cta="Deposit"
                            token={token}
                            callback={(num, token) => protocolMethods?.depositCollateral(token.address, num)}
                        />
                    </div>
                    <div className="w-full lg:ml-6">
                        <TokenSegment
                            title="Withdraw"
                            keys={{
                                "Available amount": parseNumber(data?.collateralAmount) + " " + token.symbol,
                                "Available value": "$ " + parseNumber(data?.collateralValue),
                                "Min margin level": parseNumberFloat(data?.minMarginLevel),
                                "Maximum leverage": parseNumber(data?.maxLeverage) + "x",
                            }}
                            cta="Withdraw"
                            token={token}
                            callback={(num, token) => protocolMethods?.withdrawCollateral(token.address, num)}
                        />
                    </div>
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full mt-20">
                    <div className="w-full flex flex-col lg:items-center items-stretch justify-center mr-6">
                        <TokenSegment
                            title="Leverage"
                            keys={{
                                "Borrowed amount": parseNumber(data?.borrowedAmount) + " " + token.symbol,
                                "Accumulated interest": "$ " + parseNumber(data?.interest),
                                "Initial borrowed value": "$ " + parseNumber(data?.borrowedValue),
                                "Current borrowed value": "$ " + parseNumber(data?.initialBorrowedValue),
                            }}
                            cta="Leverage"
                            token={token}
                            callback={(num, token) => protocolMethods?.borrowLong(token.address, num)}
                        />
                        <div className="lg:w-4/5">
                            <Button onClick={async () => protocolMethods?.repayLongAll()}>Repay</Button>
                        </div>
                    </div>
                    <div className="w-full ml-6">
                        <TokenSegment
                            title="Total Leverage"
                            keys={{
                                "Margin level": parseNumberFloat(data?.marginLevel),
                                "Current leverage": parseNumberFloat(data?.currentLeverage) + "x",
                                "Total collateral value": "$ " + parseNumber(data?.totalValue),
                                "Total accumulated interest": "$ " + parseNumber(data?.interestAll),
                                "Total initial borrowed value": "$ " + parseNumber(data?.initialBorrowedValueAll),
                                "Total borrowed current value": "$ " + parseNumber(data?.totalBorrowedValue),
                                "Total margin balance": "$ " + parseNumber(data?.marginBalanceAll),
                            }}
                            cta="Repay All"
                            token={token}
                            callback={(num, token) => protocolMethods?.repayLongAll()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
