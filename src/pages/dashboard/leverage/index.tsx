import Banner from "../../../components/Banner";
import TableHeader from "../tableHeader";

export default function DashboardLeverage() {
    return (
        <div className="w-5/6 mx-auto">
            <Banner placeholders={[{ title: "Total Value Locked", body: "$ 138,245,234" }]} />
            <TableHeader headers={["Name", "TVL", "Borrowed", "Stake APY", "Borrow APY"]} />
        </div>
    );
}
