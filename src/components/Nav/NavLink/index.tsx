import { Anchor, Box, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";

export default function NavLink({ icon, color, label, href, mt }: { icon: ReactNode; color: string; label: string; href: string; mt: string }) {
    return (
        <Box mt={mt}>
            <Anchor href={href} component={Link}>
                <UnstyledButton
                    sx={(theme) => ({
                        display: "block",
                        width: "100%",
                        padding: theme.spacing.xs,
                        borderRadius: theme.radius.sm,
                        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

                        "&:hover": {
                            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                        },
                    })}
                >
                    <Group>
                        <ThemeIcon color={color} variant="light">
                            {icon}
                        </ThemeIcon>

                        <Text size="sm">{label}</Text>
                    </Group>
                </UnstyledButton>
            </Anchor>
        </Box>
    );
}
