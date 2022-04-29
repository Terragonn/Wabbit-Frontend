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
            <Group position="apart">
                <Text color="gray" weight={700} size="lg">
                    Total Cost
                </Text>
                <Text color="gray" weight={700} size="lg">
                    {total}
                </Text>
            </Group>
            {breakdown.map((data, index) => (
                <Group key={index}>
                    <Text color="gray" weight={700} size="lg">
                        {data[0].name}
                    </Text>
                    <Text color="gray" weight={700} size="lg">
                        {data[1]}
                    </Text>
                </Group>
            ))}
        </Box>
    );
}
