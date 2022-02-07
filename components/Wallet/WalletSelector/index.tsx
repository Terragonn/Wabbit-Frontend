import {createContext, useContext, useState} from "react";

import Card from "./card";
import {useConnectMetamask, useConnectWalletConnect} from "../Wallet";

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

    return (
        <div className={`${walletSelector ? "" : "hidden"} bg-black bg-opacity-80 fixed inset-0 flex items-center justify-center z-50 modal`}>
            <div className="mx-auto lg:w-2/5 w-4/5 min-w-min bg-neutral-900 glow rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-neutral-400 font-bold text-2xl">Choose a wallet:</h2>
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
                    fn={() => connectMetamask()}
                />
                <Card
                    name="WalletConnect"
                    icon="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/bftsslxvhe2yaih6nyl9"
                    fn={() => connectWalletConnect()}
                />
            </div>
        </div>
    );
}
