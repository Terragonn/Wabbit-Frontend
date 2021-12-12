import fakeData from "./fake.json"; // **** Remove for production

function Home(props: {}) {
    return (
        <table>
            <thead>
                <th>Name</th>
                <th>Available</th>
                <th>TVL</th>
                <th>APR</th>
            </thead>
        </table>
    );
}

export default Home;
