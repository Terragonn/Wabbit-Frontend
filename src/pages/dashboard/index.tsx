import Banner from "../../components/Banner";
import TableHeader from "./tableHeader";
import TableRow from "./tableRow";
import TableCard from "./tableCard";
import useProtocolData from "../../utils/useProtocolData";
import parseNumber from "../../utils/parseNumber";
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import useChainData from "../../utils/useChainData";
import parseError from "../../utils/parseError";

export default function Dashboard() {
    const {blockExplorer, config} = useChainData();

    const protocolData = useProtocolData();

    const [data, setData] = useState<{tvl: ethers.BigNumber | undefined; borrowed: ethers.BigNumber | undefined} | null>(null);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const tvl = await parseError(async () => await protocolData.totalPoolPrice());
                const borrowed = await parseError(async () => await protocolData.totalBorrowedPrice());
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
                {config
                    ? config.approved
                          .filter((approved) => approved.oracle && approved.leveragePool)
                          .map((data, index) => <TableRow key={index} approved={data} config={config} blockExplorer={blockExplorer} />)
                    : null}
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Dashboard</h2>
            <div className="lg:hidden my-10">
                {config
                    ? config.approved
                          .filter((approved) => approved.oracle && approved.leveragePool)
                          .map((data, index) => <TableCard key={index} approved={data} config={config} blockExplorer={blockExplorer} />)
                    : null}
            </div>
        </>
    );
}
