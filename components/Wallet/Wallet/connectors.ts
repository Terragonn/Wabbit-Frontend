import {rpc, SUPPORTED_CHAIN_IDS} from "../../../utils/providers/useChainData";

import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [...SUPPORTED_CHAIN_IDS],
});

export const walletConnect = new WalletConnectConnector({
    chainId: SUPPORTED_CHAIN_IDS[0],
    rpc,
    supportedChainIds: [...SUPPORTED_CHAIN_IDS],
});

export const walletLink = new WalletLinkConnector({
    url: rpc[4],
    appName: "Torque",
    supportedChainIds: [...SUPPORTED_CHAIN_IDS],
});
