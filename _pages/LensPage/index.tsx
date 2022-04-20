import { Box, Text, Title } from "@mantine/core";
import VaultRenderer from "../../components/VaultRenderer";

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
                <Text color="dimmed">
                    Use our on-chain yield optimization / aggregations vaults to earn the best yields on your LP pairs with the least effort possible!
                </Text>
            </Box>
            <VaultRenderer />
        </>
    );
}
