import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import TokenSegment from "../../../components/TokenSegment";
import TokenSelect from "../../../components/TokenSelect";
import config from "../../../config/config.json";
import {Approved} from "../../../utils/getApproved";
import parseNumber from "../../../utils/parseNumber";
import useProtocolData from "../../../utils/useProtocolData";

export default function LeverageLong() {
    const protocolData = useProtocolData();

    const [data, setData] = useState<{
        available: ethers.BigNumber;
        availableValue: ethers.BigNumber;
    } | null>(null);
    const [token, setToken] = useState<Approved>(config.approved[0]);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const available = await protocolData.getAvailableBalance(token.address);
                const availableValue = await protocolData.getAvailableBalanceValue(token.address);

                setData({available, availableValue});
            })();
        }
    }, [protocolData, token]);

    return (
        <div>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Borrow APR", body: "25.36 %"},
                        {title: "Liquidity Available", body: "2,361,132 DAI"},
                        {title: "Utilization Rate", body: "67.34 %"},
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
                            }}
                            cta="Deposit"
                            token={token}
                        />
                    </div>
                    <div className="w-full lg:mx-12">
                        <TokenSegment
                            title="Withdraw"
                            keys={{Available: "25.36 tlDAI", "Min margin level": "1.25", "Maximum leverage": "10" + "x", "Minimum collateral": "$ " + "20.23"}}
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
                                Borrowed: "27.45 DAI",
                                "Borrowed value": "$ " + "415.36",
                            }}
                            cta="Leverage"
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
