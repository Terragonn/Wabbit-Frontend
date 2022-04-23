import { Badge, Box, Group, Modal, Paper, Text } from "@mantine/core";
import { useState } from "react";

import Overlap from "../../../utils/TokenArrange";
import { Token } from "../../../utils/TokenData";

export default function VaultV1({
    name,
    description,
    token,
    tags,
    color,
    apy,
    tvl,
    fee,
}: {
    name: string;
    description: string;
    token: Token[];
    tags?: string[];
    color: string;
    apy: number;
    tvl: number;
    fee: number;
}) {
    const [opened, setOpened] = useState<boolean>(false);

    // **** I need some way of getting a list of tokens that the user can use
    // **** When they click on the vault it will toggle the modal which will show all of the options they have to interact with the vault
    // **** Should also be some sort of agreement

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)}>
                <Box
                    pb="sm"
                    sx={(theme) => ({
                        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                    })}
                >
                    <Text size="md">
                        Vault{" "}
                        <Text component="span" weight={700}>
                            {name}
                        </Text>
                    </Text>
                </Box>
            </Modal>

            <Paper
                p="xl"
                mb="md"
                onClick={() => setOpened(true)}
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
                                {apy} %
                            </Text>
                        </Box>
                        <Box>
                            <Text size="lg" color="dimmed">
                                TVL
                            </Text>
                            <Text size="lg" weight={700}>
                                $ {tvl} K
                            </Text>
                        </Box>
                    </Group>
                    <Group position="apart" mt="md">
                        <Box>
                            <Text size="lg" color="dimmed">
                                Fee
                            </Text>
                            <Text size="lg" weight={700}>
                                {fee} %
                            </Text>
                        </Box>
                    </Group>
                </Box>
            </Paper>
        </>
    );
}
