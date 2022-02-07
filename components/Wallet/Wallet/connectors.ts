import {rpc, SupportedChainIds, SUPPORTED_CHAIN_IDS} from "../../../utils/providers/useChainData";

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
        rpc,
        supportedChainIds: [...SUPPORTED_CHAIN_IDS],
    });

export const WalletLink = (chainId: SupportedChainIds) =>
    new WalletLinkConnector({
        url: rpc[chainId],
        appName: "Torque",
        supportedChainIds: [...SUPPORTED_CHAIN_IDS],
    });
