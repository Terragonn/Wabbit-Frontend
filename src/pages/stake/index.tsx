import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Banner from "../../components/Banner";
import TokenSegment from "../../components/TokenSegment";
import TokenSelect from "../../components/TokenSelect";
import useProtocolData from "../../utils/useProtocolData";
import config from "../../config/config.json";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";

export default function StakeLeverage() {
    const protocolData = useProtocolData();

    const [data, setData] = useState<{stakeAPY: number; amountLocked: ethers.BigNumber; valueLocked: ethers.BigNumber} | null>(null);
    const [token, setToken] = useState(config.approved[0].address);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const stakeAPY = await protocolData.stakeAPY(tokenAddress);
                const amountLocked = ethers.BigNumber.from(0);
                const valueLocked = ethers.BigNumber.from(0);
                setData({stakeAPY, amountLocked, valueLocked});
            })();
        }
    }, [protocolData, tokenAddress]);

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
                            Available: "42.46 DAI",
                            "Staked amount": "25.36 DAI",
                            "Stake value": "$ 25.36",
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
