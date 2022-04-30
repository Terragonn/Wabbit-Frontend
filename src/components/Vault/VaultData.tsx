import { Group, Skeleton, Text } from "@mantine/core";

export default function VaultData({ label, value }: { label: string; value: string | undefined }) {
    if (value)
        return (
            <Text size="md" color="dimmed">
                {label + " "}
                <Text size="lg" weight={700} component="span" color="gray">
                    {value}
                </Text>
            </Text>
        );
    else
        return (
            <Group position="apart">
                <Text size="md" color="dimmed">
                    {label}
                </Text>
                <Skeleton height={8} radius="xl" />
            </Group>
        );
}
