import { useState } from "react";
import { Box, Button, Group, Slider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ethers } from "ethers";

import { vaultRedeem } from "../../../utils";
import WithdrawData from "./WithdrawData";
import { ExecuteTransaction } from "../../../components";

export default function Withdraw({ vault, account, library }: { vault: string; account: string; library: ethers.providers.JsonRpcSigner }) {
    const [percent, setPercent] = useState<number>(0);

    return (
        <>
            <Group grow mt="lg" direction="column">
                <Box mb="xl">
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

                <WithdrawData percent={percent} account={account} vault={vault} />

                <ExecuteTransaction
                    buttonProps={{
                        variant: "gradient",
                        mt: "md",
                        size: "lg",
                        gradient: { from: "pink", to: "grape", deg: 45 },
                    }}
                    action={async () => await vaultRedeem(vault, percent, library)}
                >
                    Withdraw
                </ExecuteTransaction>
            </Group>
        </>
    );
}
