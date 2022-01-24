import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {SUPPORTED_CHAIN_IDS} from "../../utils/useChainData";

export const injected = new InjectedConnector({
    supportedChainIds: [...SUPPORTED_CHAIN_IDS],
});

export const walletConnect = new WalletConnectConnector({
    supportedChainIds: [...SUPPORTED_CHAIN_IDS],
});
