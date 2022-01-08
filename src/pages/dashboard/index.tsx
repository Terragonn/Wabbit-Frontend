import Banner from "../../components/Banner";
import TableHeader from "./tableHeader";
import TableRow from "./tableRow";
import TableCard from "./tableCard";
import config from "../../config/config.json";
import useProtocolData from "../../utils/useProtocolData";

export default function Dashboard() {
    const protocolData = useProtocolData();

    return (
        <>
            <div className="lg:block hidden">
                <Banner placeholders={[{title: "Total Value Locked", body: "$ 138,245,234"}]} />
                <TableHeader />
            </div>
            <div className="lg:block hidden">
                {config.approved.map((data, index) => {
                    return (
                        <TableRow
                            key={index}
                            name={data.name}
                            symbol={data.symbol}
                            icon={data.icon}
                            tvl={protocolData?.totalPoolPrice.toString() || "-"}
                            borrowed="431.84M"
                            stakeAPY="7.23"
                            borrowAPY="16.23"
                            yieldAPR="3.21"
                        />
                    );
                })}
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Dashboard</h2>
            <div className="lg:hidden my-10">
                {config.approved.map((data, index) => (
                    <TableCard
                        key={index}
                        name={data.name}
                        symbol={data.symbol}
                        icon={data.icon}
                        tvl="373.73M"
                        borrowed="431.84M"
                        stakeAPY="7.23"
                        borrowAPY="16.23"
                        yieldAPR="3.21"
                    />
                ))}
            </div>
        </>
    );
}
