import { Button, Group } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";

import { SELECTED_CHAIN_ID } from "../../utils";
import { useDisconnect } from "../../hooks";
import { useWalletModal } from "../../providers";

export default function ConnectWallet() {
    const { account, chainId } = useWeb3React();

    const setWalletModalOpened = useWalletModal();

    const disconnect = useDisconnect();

    return (
        <>
            <Group position="center">
                {account ? (
                    chainId === SELECTED_CHAIN_ID ? (
                        <Button onClick={() => disconnect()} variant="outline" color="indigo">
                            {account.slice(0, 6)}...{account.slice(account.length - 6, account.length)}
                        </Button>
                    ) : (
                        <Button variant="outline" color="red">
                            Wrong Network!
                        </Button>
                    )
                ) : (
                    <Button onClick={() => setWalletModalOpened(true)} variant="gradient" gradient={{ from: "indigo", to: "grape", deg: 45 }}>
                        Connect
                    </Button>
                )}
            </Group>
        </>
    );
}
