import { Badge, Box, Group, Modal, Paper, Text } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { VaultV1Modal } from "../../modals";
import { useWalletModal } from "../../providers";

import { Overlap, Token } from "../../utils/";

export default function VaultV1({ name, description, token, tags, color }: { name: string; description: string; token: Token[]; tags?: string[]; color: string }) {
    const { active } = useWeb3React();

    const setWalletModalOpened = useWalletModal();

    const [opened, setOpened] = useState<boolean>(false);

    // **** I am going to have to pull the data into the modal

    return (
        <>
            <VaultV1Modal name={name} token={token} opened={opened} onClose={() => setOpened(false)} />

            <Paper
                p="xl"
                mb="md"
                onClick={() => (active ? setOpened(true) : setWalletModalOpened(true))}
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
                    border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
                    borderRadius: theme.radius.md,
                    cursor: "pointer",

                    "&:hover": {
                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
                        border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
                    },
                })}
            >
                <Overlap token={token} />
                <Box
                    mt="md"
                    pb="md"
                    sx={(theme) => ({
                        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
                    })}
                >
                    <Text size="xl" weight={700}>
                        {name}
                    </Text>
                    <Group mt="sm">
                        {tags &&
                            tags.map((tag, index) => (
                                <Badge color={color} key={index}>
                                    {tag}
                                </Badge>
                            ))}
                    </Group>
                    <Text mt="sm" color="dimmed" size="md">
                        {description}
                    </Text>
                </Box>
                <Box mt="md" pb="md">
                    <Group position="apart">
                        <Box>
                            <Text size="lg" color="dimmed">
                                APY
                            </Text>
                            <Text size="lg" weight={700}>
                                {/* {apy} % */}
                            </Text>
                        </Box>
                        <Box>
                            <Text size="lg" color="dimmed">
                                TVL
                            </Text>
                            <Text size="lg" weight={700}>
                                {/* $ {tvl} K */}
                            </Text>
                        </Box>
                    </Group>
                    <Group position="apart" mt="md">
                        <Box>
                            <Text size="lg" color="dimmed">
                                Fee
                            </Text>
                            <Text size="lg" weight={700}>
                                {/* {fee} % */}
                            </Text>
                        </Box>
                    </Group>
                </Box>
            </Paper>
        </>
    );
}
