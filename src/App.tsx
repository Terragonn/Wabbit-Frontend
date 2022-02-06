import {Web3ReactProvider} from "@web3-react/core";
import {HashRouter, Routes, Route, Navigate} from "react-router-dom";
import * as ethers from "ethers";

import {ChainDataProvider} from "./utils/useChainData";
import {ErrorProvider} from "./utils/useError";
import {ContractsProvider} from "./utils/useContracts";
import {ProtocolDataProvider} from "./utils/useProtocolData";
import {ProtocolMethodsProvider} from "./utils/useProtocolMethods";
import {WalletSelectorProvider} from "./components/WalletSelector";
import {ProtocolMaxProvider} from "./utils/useProtocolMax";
import {NavStateProvider} from "./utils/useNavState";

import Wrapper from "./components/Wrapper/AlignWrapper";
import PageWrapper from "./components/Wrapper/PageWrapper";

import Error from "./components/Error";
import SideNav from "./components/Nav/SideNav";
import Nav from "./components/Nav/Nav";
import AgreementModal from "./components/AgreementModal";

import WalletSelector from "./components/WalletSelector";
import Dashboard from "./pages/Dashboard";
import Wrap from "./pages/Wrap";
import ProvideLiquidity from "./pages/ProvideLiquidity";
import LeverageLong from "./pages/Leverage/Long";

export default function App() {
    return (
        <Web3ReactProvider
            getLibrary={(provider) => {
                return new ethers.providers.Web3Provider(provider, "any");
            }}
        >
            <ErrorProvider>
                <WalletSelectorProvider>
                    <ChainDataProvider>
                        <ContractsProvider>
                            <ProtocolDataProvider>
                                <ProtocolMethodsProvider>
                                    <ProtocolMaxProvider>
                                        <NavStateProvider>
                                            <HashRouter>
                                                <AgreementModal />
                                                <WalletSelector />
                                                <Wrapper>
                                                    <Nav />
                                                </Wrapper>
                                                <Wrapper>
                                                    <Error />
                                                </Wrapper>
                                                <SideNav />
                                                <Routes>
                                                    <Route
                                                        path="dashboard"
                                                        element={
                                                            <Wrapper>
                                                                <PageWrapper>
                                                                    <Dashboard />
                                                                </PageWrapper>
                                                            </Wrapper>
                                                        }
                                                    />
                                                    <Route
                                                        path="wrap"
                                                        element={
                                                            <Wrapper>
                                                                <PageWrapper>
                                                                    <Wrap />
                                                                </PageWrapper>
                                                            </Wrapper>
                                                        }
                                                    />
                                                    <Route
                                                        path="provide-liquidity"
                                                        element={
                                                            <Wrapper>
                                                                <PageWrapper>
                                                                    <ProvideLiquidity />
                                                                </PageWrapper>
                                                            </Wrapper>
                                                        }
                                                    />
                                                    <Route path="leverage">
                                                        <Route
                                                            path="long"
                                                            element={
                                                                <Wrapper>
                                                                    <PageWrapper>
                                                                        <LeverageLong />
                                                                    </PageWrapper>
                                                                </Wrapper>
                                                            }
                                                        />
                                                    </Route>
                                                    <Route path="*" element={<Navigate to="dashboard" />} />
                                                </Routes>
                                            </HashRouter>
                                        </NavStateProvider>
                                    </ProtocolMaxProvider>
                                </ProtocolMethodsProvider>
                            </ProtocolDataProvider>
                        </ContractsProvider>
                    </ChainDataProvider>
                </WalletSelectorProvider>
            </ErrorProvider>
        </Web3ReactProvider>
    );
}
