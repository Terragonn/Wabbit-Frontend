import { injected } from "./connectors";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

function Wallet() {
    const { active, account, activate, deactivate } = useWeb3React();

    useEffect(() => {
        if (!active) connect();
    }, []);

    async function connect() {
        try {
            await activate(injected);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="text-white font-medium mx-8 text-lg text-center">
            {!active ? (
                <button onClick={connect}>Connect</button>
            ) : (
                <div className="mx-auto flex items-center">
                    <span className="bg-zinc-700 rounded-md py-3 px-6 mx-8">
                        {account?.slice(0, 6).toUpperCase()}...{account?.slice(account?.length - 6, account?.length).toUpperCase()}
                    </span>
                    <button className="mx-8" onClick={() => deactivate()}>
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
}

export default Wallet;
