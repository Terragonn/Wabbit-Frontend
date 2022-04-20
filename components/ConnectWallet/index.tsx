import { Button, Modal } from "@mantine/core";
import { useState } from "react";

export default function ConnectWallet() {
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)}>
                Hello World
            </Modal>

            <Button onClick={() => setOpened(true)} variant="gradient" gradient={{ from: "indigo", to: "grape", deg: 45 }}>
                Connect
            </Button>
        </>
    );
}
