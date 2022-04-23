import { Modal } from "@mantine/core";

export default function WalletModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
    return <Modal opened={opened} onClose={onClose}></Modal>;
}
