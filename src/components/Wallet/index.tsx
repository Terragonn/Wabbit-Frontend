import {injected} from "./connectors";
import {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";

import useError from "../../utils/useError";

function switchNetwork() {
    // @ts-ignore
    window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: "0xFA",
                rpcUrls: ["https://rpc.ftm.tools/"],
                chainName: "Fantom Opera",
                nativeCurrency: {
                    name: "FTM",
                    symbol: "FTM",
                    decimals: 18,
                },
                blockExplorerUrls: ["https://ftmscan.com/"],
            },
        ],
    });
}

// **** How can I turn connect and disconnect into their own components which can be imported AND used here ?

export default function Wallet() {
    const [, setError] = useError();

    const {active, activate, deactivate} = useWeb3React();

    const CONNECTED = "connected";

    useEffect(() => {
        const connected = localStorage.getItem(CONNECTED);
        if (connected && JSON.parse(connected) && !active) connect();
    }, []);

    async function connect() {
        // switchNetwork();
        localStorage.setItem(CONNECTED, JSON.stringify(true));
        try {
            await activate(injected);
        } catch (e: any) {
            setError(e.toString());
        }
    }

    function disconnect() {
        localStorage.setItem(CONNECTED, JSON.stringify(false));
        deactivate();
    }

    return (
        <button
            className="bg-neutral-900 lg:px-12 px-8 lg:py-6 py-4 lg:text-3xl text-2xl rounded-xl text-white font-bold hover:bg-fuchsia-700 glow"
            onClick={(e) => {
                !active ? connect() : disconnect();
            }}
        >
            {!active ? "Connect" : "Disconnect"}
        </button>
    );
}
