import { Web3ReactProvider } from "@web3-react/core";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import * as ethers from "ethers";

import Wrapper from "./pages/wrapper";

import SideNav from "./components/SideNav";
import Nav from "./components/Nav";

import DashboardLeverage from "./pages/dashboard/leverage";
import StakeLeverage from "./pages/stake/leverage";

function App() {
    return (
        <Web3ReactProvider
            getLibrary={(provider) => {
                return new ethers.providers.Web3Provider(provider, "any");
            }}
        >
            <HashRouter>
                <div className="background pb-10">
                    <Wrapper>
                        <Nav />
                    </Wrapper>
                    <SideNav />
                    <Routes>
                        <Route path="dashboard">
                            <Route
                                path="leverage"
                                element={
                                    <Wrapper>
                                        <DashboardLeverage />
                                    </Wrapper>
                                }
                            />
                            {/* <Route path="lending" /> */}
                        </Route>
                        <Route path="stake">
                            <Route
                                path="leverage"
                                element={
                                    <Wrapper>
                                        <StakeLeverage />
                                    </Wrapper>
                                }
                            />
                            {/* <Route path="lending" /> */}
                        </Route>
                        <Route path="/leverage" />
                        <Route path="/borrow" />
                        <Route path="/yield" />
                        <Route path="*" element={<Navigate to="/dashboard/leverage" />} />
                    </Routes>
                </div>
            </HashRouter>
        </Web3ReactProvider>
    );
}

export default App;
