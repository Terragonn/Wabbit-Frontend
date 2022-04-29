import { Badge, Box, Group, Text } from "@mantine/core";

import { Overlap, Token } from "../../utils";

export default function Display({ name, token, description, tags, color }: { name: string; token: Token[]; description: string; tags: string[]; color: string }) {
    return (
        <Group direction="column">
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
        </Group>
    );
}
