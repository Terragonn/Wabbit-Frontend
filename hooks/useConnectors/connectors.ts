import {chainDataConfig, SupportedChainIds, SUPPORTED_CHAIN_IDS} from "../../providers/useChainData";

import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";

export const Injected = () =>
    new InjectedConnector({
        supportedChainIds: [...SUPPORTED_CHAIN_IDS].filter((x) => !chainDataConfig[x].disabled),
    });

export const WalletConnect = (chainId: SupportedChainIds) =>
    new WalletConnectConnector({
        chainId: chainId,
        rpc: Object.entries(chainDataConfig).reduce((a, v) => ({...a, [Number(v[0])]: v[1].rpcUrl}), {}),
        supportedChainIds: [...SUPPORTED_CHAIN_IDS].filter((x) => !chainDataConfig[x].disabled),
    });

export const WalletLink = (chainId: SupportedChainIds) =>
    new WalletLinkConnector({
        url: chainDataConfig[chainId].rpcUrl,
        appName: "Torque",
        supportedChainIds: [...SUPPORTED_CHAIN_IDS].filter((x) => !chainDataConfig[x].disabled),
    });
