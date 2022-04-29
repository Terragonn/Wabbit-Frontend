import { Box, Group, Text } from "@mantine/core";

export default function Data() {
    return (
        <>
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
        </>
    );
}
