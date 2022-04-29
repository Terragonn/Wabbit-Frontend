import { Group, Text } from "@mantine/core";

export default function Data({ vault }: { vault: string }) {
    return (
        <Group position="apart">
            <Text size="lg" color="dimmed">
                APY:{" "}
                <Text size="lg" weight={700} component="span" color="gray">
                    30 %
                </Text>
            </Text>
            <Text size="lg" color="dimmed">
                Balance:{" "}
                <Text size="lg" weight={700} component="span" color="gray">
                    $ 250
                </Text>
            </Text>
            <Text size="lg" color="dimmed">
                TVL:{" "}
                <Text size="lg" weight={700} component="span" color="gray">
                    $ 250.36 K
                </Text>
            </Text>
            <Text size="lg" color="dimmed">
                Fee:{" "}
                <Text size="lg" weight={700} component="span" color="gray">
                    5 %
                </Text>
            </Text>
        </Group>
    );
}
