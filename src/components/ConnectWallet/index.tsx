import { Button } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";
import { useModals } from "@mantine/modals";

import { SELECTED_CHAIN_ID } from "../../utils";
import { useDisconnect } from "../../hooks";

export default function ConnectWallet() {
    const { account, chainId } = useWeb3React();

    const modals = useModals();

    const disconnect = useDisconnect();

    return (
        <>
            {account ? (
                chainId === SELECTED_CHAIN_ID ? (
                    <Button onClick={disconnect} variant="outline" color="indigo">
                        {account.slice(0, 6)}...{account.slice(account.length - 6, account.length)}
                    </Button>
                ) : (
                    <Button variant="outline" color="red">
                        Wrong Network!
                    </Button>
                )
            ) : (
                <Button
                    onClick={() => modals.openContextModal("wallet", { title: "Choose A Wallet", innerProps: {} })}
                    variant="gradient"
                    gradient={{ from: "indigo", to: "grape", deg: 45 }}
                >
                    Connect
                </Button>
            )}
        </>
    );
}
