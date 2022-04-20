import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import WalletSelector from "./WalletSelector";
import { SupportedChainId } from "../../utils/ChainData";
import { network } from "../../connectors";

export default function ConnectWallet() {
    const { account, activate, deactivate, active } = useWeb3React();

    const [opened, setOpened] = useState<boolean>(false);

    const selectedChainId: SupportedChainId = 250;

    useEffect(() => {
        activate(network(selectedChainId), undefined, true);
    }, [active]);

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
                <WalletSelector chainId={selectedChainId} closeModal={() => setOpened(false)} />
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
