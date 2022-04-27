import { useWalletAutoConnect } from "../hooks";
import { SELECTED_CHAIN_ID } from "../utils";

export default function WalletAutoConnectProvider({ children }: { children: any }) {
    useWalletAutoConnect(SELECTED_CHAIN_ID);

    return <>{children}</>;
}
