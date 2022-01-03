import Banner from "../../../components/Banner";
import TableHeader from "../tableHeader";
import TableRow from "../tableRow";

export default function DashboardLeverage() {
    const tableData = [
        {
            name: "Dai",
            symbol: "DAI",
            icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
        },
        {
            name: "wFantom",
            symbol: "wFTM",
            icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png",
        },
    ];

    return (
        <>
            <Banner placeholders={[{ title: "Total Value Locked", body: "$ 138,245,234" }]} />
            <TableHeader />
            {tableData.map((data) => (
                <TableRow name={data.name} symbol={data.symbol} icon={data.icon} tvl="373.73M" borrowed="431.84M" stakeAPY="7.23" yieldAPR="3.21" borrowAPY="16.23" />
            ))}
        </>
    );
}
