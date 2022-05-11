import { useState } from "react";
import { Box, Stack } from "@mantine/core";
import { ethers } from "ethers";

import { Token, vaultDeposit } from "../../../../utils";
import { AcceptTOS, ExecuteTransaction, VaultInput, DepositData } from "..";
import { useDepositData, useVaultDeposit } from "./hooks";

export default function Deposit({ token, vault, wrapper, library }: { token: Token[]; vault: string; wrapper: string; library: ethers.providers.JsonRpcSigner }) {
    const { tokenAmount, setTokenAmount } = useVaultDeposit(token, vault);
    const { total, breakdown } = useDepositData(token, tokenAmount);

    const [agreed, setAgreed] = useState<boolean>(false);

    return (
        <Stack>
            <Box>
                {token.map((tkn, index) => (
                    <Box key={index} mb="md">
                        <VaultInput
                            token={tkn}
                            wrapper={wrapper}
                            library={library}
                            onChange={(value) => setTokenAmount(tkn, value)}
                            defaultValue={tokenAmount[tkn.address]}
                        />
                    </Box>
                ))}
            </Box>

            <DepositData total={total} breakdown={breakdown} />

            <Box
                sx={(theme) => ({
                    borderTop: `1px solid ${theme.colors.dark[4]}`,
                })}
            />
            <AcceptTOS checked={agreed} onChange={setAgreed} />

            <ExecuteTransaction
                buttonProps={{
                    variant: agreed ? "gradient" : "filled",
                    disabled: !agreed,
                    size: "lg",
                    gradient: { from: "pink", to: "grape", deg: 45 },
                }}
                action={async () => await vaultDeposit(vault, tokenAmount, library, wrapper)}
                actionLabel="Depositing tokens"
            >
                Deposit
            </ExecuteTransaction>
        </Stack>
    );
}
