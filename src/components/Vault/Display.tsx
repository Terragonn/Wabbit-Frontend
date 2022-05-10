import { Badge, Box, Group, Stack, Text } from "@mantine/core";

import { Overlap, Token } from "../../utils";
import TokenIcon from "../TokenIcon";
import Data from "./Data";

export default function Display({
    name,
    token,
    aggregator,
    vault,
    account,
    aggregated,
    description,
    tags,
    color,
}: {
    name: string;
    vault?: string;
    account?: string;
    token: Token[];
    aggregator: Token;
    aggregated: Token[];
    description: string;
    tags: string[];
    color: string;
}) {
    return (
        <Stack>
            <Box
                pb="md"
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colors.dark[4]}`,
                })}
            >
                <Group mb="xl">
                    <Overlap token={token} />
                    <Text size="xl" weight={700}>
                        {name}
                    </Text>
                </Group>
                <Group mt="sm">
                    {tags &&
                        tags.map((tag, index) => (
                            <Badge color={color} key={index}>
                                {tag}
                            </Badge>
                        ))}
                </Group>
                {/* <Text my="md" color="dimmed" size="md">
                    {description}
                </Text> */}
            </Box>
            <Group position="apart">
                <Stack>
                    <Text color="dimmed" size="sm">
                        Aggregated
                    </Text>
                    <Overlap token={aggregated} />
                </Stack>
                <Stack align="flex-end">
                    <Text color="dimmed" size="sm">
                        Aggregator
                    </Text>
                    <TokenIcon name={aggregator.name} src={aggregator.icon} width={32} />
                </Stack>
            </Group>
            <Box mt="sm">{vault && account && <Data vault={vault} account={account} />}</Box>
        </Stack>
    );
}
