import { Box, Text, Title } from "@mantine/core";

import { VaultRenderer } from "../components";
import { LensHead } from "../head";

export default function LensPage() {
    return (
        <>
            <LensHead />
            <Box mb="lg">
                <Title order={2}>Torque Lens</Title>
                <Text color="dimmed">
                    Use our vaults which serve as an on-chain aggregator of yield aggregators yield to earn the best yields on your tokens with the least effort possible!
                </Text>
            </Box>
            <Title order={3} mb="sm">
                Vaults
            </Title>
            <VaultRenderer />
        </>
    );
}
