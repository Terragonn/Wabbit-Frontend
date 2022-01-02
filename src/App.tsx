import { Web3ReactProvider } from "@web3-react/core";
import { HashRouter } from "react-router-dom";
import * as ethers from "ethers";

function App() {
    return (
        <Web3ReactProvider
            getLibrary={(provider) => {
                return new ethers.providers.Web3Provider(provider, "any");
            }}
        >
            <HashRouter></HashRouter>
        </Web3ReactProvider>
    );
}

export default App;
