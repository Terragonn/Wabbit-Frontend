import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

import { injected, network, walletConnect, walletLink, SupportedChainId } from "../utils";

type Connector = () => Promise<void>;

const WALLET_CONNECTOR_NAME = ["METAMASK_CONNECTED", "WALLETCONNECT_CONNECTED", "WALLETLINK_CONNECTED"] as const;

export function useDisconnect() {
    const { deactivate } = useWeb3React();

    function disconnect() {
        deactivate();
        for (const connectorName of WALLET_CONNECTOR_NAME) localStorage.removeItem(connectorName);
    }

    return disconnect;
}

export function useDefaultConnector(chainId: SupportedChainId, connectors: { metamask: Connector; walletConnect: Connector; walletLink: Connector }) {
    const { account, activate } = useWeb3React();

    useEffect(() => {
        if (!account) {
            const connectorKeys = Object.keys(connectors);

            for (let i = 0; i < WALLET_CONNECTOR_NAME.length; i++) {
                const storage = localStorage.getItem(WALLET_CONNECTOR_NAME[i]);

                if (storage && JSON.parse(storage)) {
                    // @ts-ignore
                    connectors[connectorKeys[i]]();
                    return;
                }
            }

            activate(network(chainId), undefined, true);
        }
    }, [account]);
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
