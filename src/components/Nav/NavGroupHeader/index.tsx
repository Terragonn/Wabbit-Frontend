import { Box, Text } from "@mantine/core";

export default function NavGroupHeader({ children }: { children: any }) {
    return (
        <Box
            pb="sm"
            mb="sm"
            sx={(theme) => ({
                borderBottom: `1px solid ${theme.colors.dark[4]}`,
            })}
        >
            <Text size="md">{children}</Text>
        </Box>
    );
}
