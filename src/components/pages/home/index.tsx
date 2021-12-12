import approvedAssets from "./approved.json";
import Row from "./row";

function Home(props: {}) {
    return (
        <table className="table-auto mx-auto w-full">
            <thead>
                <tr className="text-zinc-300 font-bold">
                    <th className="pb-6">Name</th>
                    <th className="pb-6">Available</th>
                    <th className="pb-6">Borrowed</th>
                    <th className="pb-6">TVL</th>
                    <th className="pb-6">APR</th>
                </tr>
            </thead>
            <tbody>
                {approvedAssets.map((asset) => {
                    return <Row data={asset} />;
                })}
            </tbody>
        </table>
    );
}

export default Home;
