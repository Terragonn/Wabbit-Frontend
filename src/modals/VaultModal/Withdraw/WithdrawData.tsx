import { Box, Group, Text } from "@mantine/core";

import { useWithdrawData } from "../../../hooks";

export default function WithdrawData({ vault, account, percent }: { vault: string; account: string; percent: number }) {
    const { total, breakdown } = useWithdrawData(vault, account, percent);

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
                    <Box key={index} mb="sm">
                        <Group position="apart">
                            <Text color="dimmed" size="sm">
                                {data[0].name}
                            </Text>
                            <Text color="dimmed" size="sm">
                                {data[1]} {data[0].ticker}
                            </Text>
                        </Group>
                        <Group position="right">
                            <Text color="dimmed" size="sm">
                                {data[2]}
                            </Text>
                        </Group>
                    </Box>
                ))}
        </Box>
    );
}
