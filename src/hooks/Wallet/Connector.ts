import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

import { injected, walletConnect, walletLink, SupportedChainId } from "../../utils";

const WALLET_CONNECTOR_NAME = ["METAMASK_CONNECTED", "WALLETCONNECT_CONNECTED", "WALLETLINK_CONNECTED"] as const;

export function useDisconnect() {
    const { deactivate } = useWeb3React();

    function disconnect() {
        deactivate();
        for (const connectorName of WALLET_CONNECTOR_NAME) localStorage.removeItem(connectorName);
    }

    return disconnect;
}

export function useMetamask() {
    const { activate } = useWeb3React();

    async function connect() {
        await activate(injected, undefined, true);
        localStorage.setItem(WALLET_CONNECTOR_NAME[0], JSON.stringify(true));
    }

    return connect;
}

export function useWalletConnect(chainId: SupportedChainId) {
    const { activate } = useWeb3React();

    async function connect() {
        await activate(walletConnect(chainId), undefined, true);
        localStorage.setItem(WALLET_CONNECTOR_NAME[1], JSON.stringify(true));
    }

    return connect;
}

export function useWalletLink(chainId: SupportedChainId) {
    const { activate } = useWeb3React();

    async function connect() {
        await activate(walletLink(chainId), undefined, true);
        localStorage.setItem(WALLET_CONNECTOR_NAME[2], JSON.stringify(true));
    }

    return connect;
}

export function useWalletAutoConnect(chainId: SupportedChainId) {
    const connectMetamask = useMetamask();
    const connectWalletConnect = useWalletConnect(chainId);
    const connectWalletLink = useWalletLink(chainId);

    useEffect(() => {
        (async () => {
            const metamaskStorage = localStorage.getItem(WALLET_CONNECTOR_NAME[0]);
            if (metamaskStorage && JSON.parse(metamaskStorage)) {
                connectMetamask();
                return;
            }

            const walletConnectStorage = localStorage.getItem(WALLET_CONNECTOR_NAME[1]);
            if (walletConnectStorage && JSON.parse(walletConnectStorage)) {
                connectWalletConnect();
                return;
            }

            const walletLinkStorage = localStorage.getItem(WALLET_CONNECTOR_NAME[2]);
            if (walletLinkStorage && JSON.parse(walletLinkStorage)) {
                connectWalletLink();
                return;
            }
        })();
    }, []);
}
