import approvedAssets from "./approved.json";

function Home(props: {}) {
    return (
        <table className="table-auto mx-auto">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Available</th>
                    <th>TVL</th>
                    <th>APR</th>
                </tr>
            </thead>
            <tbody>
                {approvedAssets.map((asset) => {
                    return <h1>{asset.name}</h1>;
                })}
            </tbody>
        </table>
    );
}

export default Home;
