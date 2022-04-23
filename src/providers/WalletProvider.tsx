import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { createContext, useContext, useState } from "react";

import { WalletModal } from "../modals";

const walletModalCtx = createContext<(opened: boolean) => void>(undefined as any);

export function useWalletModal() {
    return useContext(walletModalCtx);
}

export function WalletProvider({ children }: { children: any }) {
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <Web3ReactProvider getLibrary={(provider) => new ethers.providers.Web3Provider(provider)}>
            <walletModalCtx.Provider value={setOpened}>
                <WalletModal opened={opened} onClose={() => setOpened(false)} />
                {children}
            </walletModalCtx.Provider>
        </Web3ReactProvider>
    );
}
