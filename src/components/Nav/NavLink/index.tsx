import { Anchor, Box, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";

export default function NavLink({
    icon,
    color,
    label,
    href,
    mt,
    disabled = false,
}: {
    icon: ReactNode;
    color: string;
    label: string;
    href: string;
    mt: string;
    disabled?: boolean;
}) {
    const link = (
        <UnstyledButton
            sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colors.dark[0],

                "&:hover": {
                    backgroundColor: theme.colors.dark[6],
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
    );

    return (
        <Box mt={mt}>
            {disabled ? (
                link
            ) : (
                <Anchor href={href} component={Link}>
                    {link}
                </Anchor>
            )}
        </Box>
    );
}
