import { Box, Text, Title } from "@mantine/core";

export default function LensPage() {
    return (
        <>
            <Box
                pb="sm"
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                })}
            >
                <Title order={2} mb={6}>
                    Torque Lens
                </Title>
                <Text color="dimmed">Hello world</Text>
            </Box>
        </>
    );
}
