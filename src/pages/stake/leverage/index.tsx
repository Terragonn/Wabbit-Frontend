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
            <div className="p-5 bg-neutral-900 rounded-xl shadow-lg shadow-fuchsia-500/20">
                <TokenSelect />
                <TokenSegment />
                <TokenSegment />
            </div>
        </div>
    );
}
