import { Box, Button, Modal, Text } from "@mantine/core";
import { useState } from "react";
import WalletCard from "./WalletCard";

export default function ConnectWallet() {
    const [opened, setOpened] = useState<boolean>(false);

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
                <WalletCard
                    name="Metamask"
                    imgURL="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                    onClick={() => console.log("Metamask")}
                />
                <WalletCard
                    name="WalletConnect"
                    imgURL="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/bftsslxvhe2yaih6nyl9"
                    onClick={() => console.log("WalletConnect")}
                />
                <WalletCard
                    name="WalletLink"
                    imgURL="https://play-lh.googleusercontent.com/wrgUujbq5kbn4Wd4tzyhQnxOXkjiGqq39N4zBvCHmxpIiKcZw_Pb065KTWWlnoejsg"
                    onClick={() => console.log("WalletLink")}
                />
            </Modal>

            <Button onClick={() => setOpened(true)} variant="gradient" gradient={{ from: "indigo", to: "grape", deg: 45 }}>
                Connect
            </Button>
        </>
    );
}
