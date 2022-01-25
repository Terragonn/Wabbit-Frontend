import {injected} from "./connectors";
import {useWeb3React} from "@web3-react/core";

import useError from "../../utils/useError";
import {useEffect} from "react";

export function useMetamaskConnect() {
    const [, setError] = useError();

    const {activate} = useWeb3React();

    return async () => {
        try {
            await activate(injected);
        } catch (e: any) {
            setError(e.toString());
        }
    };
}

export function useDisconnect() {
    const {deactivate} = useWeb3React();

    return () => {
        deactivate();
    };
}

export default function Wallet() {
    const {active} = useWeb3React();

    const [walletSelector, setWalletSelector] = useWalletSelector();
    const disconnect = useDisconnect();

    return (
        <button
            className="bg-neutral-900 lg:px-12 px-8 lg:py-6 py-4 lg:text-3xl text-2xl rounded-xl text-white font-bold hover:bg-fuchsia-700 glow"
            onClick={(e) => {
                !active ? connect() : disconnect();
            }}
        >
            {!active ? "Connect" : "Disconnect"}
        </button>
    );
}
