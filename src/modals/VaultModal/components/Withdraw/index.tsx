import { useState } from "react";
import { Box, Slider, Stack } from "@mantine/core";
import { ethers } from "ethers";

import { approve, Token, vaultRedeem } from "../../../../utils";
import { WithdrawData, ExecuteTransaction } from "..";
import { useWithdrawData } from "./hooks";

export default function Withdraw({
    token,
    vault,
    wrapper,
    account,
    library,
}: {
    token: Token[];
    vault: string;
    wrapper: string;
    account: string;
    library: ethers.providers.JsonRpcSigner;
}) {
    const [percent, setPercent] = useState<number>(0);

    const { total, breakdown, approved, setApproved } = useWithdrawData(token, vault, account, percent, library, wrapper);

    return (
        <Stack>
            <Box my="xl">
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
                mb="md"
                sx={(theme) => ({
                    borderTop: `1px solid ${theme.colors.dark[4]}`,
                })}
            />

            {approved ? (
                <ExecuteTransaction
                    buttonProps={{
                        variant: "gradient",
                        size: "lg",
                        gradient: { from: "pink", to: "grape", deg: 45 },
                    }}
                    action={async () => await vaultRedeem(vault, percent, library, wrapper)}
                    actionLabel="Withdrawing tokens"
                >
                    Withdraw
                </ExecuteTransaction>
            ) : (
                <ExecuteTransaction
                    buttonProps={{
                        variant: "gradient",
                        size: "lg",
                        gradient: { from: "indigo", to: "pink", deg: 45 },
                    }}
                    action={async () => {
                        await approve(vault, wrapper, library);
                        setApproved(true);
                    }}
                    actionLabel="Approving token"
                >
                    Approve
                </ExecuteTransaction>
            )}
        </Stack>
    );
}
