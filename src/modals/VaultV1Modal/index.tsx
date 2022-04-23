import { Box, Group, Modal, NumberInput, Text } from "@mantine/core";
import { Token } from "../../utils";

export default function VaultV1Modal({ token, opened, onClose }: { token: Token[]; opened: boolean; onClose: () => void }) {
    return (
        <Modal opened={opened} onClose={onClose}>
            <Box
                pb="sm"
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                })}
            >
                <Text size="md">Vault</Text>
            </Box>
            {token.map((tkn, index) => (
                // **** Have an approve button next to this
                <Group grow>
                    <NumberInput mt="xl" label={tkn.name + " (" + tkn.ticker + ")"} placeholder="0.0" defaultValue={0} size="md" hideControls />
                </Group>
            ))}
        </Modal>
    );
}
