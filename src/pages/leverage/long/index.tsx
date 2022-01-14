import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import TokenSegment from "../../../components/TokenSegment";
import TokenSelect from "../../../components/TokenSelect";
import config from "../../../config/config.json";
import {Approved} from "../../../utils/getApproved";
import parseNumber, {parseNumberFloat} from "../../../utils/parseNumber";
import useProtocolData from "../../../utils/useProtocolData";

export default function LeverageLong() {
    const protocolData = useProtocolData();

    const [data, setData] = useState<{
        borrowAPR: number;
        liquidity: ethers.BigNumber;
        utilizationRate: number;
        available: ethers.BigNumber;
        availableValue: ethers.BigNumber;
        totalValue: ethers.BigNumber;
        collateralAmount: ethers.BigNumber;
        collateralValue: ethers.BigNumber;
        minMarginLevel: number;
        maxLeverage: ethers.BigNumber;
        minCollateral: ethers.BigNumber;
    } | null>(null);
    const [token, setToken] = useState<Approved>(config.approved[0]);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const borrowAPR = await protocolData.borrowAPR(token.address);
                const liquidity = await protocolData.liquidity(token.address);
                const utilizationRate = await protocolData.utilizationRate(token.address);

                const available = await protocolData.getAvailableBalance(token.address);
                const availableValue = await protocolData.getAvailableBalanceValue(token.address);

                const totalValue = await protocolData.getCollateralTotalValue();
                const collateralAmount = await protocolData.getCollateralAmount(token.address);
                const collateralValue = await protocolData.getCollateralValue(token.address);
                const minMarginLevel = await protocolData.minMarginLevel();
                const maxLeverage = await protocolData.maxLeverage();
                const minCollateral = await protocolData.minCollateralPrice();

                const marginLevel = await protocolData.marginLevel();
                const marginBalance = await protocolData.marginBalance();
                const currentLeverage = await protocolData.currentLeverage();
                const borrowedAmount = await protocolData.borrowedAmount(token.address); // This is error
                const borrowedValue = await protocolData.borrowedValue(token.address);
                const interest = await protocolData.interest();
                const totalBorrowedValue = await protocolData.totalBorrowedValue();

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
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Leverage</h2>
            <div className="p-12 bg-neutral-900 rounded-xl glow flex flex-col items-start justify-evenly pb-10 my-10">
                <div className="w-full lg:mb-16 mb-20">
                    <TokenSelect title="Token" setToken={setToken} />
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full">
                        <TokenSegment
                            title="Deposit"
                            keys={{
                                Available: parseNumber(data?.available) + " " + token.symbol,
                                "Available value": "$ " + parseNumber(data?.availableValue),
                                "Total value": "$ " + parseNumber(data?.totalValue),
                            }}
                            cta="Deposit"
                            token={token}
                        />
                    </div>
                    <div className="w-full lg:mx-12">
                        <TokenSegment
                            title="Withdraw"
                            keys={{
                                Available: parseNumber(data?.collateralAmount) + " " + token.symbol,
                                "Available value": "$ " + parseNumber(data?.collateralValue),
                                "Min margin level": parseNumberFloat(data?.minMarginLevel),
                                "Maximum leverage": data?.maxLeverage.toString() + "x",
                                "Minimum collateral": "$ " + parseNumber(data?.minCollateral),
                            }}
                            cta="Withdraw"
                            token={token}
                        />
                    </div>
                    <div className="w-full flex flex-col lg:items-center items-stretch justify-center">
                        <TokenSegment
                            title="Leverage"
                            keys={{
                                "Margin level": "1.35",
                                "Margin balance": "$ 25.36",
                                "Current leverage": "20x",
                                Borrowed: "27.45 DAI",
                                "Borrowed value": "$ " + "415.36",
                                "Accumulated interest": "$ " + "124.98",
                                "Total borrowed value": "$ " + "23.45",
                            }}
                            cta="Borrow"
                            token={token}
                        />
                        <div className="lg:w-4/5">
                            <Button>Repay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
