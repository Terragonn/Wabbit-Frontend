import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {SUPPORTED_CHAIN_IDS} from "../../utils/useChainData";

export const injected = new InjectedConnector({
    supportedChainIds: [...SUPPORTED_CHAIN_IDS],
});

const RPC_URLS = {
    1: "https://mainnet.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4",
    4: "https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4",
};

export const walletConnect = new WalletConnectConnector({
    // supportedChainIds: [...SUPPORTED_CHAIN_IDS],
    // rpc: {250: "https://rpc.ftm.tools/"},
    // qrcode: true,

    rpc: {
        1: RPC_URLS[1],
        4: RPC_URLS[4],
    },
    qrcode: true,
});
