import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import { chainDataConfig, SupportedChainId } from ".";

const mappedRPC = Object.entries(chainDataConfig).reduce((a, v) => ({ ...a, [Number(v[0])]: v[1].rpcUrl }), {});

export const injected = (chainId: SupportedChainId) =>
    new InjectedConnector({
        supportedChainIds: [chainId],
    });

export const walletConnect = (chainId: SupportedChainId) =>
    new WalletConnectConnector({
        chainId: chainId,
        rpc: mappedRPC,
        supportedChainIds: [chainId],
    });

export const walletLink = (chainId: SupportedChainId) =>
    new WalletLinkConnector({
        url: chainDataConfig[chainId].rpcUrl,
        appName: "Torque",
        supportedChainIds: [chainId],
    });
