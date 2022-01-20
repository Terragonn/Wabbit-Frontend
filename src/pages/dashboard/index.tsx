import Banner from "../../components/Banner";
import TableHeader from "./tableHeader";
import TableRow from "./tableRow";
import TableCard from "./tableCard";
import useProtocolData from "../../utils/useProtocolData";
import parseNumber from "../../utils/parseNumber";
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import useChainData from "../../utils/useChainData";

export default function Dashboard() {
    const {blockExplorer, config} = useChainData();

    const protocolData = useProtocolData();

    const [data, setData] = useState<{tvl: ethers.BigNumber; borrowed: ethers.BigNumber} | null>(null);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const tvl = await protocolData.totalPoolPrice();
                const borrowed = await protocolData.totalBorrowedPrice();
                setData({tvl, borrowed});
            })();
        }
    }, [protocolData]);

    return (
        <>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Total Value Locked", body: "$ " + parseNumber(data?.tvl)},
                        {title: "Total Value Borrowed", body: "$ " + parseNumber(data?.borrowed)},
                    ]}
                />
                <TableHeader />
            </div>
            <div className="lg:block hidden">
                {config.approved
                    .filter((approved) => approved.leveragePool)
                    .map((data, index) => {
                        return <TableRow key={index} address={data.address} config={config} blockExplorer={blockExplorer} />;
                    })}
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Dashboard</h2>
            <div className="lg:hidden my-10">
                {config.approved.map((data, index) => (
                    <TableCard key={index} address={data.address} config={config} blockExplorer={blockExplorer} />
                ))}
            </div>
        </>
    );
}
