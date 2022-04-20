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

            {/* **** Now I need a way of showing the different strategies - on top of that they need to be able to show a model for each strategy to allow users to use it */}
            {/* **** This should only really be possible if there is someone connected - otherwise it will throw an error and ask them to connect */}
            {/* **** We also need some sort of default provider */}
        </>
    );
}
