import { injected } from "./connectors";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

function Wallet() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    async function connect() {
        try {
            await activate(injected);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="text-white font-medium">
            {!active ? (
                <button onClick={connect}>Connect</button>
            ) : (
                <div className="mx-auto flex items-center">
                    <span className="bg-zinc-700 rounded-md py-3 px-6 mr-8">
                        {account?.slice(0, 6)}...{account?.slice(account?.length - 6, account?.length)}
                    </span>
                    <button onClick={() => deactivate()}>Disconnect</button>
                </div>
            )}
        </div>
    );
}

export default Wallet;
