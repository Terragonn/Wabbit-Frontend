import { Badge, Box, Group, Stack, Text } from "@mantine/core";

import { Overlap, Token } from "../../utils";
import { TokenIcon } from "..";

export default function Display({
    name,
    token,
    aggregator,
    aggregated,
    tags,
    color,
    disabled = false,
}: {
    name: string;
    token: Token[];
    aggregator: Token;
    aggregated: Token[];
    tags: string[];
    color: string;
    disabled?: boolean;
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
                        {name}{" "}
                        {disabled && (
                            <Text size="xl" color="dimmed" component="span">
                                (Disabled)
                            </Text>
                        )}
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
            </Box>
            <Group position="apart" mb="xl">
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
        </Stack>
    );
}
