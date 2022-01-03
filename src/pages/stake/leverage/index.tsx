import Banner from "../../../components/Banner";
import TokenSegment from "../../../components/TokenSegment";
import TokenSelect from "../../../components/TokenSelect";

export default function StakeLeverage() {
    return (
        <div>
            <Banner
                placeholders={[
                    { title: "Stake APY", body: "25.36 %" },
                    { title: "Total Locked", body: "2,361,132 DAI" },
                    { title: "Total Value Locked", body: "$ 138,245,234" },
                ]}
            />
            <div className="p-12 bg-neutral-900 rounded-xl glow flex items-start justify-evenly space-x-10 pb-10">
                <div className="w-1/5">
                    <TokenSelect title="Token" />
                </div>
                <div className="w-2/5">
                    <TokenSegment title="Stake" keys={{ "Staked amount": "25.36 tlDAI", "Staked value": "$ 25.36" }} cta="Deposit" />
                </div>
                <div className="w-2/5">
                    <TokenSegment title="Redeem" keys={{ "Staked amount": "25.36 tlDAI", "Staked value": "$ 25.36" }} cta="Redeem" />
                </div>
            </div>
        </div>
    );
}
