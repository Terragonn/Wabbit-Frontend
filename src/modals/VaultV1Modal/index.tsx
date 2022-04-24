import { Box, Modal, Tabs, Text } from "@mantine/core";
import { ArrowsMaximize, ArrowsMinimize } from "tabler-icons-react";

import { Token } from "../../utils";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

export default function VaultV1Modal({ token, name, vault, opened, onClose }: { token: Token[]; name: string; vault: string; opened: boolean; onClose: () => void }) {
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
                    <Deposit token={token} vault={vault} />
                </Tabs.Tab>
                <Tabs.Tab label="Withdraw" icon={<ArrowsMaximize size={14} />}>
                    <Withdraw />
                </Tabs.Tab>
            </Tabs>
        </Modal>
    );
}
