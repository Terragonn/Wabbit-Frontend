import { Box, Paper } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useWeb3React } from "@web3-react/core";

import { Token } from "../../utils/";
import Data from "./Data";
import Display from "./Display";

export default function VaultV1({
    vault,
    name,
    description,
    token,
    tags,
    color,
}: {
    vault: string;
    name: string;
    description: string;
    token: Token[];
    tags: string[];
    color: string;
}) {
    const { active } = useWeb3React();

    const modals = useModals();

    return (
        <Paper
            p="xl"
            mb="md"
            onClick={() =>
                !active
                    ? showNotification({
                          title: "Wallet Error",
                          message: "Connect your wallet first to the correct network",
                          color: "red",
                      })
                    : modals.openContextModal("vaultV1", { title: "Vault", innerProps: { token, name, vault } })
            }
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[6],
                border: `2px solid ${theme.colors.dark[5]}`,
                borderRadius: theme.radius.md,
                cursor: "pointer",

                "&:hover": {
                    backgroundColor: theme.colors.dark[5],
                    border: `2px solid ${theme.colors.dark[4]}`,
                },
            })}
        >
            <Display name={name} token={token} description={description} color={color} tags={tags} />
            <Box mt="lg">
                <Data vault={vault} />
            </Box>
        </Paper>
    );
}
