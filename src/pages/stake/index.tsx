import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Banner from "../../components/Banner";
import TokenSegment from "../../components/TokenSegment";
import TokenSelect from "../../components/TokenSelect";
import useProtocolData from "../../utils/useProtocolData";
import config from "../../config/config.json";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";
import {Approved} from "../../utils/getApproved";

export default function StakeLeverage() {
    const protocolData = useProtocolData();

    const [data, setData] = useState<{
        stakeAPY: number;
        amountLocked: ethers.BigNumber;
        valueLocked: ethers.BigNumber;
        available: ethers.BigNumber;
        availableValue: ethers.BigNumber;
    } | null>(null);
    const [token, setToken] = useState<Approved>(config.approved[0]);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const stakeAPY = await protocolData.stakeAPY(token.address);
                const amountLocked = await protocolData.totalAmountLocked(token.address);
                const valueLocked = await protocolData.totalPriceLocked(token.address);
                const available = await protocolData.getAvailableBalance(token.address);
                const availableValue = await protocolData.getAvailableBalanceValue(token.address);
                setData({stakeAPY, amountLocked, valueLocked, available, availableValue});
            })();
        }
    }, [protocolData, token]);

    return (
        <div>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Stake APY", body: parseNumberFloat(data?.stakeAPY) + " %"},
                        {title: "Total Amount Locked", body: parseNumber(data?.amountLocked) + " DAI"},
                        {title: "Total Value Locked", body: "$ " + parseNumber(data?.valueLocked)},
                    ]}
                />
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Stake</h2>
            <div className="p-12 bg-neutral-900 rounded-xl glow flex items-start justify-evenly lg:space-y-0 space-y-20 pb-10 lg:flex-row flex-col my-5">
                <div className="lg:w-1/5 w-full">
                    <TokenSelect title="Token" />
                </div>
                <div className="lg:w-2/5 w-full lg:mx-10">
                    <TokenSegment
                        title="Stake"
                        keys={{
                            Available: parseNumber(data?.available) + " " + token.symbol,
                            "Available value": "$ " + parseNumber(data?.availableValue),
                        }}
                        cta="Stake"
                    />
                </div>
                <div className="lg:w-2/5 w-full">
                    <TokenSegment title="Redeem" keys={{Available: "25.36 tlDAI", "Total redeem value": "$ 25.36"}} cta="Redeem" />
                </div>
            </div>
        </div>
    );
}
