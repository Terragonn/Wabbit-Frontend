import {chains, SupportedChainIds, SUPPORTED_CHAIN_IDS} from "../../../utils/providers/useChainData";

import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";

export const Injected = () =>
    new InjectedConnector({
        supportedChainIds: [...SUPPORTED_CHAIN_IDS],
    });

export const WalletConnect = (chainId: SupportedChainIds) =>
    new WalletConnectConnector({
        chainId: chainId,
        rpc: Object.entries(chains).reduce((a, v) => ({...a, [parseInt(v[0])]: v[1].rpc}), {}),
        supportedChainIds: [...SUPPORTED_CHAIN_IDS],
    });

export const WalletLink = (chainId: SupportedChainIds) =>
    new WalletLinkConnector({
        url: chains[chainId].rpc,
        appName: "Torque",
        supportedChainIds: [...SUPPORTED_CHAIN_IDS],
    });
