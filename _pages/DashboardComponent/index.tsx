import useChainData from "../../providers/useChainData";

import TableCard from "../../components/TableCard";
import TableRow from "../../components/TableRow";
import HeaderBanner from "./headerBanner";
import TableHeader from "./tableHeader";

export default function DashboardComponent() {
    const {blockExplorer, config} = useChainData();

    return (
        <>
            <HeaderBanner />
            <TableHeader />
            <div className="lg:block hidden">
                {config
                    ? config.approved
                          .filter((approved) => approved.oracle && approved.leveragePool)
                          .map((data, index) => <TableRow key={index} token={data} blockExplorer={blockExplorer} />)
                    : null}
            </div>
            <h2 className="lg:hidden block font-bold text-white text-3xl mt-20 ml-12">Dashboard</h2>
            <div className="lg:hidden my-10">
                {config
                    ? config.approved
                          .filter((approved) => approved.oracle && approved.leveragePool)
                          .map((data, index) => <TableCard key={index} token={data} blockExplorer={blockExplorer} />)
                    : null}
            </div>
        </>
    );
}
