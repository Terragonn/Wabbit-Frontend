import { Box, Modal, Text } from "@mantine/core";
import { WalletSelector } from "../../components";

export default function WalletModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
    return (
        <Modal opened={opened} onClose={onClose}>
            <Box
                pb="sm"
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                })}
            >
                <Text size="md">Choose A Wallet</Text>
            </Box>
            <WalletSelector closeModal={onClose} />
        </Modal>
    );
}
