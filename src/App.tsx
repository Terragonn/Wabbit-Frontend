import {HashRouter, Routes, Route, Navigate} from "react-router-dom";

import PageWrapper from "./components/Wrapper/PageWrapper";
import LayoutWrapper from "./components/Wrapper/LayoutWrapper";
import ContextWrapper from "./components/Wrapper/ContextWrapper";

import Dashboard from "./pages/Dashboard";
import Wrap from "./pages/Wrap";
import ProvideLiquidity from "./pages/ProvideLiquidity";
import LeverageLong from "./pages/Leverage/Long";

export default function App() {
    return (
        <ContextWrapper>
            <HashRouter>
                <LayoutWrapper>
                    <Routes>
                        <Route
                            path="dashboard"
                            element={
                                <PageWrapper>
                                    <Dashboard />
                                </PageWrapper>
                            }
                        />
                        <Route
                            path="wrap"
                            element={
                                <PageWrapper>
                                    <Wrap />
                                </PageWrapper>
                            }
                        />
                        <Route
                            path="provide-liquidity"
                            element={
                                <PageWrapper>
                                    <ProvideLiquidity />
                                </PageWrapper>
                            }
                        />
                        <Route path="leverage">
                            <Route
                                path="long"
                                element={
                                    <PageWrapper>
                                        <LeverageLong />
                                    </PageWrapper>
                                }
                            />
                        </Route>
                        <Route path="*" element={<Navigate to="dashboard" />} />
                    </Routes>
                </LayoutWrapper>
            </HashRouter>
        </ContextWrapper>
    );
}
