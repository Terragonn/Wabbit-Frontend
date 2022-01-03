import Banner from "../../../components/Banner";

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
        </div>
    );
}
