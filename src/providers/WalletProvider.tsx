import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

export function WalletProvider({ children }: { children: any }) {
    return <Web3ReactProvider getLibrary={(provider) => new ethers.providers.Web3Provider(provider)}>{children}</Web3ReactProvider>;
}
