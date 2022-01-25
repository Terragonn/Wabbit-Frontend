import {injected, walletConnect} from "./connectors";
import {useWeb3React} from "@web3-react/core";

import useError from "../../utils/useError";
import {useEffect} from "react";

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

const CONNECTED = "connected";

export function useConnect() {
    const [, setError] = useError();

    const {activate} = useWeb3React();

    return async () => {
        try {
            // switchNetwork();
            // await activate(injected);

            await activate(walletConnect);
            localStorage.setItem(CONNECTED, JSON.stringify(true));
        } catch (e: any) {
            setError(e.toString());
        }
    };
}

export function useDisconnect() {
    const {deactivate} = useWeb3React();

    return () => {
        deactivate();
        localStorage.setItem(CONNECTED, JSON.stringify(false));
    };
}

export default function Wallet() {
    const {active} = useWeb3React();

    const [connect, disconnect] = [useConnect(), useDisconnect()];

    useEffect(() => {
        const connected = localStorage.getItem(CONNECTED);
        if (connected && JSON.parse(connected)) connect();
    }, []);

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

// **** Perhaps use a custom wallet type provider so that I can choose between metamask and walletconnect with a popup
