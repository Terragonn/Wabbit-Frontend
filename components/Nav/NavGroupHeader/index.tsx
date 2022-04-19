import { Box, Text } from "@mantine/core";

export default function NavGroupHeader({ children }: { children: any }) {
    return (
        <Box
            pb="sm"
            sx={(theme) => ({
                borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
            })}
        >
            <Text size="md">{children}</Text>
        </Box>
    );
}
