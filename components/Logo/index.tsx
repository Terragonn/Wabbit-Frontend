import { Text } from "@mantine/core";

export default function Logo() {
    return (
        <Text component="span" align="center" variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }} size="xl" weight={700}>
            Torque Money
        </Text>
    );
}
