import Nav from "./components/nav";
import { Web3ReactProvider } from "@web3-react/core";
import * as ethers from "ethers";
import { useState } from "react";

import { Link } from "./components/nav/navLink";

import Base from "./components/pages/base";
import Home from "./components/pages/home";
import Stake from "./components/pages/stake";
import Borrow from "./components/pages/borrow";

import { ContractsProvider } from "./utils/useContracts";
import { ErrorProvider } from "./utils/useError";

interface PageLink extends Link {
    component: JSX.Element;
}

function App() {
    const links: PageLink[] = [
        { id: 0, name: "Home", component: <Home /> },
        { id: 1, name: "Stake", component: <Stake /> },
        { id: 2, name: "Borrow", component: <Borrow /> },
    ];

    // Initialize the smart contracts here

    const [pageId, setPageId] = useState<number>(0);

    return (
        <div className="mx-auto min-h-screen bg-zinc-800 pb-1">
            <Web3ReactProvider
                getLibrary={(provider) => {
                    return new ethers.providers.Web3Provider(provider, "any");
                }}
            >
                <ContractsProvider>
                    <ErrorProvider>
                        <Nav navLinks={links} current={pageId} setPageId={setPageId} />
                        <Base>{links[pageId].component}</Base>
                    </ErrorProvider>
                </ContractsProvider>
            </Web3ReactProvider>
        </div>
    );
}

export default App;
