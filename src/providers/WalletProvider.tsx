import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { createContext, useContext, useState } from "react";

import { useMetamask, useWalletConnect, useWalletLink } from "../hooks";
import { WalletModal } from "../modals";
import { SELECTED_CHAIN_ID } from "../utils";

const walletModalCtx = createContext<(opened: boolean) => void>(undefined as any);

export function useWalletModal() {
    return useContext(walletModalCtx);
}

export function WalletProvider({ children }: { children: any }) {
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <walletModalCtx.Provider value={setOpened}>
            <Web3ReactProvider getLibrary={(provider) => new ethers.providers.Web3Provider(provider)}>
                {(() => {
                    useMetamask();
                    useWalletConnect(SELECTED_CHAIN_ID);
                    useWalletLink(SELECTED_CHAIN_ID);
                })()}
                <WalletModal opened={opened} onClose={() => setOpened(false)} />
                {children}
            </Web3ReactProvider>
        </walletModalCtx.Provider>
    );
}
