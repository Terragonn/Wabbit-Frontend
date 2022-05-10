import { Anchor, Box, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { forwardRef, ReactNode } from "react";

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
    const ButtonLink = forwardRef<HTMLAnchorElement, { href?: string }>(({ href }, ref) => {
        return (
            <Anchor href={href} underline={false} ref={ref}>
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
            </Anchor>
        );
    });
    ButtonLink.displayName = "ButtonLink";

    return (
        <Box mt={mt}>
            {disabled ? (
                <ButtonLink />
            ) : (
                <Link href={href} passHref>
                    <ButtonLink />
                </Link>
            )}
        </Box>
    );
}
