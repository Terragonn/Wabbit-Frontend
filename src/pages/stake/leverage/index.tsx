import Banner from "../../../components/Banner";
import TokenSegment from "../../../components/TokenSegment";
import TokenSelect from "../../../components/TokenSelect";

export default function StakeLeverage() {
    return (
        <div>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        { title: "Stake APY", body: "25.36 %" },
                        { title: "Total Locked", body: "2,361,132 DAI" },
                        { title: "Total Value Locked", body: "$ 138,245,234" },
                    ]}
                />
            </div>
            <div className="p-12 bg-neutral-900 rounded-xl glow flex items-start justify-evenly lg:space-x-10 lg:space-y-0 space-y-20 pb-10 lg:flex-row flex-col lg:my-0 my-20">
                <div className="lg:w-1/5 w-full">
                    <TokenSelect title="Token" />
                </div>
                <div className="lg:w-2/5 w-full">
                    <TokenSegment title="Stake" keys={{ "Staked amount": "25.36 DAI", "Staked value": "$ 25.36" }} cta="Deposit" />
                </div>
                <div className="lg:w-2/5 w-full">
                    <TokenSegment title="Redeem" keys={{ "Redeem amount": "25.36 tlDAI", "Redeem value": "$ 25.36" }} cta="Redeem" />
                </div>
            </div>
        </div>
    );
}
