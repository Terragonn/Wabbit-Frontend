import { Button } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";

import { injected } from "../../connectors";

// **** This needs to be reimplemented with mobx
// **** Don't forget to add a button for switching accounts and stuff and when these different components should be rendered !

export default function ConnectWallet() {
    const { account, activate, deactivate } = useWeb3React();

    async function connectInjected() {
        await activate(injected);
    }

    return (
        <>
            {account ? (
                account
            ) : (
                <Button color="grape" onClick={connectInjected}>
                    Connect
                </Button>
            )}
        </>
    );
}
