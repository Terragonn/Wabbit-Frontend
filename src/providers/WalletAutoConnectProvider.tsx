import { useMetamask, useWalletConnect, useWalletLink } from "../hooks";
import { SELECTED_CHAIN_ID } from "../utils";

export default function WalletAutoConnectProvider({ children }: { children: any }) {
    useMetamask();
    useWalletConnect(SELECTED_CHAIN_ID);
    useWalletLink(SELECTED_CHAIN_ID);

    return <>{children}</>;
}
