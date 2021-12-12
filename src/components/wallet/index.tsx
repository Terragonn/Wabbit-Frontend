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
        <div>
            {!active ? (
                <button onClick={connect}>Connect</button>
            ) : (
                <>
                    <span>{account}</span>
                    <button onClick={() => deactivate()}>Disconnect</button>
                </>
            )}
        </div>
    );
}

export default Wallet;
