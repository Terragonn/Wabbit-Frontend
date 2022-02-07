import {rpc, SUPPORTED_CHAIN_IDS} from "../../../utils/providers/useChainData";

import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [...SUPPORTED_CHAIN_IDS],
});

export const walletConnect = new WalletConnectConnector({
    chainId: SUPPORTED_CHAIN_IDS[0],
    rpc,
});
