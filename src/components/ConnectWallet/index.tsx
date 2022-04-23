import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { WalletSelector } from "..";
import { SupportedChainId } from "../../utils";
import { useDisconnect, useMetamask, useWalletConnect, useWalletLink } from "../../hooks";

export default function ConnectWallet() {
    const { account, chainId } = useWeb3React();

    const [opened, setOpened] = useState<boolean>(false);

    const SELECTED_CHAIN_ID: SupportedChainId = 250;

    const connectMetamask = useMetamask();
    const connectWalletConnect = useWalletConnect(SELECTED_CHAIN_ID);
    const connectWalletLink = useWalletLink(SELECTED_CHAIN_ID);

    const connectors = { metamask: connectMetamask, walletConnect: connectWalletConnect, walletLink: connectWalletLink };

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
                    <Button onClick={() => setOpened(true)} variant="gradient" gradient={{ from: "indigo", to: "grape", deg: 45 }}>
                        Connect
                    </Button>
                )}
            </Group>
        </>
    );
}
