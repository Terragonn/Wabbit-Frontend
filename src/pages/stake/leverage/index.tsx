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
            <div className="p-5 bg-neutral-900 rounded-xl glow flex items-center justify-evenly space-x-10">
                <div className="w-1/5">
                    <h3 className="text-neutral-500 font-bold text-center text-xl">Stake</h3>
                    <TokenSelect />
                </div>
                <div className="w-2/5">
                    <h3 className="text-neutral-500 font-bold text-center text-xl">Deposit</h3>
                    <TokenSegment />
                </div>
                <div className="w-2/5">
                    <h3 className="text-neutral-500 font-bold text-center text-xl">Withdraw</h3>
                    <TokenSegment />
                </div>
            </div>
        </div>
    );
}
