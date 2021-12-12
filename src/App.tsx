import Nav from "./components/nav";
import { Web3ReactProvider } from "@web3-react/core";
import * as ethers from "ethers";
import { useState } from "react";

import { Link } from "./components/nav/navLink";

interface PageLink extends Link {
    component: JSX.Element; // **** Probably will end up being its own seperate component that extends it anyway ?
}

function App() {
    const links: PageLink[] = [
        { id: 0, name: "Home", component: <h1>Home</h1> },
        { id: 1, name: "Stake", component: <h1>Stake</h1> },
        { id: 2, name: "Borrow", component: <h1>Borrow</h1> },
    ];

    const [pageId, setPageId] = useState<number>(0);

    return (
        <div className="mx-auto min-h-screen bg-zinc-800">
            <Web3ReactProvider
                getLibrary={(provider) => {
                    return new ethers.providers.Web3Provider(provider, "any");
                }}
            >
                <Nav navLinks={links} current={pageId} setPageId={setPageId} />
                {links[pageId].component}
            </Web3ReactProvider>
        </div>
    );
}

export default App;
