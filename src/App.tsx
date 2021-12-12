import Nav from "./components/nav";
import { Web3ReactProvider } from "@web3-react/core";
import * as ethers from "ethers";

function App() {
    return (
        <div className="min-h-screen bg-zinc-800">
            <Web3ReactProvider
                getLibrary={(provider) => {
                    return new ethers.providers.Web3Provider(provider, "any");
                }}
            >
                <Nav />
            </Web3ReactProvider>
        </div>
    );
}

export default App;
