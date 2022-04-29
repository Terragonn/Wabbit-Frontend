import { Box, Button, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ethers } from "ethers";

import { Token, vaultDeposit } from "../../../utils";
import { VaultInput } from "../../../components";
import { useVaultDeposit } from "../../../hooks";

export default function Deposit({ token, vault, account, library }: { token: Token[]; vault: string; account: string; library: ethers.providers.JsonRpcSigner }) {
    const { tokenAmount, setTokenAmount } = useVaultDeposit(token);

    if (account && library)
        return (
            <>
                {account && library && (
                    <Box>
                        {token.map((tkn, index) => (
                            <Box key={index} mb="md">
                                <VaultInput token={tkn} vault={vault} library={library} onChange={(value) => setTokenAmount(tkn, value)} />
                            </Box>
                        ))}
                    </Box>
                )}

                <Group grow mt="lg">
                    <Button
                        variant="gradient"
                        size="lg"
                        gradient={{ from: "pink", to: "grape", deg: 45 }}
                        onClick={async () => {
                            try {
                                await vaultDeposit(vault, tokenAmount, library);
                            } catch (e: any) {
                                showNotification({
                                    title: "Error",
                                    message: e.data?.message || e.message,
                                    color: "red",
                                });
                            }
                        }}
                    >
                        Deposit
                    </Button>
                </Group>
            </>
        );

    return null;
}
