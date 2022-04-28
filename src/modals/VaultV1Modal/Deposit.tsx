import { Box, Button, Group } from "@mantine/core";

import { Token, vaultDeposit } from "../../utils";
import { Input } from "../../components";
import { useVaultDeposit } from "../../hooks";
import { showNotification } from "@mantine/notifications";

export default function Deposit({ token, vault, account, library }: { token: Token[]; vault: string; account: string; library: any }) {
    const { tokenAmount, setTokenAmount } = useVaultDeposit(token);

    if (account && library)
        return (
            <>
                {account && library && (
                    <Box>
                        {token.map((tkn, index) => (
                            <Box key={index} mb="md">
                                <Input token={tkn} account={account} vault={vault} library={library} onChange={(value) => setTokenAmount(tkn, value)} />
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
                                await vaultDeposit(vault, tokenAmount, library.getSigner());
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
