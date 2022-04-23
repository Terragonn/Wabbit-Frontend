import { Box, Text, Title } from "@mantine/core";

import { VaultRenderer } from "../../components";

export default function LensPage() {
    return (
        <>
            <Box pb="sm">
                <Title order={2} mb={6}>
                    Torque Lens
                </Title>
                <Text color="dimmed">
                    Use our on-chain yield optimization / aggregations vaults to earn the best yields on your LP pairs with the least effort possible!
                </Text>
            </Box>
            <Title order={3} mt="lg" pb="sm">
                Vaults
            </Title>
            <VaultRenderer />
        </>
    );
}
