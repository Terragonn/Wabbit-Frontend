import { Button } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";

import { injected } from "../../connectors";

// **** I need a new seperate sort of wallet provider for this probably using mobX

export default function ConnectWallet() {
    const { account, activate } = useWeb3React();

    async function connectInjected() {
        await activate(injected);
    }

    return (
        <>
            {account ? (
                account
            ) : (
                <Button variant="gradient" onClick={connectInjected} gradient={{ from: "indigo", to: "grape", deg: 45 }}>
                    Connect
                </Button>
            )}
        </>
    );
}
