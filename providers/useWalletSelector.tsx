import {createContext, useContext, useState} from "react";

export const walletSelectorCtx = createContext<[boolean, (walletSelector: boolean) => void]>(undefined as any);

export function useWalletSelector() {
    return useContext(walletSelectorCtx);
}

export function WalletSelectorProvider({children}: {children: any}) {
    const [walletSelector, setWalletSelector] = useState<boolean>(false);

    return <walletSelectorCtx.Provider value={[walletSelector, setWalletSelector]}>{children}</walletSelectorCtx.Provider>;
}
