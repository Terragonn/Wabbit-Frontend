import {createContext, useContext, useEffect, useState} from "react";

import Card from "./card";
import {AutoConnect, AUTO_CONNECT, useConnectMetamask, useConnectWalletConnect, useConnectWalletLink} from "../Wallet";
import {SupportedChainIds} from "../../../utils/providers/useChainData";
import WalletSelectorChainSelector from "../WalletSelectorChainSelector";

export const walletSelectorCtx = createContext<[boolean, (walletSelector: boolean) => void]>(undefined as any);

export function useWalletSelector() {
    return useContext(walletSelectorCtx);
}

export function WalletSelectorProvider({children}: {children: any}) {
    const [walletSelector, setWalletSelector] = useState<boolean>(false);

    return <walletSelectorCtx.Provider value={[walletSelector, setWalletSelector]}>{children}</walletSelectorCtx.Provider>;
}

export default function WalletSelector() {
    const [walletSelector, setWalletSelector] = useWalletSelector();

    const connectMetamask = useConnectMetamask();
    const connectWalletConnect = useConnectWalletConnect();
    const connectWalletLink = useConnectWalletLink();

    const [chainId, setChainId] = useState<SupportedChainIds>(250);

    useEffect(() => {
        const autoConnectString = localStorage.getItem(AUTO_CONNECT);
        if (autoConnectString) {
            const autoConnect: AutoConnect = JSON.parse(autoConnectString);
            if (autoConnect.wallet === "metamask") connectMetamask(autoConnect.chainId);
            else if (autoConnect.wallet === "walletconnect") connectWalletConnect(autoConnect.chainId);
            else if (autoConnect.wallet === "walletlink") connectWalletLink(autoConnect.chainId);
        }
    }, []);

    return (
        <div className={`${walletSelector ? "" : "hidden"} bg-black bg-opacity-80 fixed inset-0 flex items-center justify-center z-50 modal`}>
            <div className="mx-auto lg:w-2/5 w-4/5 min-w-min bg-neutral-900 glow rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-neutral-400 font-bold text-2xl">Choose a wallet:</h2>
                        <WalletSelectorChainSelector chainId={chainId} setChainId={setChainId} />
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#a3a3a3"
                        onClick={() => setWalletSelector(false)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <Card
                    name="Metamask"
                    icon="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                    fn={() => connectMetamask(chainId)}
                />
                <Card
                    name="WalletConnect"
                    icon="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/bftsslxvhe2yaih6nyl9"
                    fn={() => connectWalletConnect(chainId)}
                />
                <Card name="WalletLink" icon="https://pbs.twimg.com/profile_images/1481006694725419014/BuRoqUVN_400x400.png" fn={() => connectWalletLink(chainId)} />
            </div>
        </div>
    );
}
