import { useState } from "react";
import { Box, Group, Slider } from "@mantine/core";
import { ethers } from "ethers";

import { Token, vaultRedeem } from "../../../utils";
import WithdrawData from "./WithdrawData";
import { ExecuteTransaction } from "../../../components";
import { useWithdrawData } from "../../../hooks";

export default function Withdraw({ token, vault, account, library }: { token: Token[]; vault: string; account: string; library: ethers.providers.JsonRpcSigner }) {
    const [percent, setPercent] = useState<number>(0);

    const { total, breakdown } = useWithdrawData(token, vault, account, percent);

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

                <WithdrawData total={total} breakdown={breakdown} />

                <Box
                    sx={(theme) => ({
                        borderTop: `1px solid ${theme.colors.dark[4]}`,
                    })}
                />
                <ExecuteTransaction
                    buttonProps={{
                        variant: "gradient",
                        mt: "md",
                        size: "lg",
                        gradient: { from: "pink", to: "grape", deg: 45 },
                    }}
                    action={async () => await vaultRedeem(vault, percent, library)}
                    actionLabel="Withdrawing tokens"
                >
                    Withdraw
                </ExecuteTransaction>
            </Group>
        </>
    );
}
