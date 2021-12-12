import Nav from "./components/nav";
import { Web3ReactProvider } from "@web3-react/core";
import * as ethers from "ethers";

function App() {
    return (
        <>
            <Web3ReactProvider
                getLibrary={(provider) => {
                    return new ethers.providers.Web3Provider(provider, "any");
                }}
            >
                <Nav />
            </Web3ReactProvider>
        </>
    );
}

export default App;
