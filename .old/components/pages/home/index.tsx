import config from "../../../config/config.json";
import Row from "./row";
import Tooltip from "../../tooltip";

function Home(props: {}) {
    return (
        <table className="table-auto mx-auto w-full">
            <thead>
                <tr className="text-zinc-300 font-bold">
                    <th className="pb-6">Name</th>
                    <th className="pb-6 md:table-cell hidden">
                        <Tooltip tooltip="Amount of the asset available to borrow">Available</Tooltip>
                    </th>
                    <th className="pb-6 md:table-cell hidden">
                        <Tooltip tooltip="Amount of asset borrowed">Borrowed</Tooltip>
                    </th>
                    <th className="pb-6 md:table-cell hidden">
                        <Tooltip tooltip="Total value locked">TVL</Tooltip>
                    </th>
                    <th className="pb-6">
                        <Tooltip tooltip="Annual percentage return">APR</Tooltip>
                    </th>
                </tr>
            </thead>
            <tbody>
                {config.approved.map((asset, index) => {
                    return <Row key={index} data={asset} last={index === config.approved.length - 1} />;
                })}
            </tbody>
        </table>
    );
}

export default Home;
