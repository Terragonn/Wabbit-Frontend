import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import { chainDataConfig, SupportedChainId, SUPPORTED_CHAIN_ID } from ".";

const mappedRPC = Object.entries(chainDataConfig).reduce((a, v) => ({ ...a, [Number(v[0])]: v[1].rpcUrl }), {});

export const injected = new InjectedConnector({
    supportedChainIds: [250],
});

export const walletConnect = (chainId: SupportedChainId) =>
    new WalletConnectConnector({
        chainId: chainId,
        rpc: mappedRPC,
        supportedChainIds: [...SUPPORTED_CHAIN_ID],
    });

export const walletLink = (chainId: SupportedChainId) =>
    new WalletLinkConnector({
        url: chainDataConfig[chainId].rpcUrl,
        appName: "Torque",
        supportedChainIds: [...SUPPORTED_CHAIN_ID],
    });
