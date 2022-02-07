import {injected, walletConnect} from "./connectors";
import {useWeb3React} from "@web3-react/core";

import useError from "../../../utils/providers/useError";
import {useWalletSelector} from "../WalletSelector";
import {useEffect} from "react";

const connectedIndicators = {
    metamask: "CONNECTED_METAMASK",
    walletConnect: "CONNECTED_WALLETCONNECT",
};

export function useConnectMetamask() {
    const [, setError] = useError();
    const [, setWalletSelector] = useWalletSelector();

    const {activate} = useWeb3React();

    return async () => {
        try {
            await activate(injected, undefined, true);

            setWalletSelector(false);
            localStorage.setItem(connectedIndicators.metamask, JSON.stringify(true));
        } catch (e: any) {
            setError(e.toString());
        }
    };
}

export function useConnectWalletConnect() {
    const [, setError] = useError();
    const [, setWalletSelector] = useWalletSelector();

    const {activate} = useWeb3React();

    return async () => {
        try {
            walletConnect.walletConnectProvider = undefined;
            await activate(walletConnect, undefined, true);

            setWalletSelector(false);
            localStorage.setItem(connectedIndicators.walletConnect, JSON.stringify(true));
        } catch (e: any) {
            setError(e.toString());
        }
    };
}

export function useDisconnect() {
    const {deactivate} = useWeb3React();

    return () => {
        deactivate();
        for (const value of Object.values(connectedIndicators)) localStorage.removeItem(value);
    };
}

export default function Wallet() {
    const {active} = useWeb3React();

    const [, setWalletSelector] = useWalletSelector();
    const disconnect = useDisconnect();

    const connectMetamask = useConnectMetamask();
    const connectWalletConnect = useConnectWalletConnect();

    useEffect(() => {
        if (localStorage.getItem(connectedIndicators.metamask)) connectMetamask();
        if (localStorage.getItem(connectedIndicators.walletConnect)) connectWalletConnect();
    }, []);

    return (
        <button
            className="bg-neutral-900 lg:px-12 px-8 lg:py-6 py-4 lg:text-3xl text-2xl rounded-xl text-white font-bold hover:bg-fuchsia-700 glow"
            onClick={(e) => {
                !active ? (() => setWalletSelector(true))() : disconnect();
            }}
        >
            {!active ? "Connect" : "Disconnect"}
        </button>
    );
}
