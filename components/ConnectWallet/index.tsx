import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import WalletSelector from "./WalletSelector";
import { SupportedChainId } from "../../utils/ChainData";
import { useMetamask, useWalletConnect, useWalletLink } from "./hooks";

export default function ConnectWallet() {
    const { account, deactivate } = useWeb3React();

    const [opened, setOpened] = useState<boolean>(false);

    const SELECTED_CHAIN_ID: SupportedChainId = 250;

    const connectMetamask = useMetamask(SELECTED_CHAIN_ID);
    const connectWalletConnect = useWalletConnect(SELECTED_CHAIN_ID);
    const connectWalletLink = useWalletLink(SELECTED_CHAIN_ID);

    return (
        <>
            <Modal padding="xl" opened={opened} onClose={() => setOpened(false)}>
                <Box
                    pb="sm"
                    sx={(theme) => ({
                        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                    })}
                >
                    <Text size="md">Choose A Wallet</Text>
                </Box>
                <WalletSelector
                    closeModal={() => setOpened(false)}
                    connectors={{ metamask: connectMetamask, walletConnect: connectWalletConnect, walletLink: connectWalletLink }}
                />
            </Modal>

            <Group position="center">
                {account ? (
                    <Button onClick={() => deactivate()} variant="outline" color="indigo">
                        {account.slice(0, 6)}...{account.slice(account.length - 6, account.length)}
                    </Button>
                ) : (
                    <Button onClick={() => setOpened(true)} variant="gradient" gradient={{ from: "indigo", to: "grape", deg: 45 }}>
                        Connect
                    </Button>
                )}
            </Group>
        </>
    );
}
