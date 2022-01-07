import { useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import * as ethers from "ethers";

import Wrapper from "./pages/wrapper";

import SideNav from "./components/SideNav";
import Nav from "./components/Nav";
import AgreementModal from "./components/AgreementModal";

import DashboardLeverage from "./pages/dashboard/leverage";
import StakeLeverage from "./pages/stake/leverage";
import Leverage from "./pages/leverage";
import Yield from "./pages/yield";

function App() {
  const [navState, setNavState] = useState<boolean>(false);

  return (
    <Web3ReactProvider
      getLibrary={(provider) => {
        return new ethers.providers.Web3Provider(provider, "any");
      }}
    >
      <HashRouter>
        <div className="background pb-10">
          <AgreementModal />
          <Wrapper>
            <Nav setNavState={setNavState} />
          </Wrapper>
          <SideNav navState={navState} setNavState={setNavState} />
          <Routes>
            <Route
              path="dashboard"
              element={
                <Wrapper>
                  <DashboardLeverage />
                </Wrapper>
              }
            />
            <Route
              path="stake"
              element={
                <Wrapper>
                  <StakeLeverage />
                </Wrapper>
              }
            />
            <Route path="leverage">
              <Route
                path="long"
                element={
                  <Wrapper>
                    <Leverage />
                  </Wrapper>
                }
              />
            </Route>
            <Route
              path="/reserve"
              element={
                <Wrapper>
                  <Yield />
                </Wrapper>
              }
            />
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        </div>
      </HashRouter>
    </Web3ReactProvider>
  );
}

export default App;
