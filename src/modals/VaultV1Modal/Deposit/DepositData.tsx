import { Box, Group, Text } from "@mantine/core";
import { Token } from "../../../utils";

export default function DepositData({ total, breakdown }: { total: string; breakdown: [Token, string][] }) {
    return (
        <Box
            sx={(theme) => ({
                borderTop: `1px solid ${theme.colors.dark[4]}`,
            })}
            pt="md"
        >
            <Group position="apart" mb="sm">
                <Text color="gray" weight={700} size="lg">
                    Total Cost
                </Text>
                <Text color="gray" weight={700} size="lg">
                    {total}
                </Text>
            </Group>
            {breakdown.map((data, index) => (
                <Group position="apart" key={index}>
                    <Text color="dimmed" weight={700} size="sm">
                        {data[0].name}
                    </Text>
                    <Text color="dimmed" weight={700} size="sm">
                        {data[1]}
                    </Text>
                </Group>
            ))}
        </Box>
    );
}
