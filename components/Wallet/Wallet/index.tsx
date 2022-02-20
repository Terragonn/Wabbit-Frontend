import {useWeb3React} from "@web3-react/core";

import {useDisconnect} from "../../../hooks/useConnectors";
import {useWalletSelector} from "../../../providers/useWalletSelector";

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
