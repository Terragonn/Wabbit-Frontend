import { Web3ReactProvider } from "@web3-react/core";
import * as ethers from "ethers";

function App() {
    return (
        <div className="background">
            <Web3ReactProvider
                getLibrary={(provider) => {
                    return new ethers.providers.Web3Provider(provider, "any");
                }}
            >
                <h1>Hello World</h1>
            </Web3ReactProvider>
        </div>
    );
}

export default App;
