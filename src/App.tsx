import { Web3ReactProvider } from "@web3-react/core";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import * as ethers from "ethers";
import SideNav from "./components/SideNav";
import Nav from "./components/Nav";

function App() {
    return (
        <Web3ReactProvider
            getLibrary={(provider) => {
                return new ethers.providers.Web3Provider(provider, "any");
            }}
        >
            <HashRouter>
                <div className="background">
                    <Nav />
                    <SideNav />
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
                            <Route path="*" element={<Navigate to="/dashboard/leverage" />} />
                        </Route>
                    </Routes>
                </div>
            </HashRouter>
        </Web3ReactProvider>
    );
}

export default App;
