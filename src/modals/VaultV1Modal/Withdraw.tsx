import { useState } from "react";
import { Box, Button, Group, Slider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { vaultRedeem } from "../../utils";

export default function Withdraw({ vault, library }: { vault: string; library: any }) {
    const [percent, setPercent] = useState<number>(0);

    return (
        <>
            <Group grow mt="lg" direction="column">
                <Box mb="lg">
                    <Slider
                        marks={[
                            { value: 20, label: "20%" },
                            { value: 50, label: "50%" },
                            { value: 80, label: "80%" },
                        ]}
                        color="pink"
                        onChange={(value) => setPercent(value / 100)}
                    />
                </Box>
                <Button
                    variant="gradient"
                    size="lg"
                    gradient={{ from: "pink", to: "grape", deg: 45 }}
                    onClick={async () => {
                        try {
                            await vaultRedeem(vault, percent, library.getSigner());
                        } catch (e: any) {
                            showNotification({
                                title: "Error",
                                message: e.data?.message || e.message,
                                color: "red",
                            });
                        }
                    }}
                >
                    Withdraw
                </Button>
            </Group>
        </>
    );
}
