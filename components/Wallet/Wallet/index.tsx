import {useWeb3React} from "@web3-react/core";

import useError from "../../../utils/providers/useError";
import {chainDataConfig, SupportedChainIds} from "../../../utils/providers/useChainData";

import {Injected, WalletConnect, WalletLink} from "./connectors";
import {useWalletSelector} from "../WalletSelector";

export const AUTO_CONNECT = "AUTO_CONNECT" as const;
export interface AutoConnect {
    chainId: SupportedChainIds;
    wallet: "metamask" | "walletconnect" | "walletlink";
}

async function switchNetworkMetamask(chainId: SupportedChainIds) {
    try {
        await (window as any).ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: "0x" + chainId.toString(16)}]});
    } catch (error: any) {
        if (error.code === 4902) {
            await (window as any).ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: "0x" + chainId.toString(16),
                        chainName: chainDataConfig[chainId].name,
                        rpcUrls: [chainDataConfig[chainId].rpcUrl],
                        blockExplorerUrls: [chainDataConfig[chainId].blockExplorer],
                    },
                ],
            });
        } else throw error;
    }
}

export function useConnectMetamask() {
    const [, setError] = useError();
    const [, setWalletSelector] = useWalletSelector();

    const {activate} = useWeb3React();

    return async (chainId: SupportedChainIds) => {
        try {
            const injected = Injected();

            await switchNetworkMetamask(chainId);
            await activate(injected, undefined, true);

            localStorage.setItem(AUTO_CONNECT, JSON.stringify({chainId, wallet: "metamask"} as AutoConnect));
            setWalletSelector(false);
        } catch (e: any) {
            setError(JSON.stringify(e));
        }
    };
}

export function useConnectWalletConnect() {
    const [, setError] = useError();
    const [, setWalletSelector] = useWalletSelector();

    const {activate} = useWeb3React();

    return async (chainId: SupportedChainIds) => {
        try {
            const walletConnect = WalletConnect(chainId);

            await activate(walletConnect, undefined, true);

            localStorage.setItem(AUTO_CONNECT, JSON.stringify({chainId, wallet: "walletconnect"} as AutoConnect));
            setWalletSelector(false);
        } catch (e: any) {
            setError(JSON.stringify(e));
        }
    };
}

export function useConnectWalletLink() {
    const [, setError] = useError();
    const [, setWalletSelector] = useWalletSelector();

    const {activate} = useWeb3React();

    return async (chainId: SupportedChainIds) => {
        try {
            const walletLink = WalletLink(chainId);

            await activate(walletLink, undefined, true);

            localStorage.setItem(AUTO_CONNECT, JSON.stringify({chainId, wallet: "walletlink"} as AutoConnect));
            setWalletSelector(false);
        } catch (e: any) {
            setError(JSON.stringify(e));
        }
    };
}

export function useDisconnect() {
    const {deactivate} = useWeb3React();

    return () => {
        deactivate();
        localStorage.removeItem(AUTO_CONNECT);
    };
}

export default function Wallet() {
    const {active} = useWeb3React();

    const [, setWalletSelector] = useWalletSelector();
    const disconnect = useDisconnect();

    return (
        <button
            className="bg-neutral-900 bg-opacity-75 lg:px-12 px-8 lg:py-6 py-4 lg:text-3xl text-2xl rounded-xl text-white font-bold hover:bg-fuchsia-700 glow"
            onClick={(e) => {
                !active ? (() => setWalletSelector(true))() : disconnect();
            }}
        >
            {!active ? "Connect" : "Disconnect"}
        </button>
    );
}
