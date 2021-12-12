import Nav from "./components/nav";
import { Web3ReactProvider } from "@web3-react/core";
import * as ethers from "ethers";
import { useState } from "react";

import { Link } from "./components/nav/navLink";

function App() {
    const links: Link[] = [
        { id: 0, name: "Home" },
        { id: 1, name: "Stake" },
        { id: 2, name: "Borrow" },
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
            </Web3ReactProvider>
        </div>
    );
}

export default App;
