import { Box, Button, Group, Modal, NumberInput, Tabs, Text } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";
import { ArrowsMaximize, ArrowsMinimize } from "tabler-icons-react";
import { VaultInput } from "../../components";
import { Token, vaultDeposit } from "../../utils";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

export default function VaultV1Modal({ token, name, vault, opened, onClose }: { token: Token[]; name: string; vault: string; opened: boolean; onClose: () => void }) {
    const { account, library } = useWeb3React();

    return (
        <Modal opened={opened} onClose={onClose}>
            <Box
                pb="sm"
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                })}
            >
                <Text size="md">
                    <Text weight={700} component="span">
                        {name}
                    </Text>{" "}
                    Vault
                </Text>
            </Box>

            <Tabs grow mt="xl" color="indigo">
                <Tabs.Tab label="Deposit" icon={<ArrowsMinimize size={14} />}>
                    <Deposit />
                </Tabs.Tab>
                <Tabs.Tab label="Withdraw" icon={<ArrowsMaximize size={14} />}>
                    <Withdraw />
                </Tabs.Tab>
            </Tabs>

            {/* {account && library && <VaultInput token={token} account={account} vault={vault} library={library} />}
            <Group grow mt="xl">
                <Button size="lg" color="grape" onClick={async () => await vaultDeposit(vault, tokenAmount, library.getSigner())}>
                    Deposit
                </Button>
            </Group> */}
        </Modal>
    );
}
