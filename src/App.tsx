import { Web3ReactProvider } from "@web3-react/core";
import { HashRouter, Routes, Route } from "react-router-dom";
import * as ethers from "ethers";
import Nav from "./components/nav";

function App() {
    return (
        <Web3ReactProvider
            getLibrary={(provider) => {
                return new ethers.providers.Web3Provider(provider, "any");
            }}
        >
            <HashRouter>
                <Nav />
                <Routes>
                    <Route path="/">
                        <Route path="dashboard">
                            <Route path="leverage" />
                            {/* <Route path="lending" /> */}
                        </Route>
                        <Route path="stake">
                            <Route path="leverage" />
                            {/* <Route path="lending" /> */}
                        </Route>
                        <Route path="leverage" />
                        <Route path="borrow" />
                        <Route path="yield" />
                    </Route>
                </Routes>
            </HashRouter>
        </Web3ReactProvider>
    );
}

export default App;
