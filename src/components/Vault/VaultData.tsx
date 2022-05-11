import { Group, Skeleton, Text } from "@mantine/core";

export default function VaultData({ label, align, value }: { label: string; align?: string; value?: string }) {
    if (value)
        return (
            <Text size="md" color="dimmed" align={align as any}>
                {label + " "}
                <Text size="lg" weight={700} component="span" color="gray">
                    {value}
                </Text>
            </Text>
        );
    else
        return (
            <Group position="apart" align={align as any}>
                <Text size="md" color="dimmed">
                    {label}
                </Text>
                <Skeleton height={8} radius="xl" />
            </Group>
        );
}
