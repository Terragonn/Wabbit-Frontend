import { Badge, Box, Group, Stack, Text } from "@mantine/core";

import { Overlap, Token } from "../../utils";
import TokenIcon from "../TokenIcon";

export default function Display({
    name,
    token,
    aggregator,
    aggregated,
    description,
    tags,
    color,
}: {
    name: string;
    token: Token[];
    aggregator: Token;
    aggregated: Token[];
    description: string;
    tags: string[];
    color: string;
}) {
    return (
        <Stack>
            <Overlap token={token} />
            <Box
                pb="md"
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colors.dark[4]}`,
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
            <Box
                pb="md"
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colors.dark[4]}`,
                })}
            >
                <Group position="apart">
                    <Overlap token={aggregated} />
                    <TokenIcon name={aggregator.name} src={aggregator.icon} width={24} />
                </Group>
            </Box>
        </Stack>
    );
}
