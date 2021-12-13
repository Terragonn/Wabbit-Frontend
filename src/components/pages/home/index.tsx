import config from "../../../config/config.json";
import Row from "./row";

function Home(props: {}) {
    return (
        <table className="table-auto mx-auto w-full">
            <thead>
                <tr className="text-zinc-300 font-bold">
                    <th className="pb-6">Name</th>
                    <th className="pb-6 md:table-cell hidden">Available</th>
                    <th className="pb-6 md:table-cell hidden">Borrowed</th>
                    <th className="pb-6 md:table-cell hidden">TVL</th>
                    <th className="pb-6">APY</th>
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
