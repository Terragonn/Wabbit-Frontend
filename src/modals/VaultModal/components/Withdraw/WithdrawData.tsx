import { Box, Group, Text } from "@mantine/core";

import { Token } from "../../../../utils";

export default function WithdrawData({ total, breakdown }: { total: string; breakdown: [Token, string, string][] }) {
    return (
        <Box
            sx={(theme) => ({
                borderTop: `1px solid ${theme.colors.dark[4]}`,
            })}
            pt="xl"
        >
            <Group position="apart" mb="md">
                <Text color="gray" weight={700} size="md">
                    Total Withdraw
                </Text>
                <Text color="gray" weight={700} size="md">
                    {total}
                </Text>
            </Group>
            {breakdown &&
                breakdown.map((data, index) => (
                    <Box key={index} mb={index != breakdown.length - 1 ? "sm" : undefined}>
                        <Group position="apart">
                            <Text color="dimmed" size="sm">
                                {data[0].name}
                            </Text>
                            <Text color="dimmed" size="sm">
                                {data[1]} {data[0].ticker}
                            </Text>
                        </Group>
                        <Group position="right">
                            <Text color="dimmed" weight={700} size="sm">
                                {data[2]}
                            </Text>
                        </Group>
                    </Box>
                ))}
        </Box>
    );
}
