import { injected } from "./connectors";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

function Wallet() {
    const { active, account, activate, deactivate } = useWeb3React();
    const [showDisconnect, setShowDisconnect] = useState<boolean>(false);

    const CONNECTED = "connected";

    useEffect(() => {
        const connected = localStorage.getItem(CONNECTED);
        if (connected && JSON.parse(connected) && !active) connect();
    }, []);

    async function connect() {
        localStorage.setItem(CONNECTED, JSON.stringify(true));
        try {
            await activate(injected);
        } catch (e) {
            console.error(e);
        }
    }

    function disconnect() {
        localStorage.setItem(CONNECTED, JSON.stringify(false));
        deactivate();
    }

    return (
        <div className="text-white font-medium text-lg text-center" onMouseEnter={() => setShowDisconnect(true)} onMouseLeave={() => setShowDisconnect(false)}>
            {!active ? (
                <button onClick={connect}>Connect</button>
            ) : (
                <>
                    <span className="bg-zinc-700 rounded-md py-3 px-6">
                        {showDisconnect ? (
                            <button onClick={disconnect}>Disconnect</button>
                        ) : (
                            <>
                                {account?.slice(0, 4).toUpperCase()}...{account?.slice(account?.length - 4, account?.length).toUpperCase()}
                            </>
                        )}
                    </span>
                </>
            )}
        </div>
    );
}

export default Wallet;
