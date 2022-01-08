import { useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import * as ethers from "ethers";

import { ErrorProvider } from "./utils/useError";
import { ContractsProvider } from "./utils/useContracts";

import Wrapper from "./pages/wrapper";

import Error from "./components/Error";
import SideNav from "./components/SideNav";
import Nav from "./components/Nav";
import AgreementModal from "./components/AgreementModal";

import Dashboard from "./pages/dashboard";
import Stake from "./pages/stake";
import LeverageLong from "./pages/leverage/long";
import Yield from "./pages/reserve";

function App() {
  const [navState, setNavState] = useState<boolean>(false);

  return (
    <Web3ReactProvider
      getLibrary={(provider) => {
        return new ethers.providers.Web3Provider(provider, "any");
      }}
    >
      <ErrorProvider>
        <ContractsProvider>
          <HashRouter>
            <div className="background pb-10">
              <AgreementModal />
              <Wrapper>
                <Nav setNavState={setNavState} />
              </Wrapper>
              <Wrapper>
                <Error />
              </Wrapper>
              <SideNav navState={navState} setNavState={setNavState} />
              <Routes>
                <Route
                  path="dashboard"
                  element={
                    <Wrapper>
                      <Dashboard />
                    </Wrapper>
                  }
                />
                <Route
                  path="stake"
                  element={
                    <Wrapper>
                      <Stake />
                    </Wrapper>
                  }
                />
                <Route path="leverage">
                  <Route
                    path="long"
                    element={
                      <Wrapper>
                        <LeverageLong />
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
        </ContractsProvider>
      </ErrorProvider>
    </Web3ReactProvider>
  );
}

export default App;
