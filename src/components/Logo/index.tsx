import { Anchor, Text } from "@mantine/core";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" passHref>
            <Anchor underline={false}>
                <Text component="span" align="center" variant="gradient" gradient={{ from: "indigo", to: "grape", deg: 45 }} size="xl" weight={700} transform="uppercase">
                    Torque
                </Text>
            </Anchor>
        </Link>
    );
}
