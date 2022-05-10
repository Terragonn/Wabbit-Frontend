import { Box, Paper } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useWeb3React } from "@web3-react/core";

import { Token } from "../../utils";
import Display from "./Display";

export default function Vault({
    vault,
    name,
    description,
    token,
    aggregator,
    aggregated,
    tags,
    color,
    wrapper,
}: {
    vault?: string;
    name: string;
    description: string;
    token: Token[];
    aggregator: Token;
    aggregated: Token[];
    tags: string[];
    color: string;
    wrapper?: string;
}) {
    const { active, account } = useWeb3React();

    const modals = useModals();

    return (
        <Paper
            p="xl"
            onClick={() => {
                if (!active)
                    showNotification({
                        title: "Wallet Error",
                        message: "Connect your wallet first to the correct network",
                        color: "red",
                    });
                else if (!vault) {
                    showNotification({
                        title: "Vault Error",
                        message: "This vault is not available",
                        color: "red",
                    });
                } else modals.openContextModal("vault", { title: "Vault", innerProps: { token, vault, wrapper } });
            }}
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
            <Display
                name={name}
                token={token}
                vault={vault}
                account={account}
                aggregator={aggregator}
                aggregated={aggregated}
                description={description}
                color={color}
                tags={tags}
            />
        </Paper>
    );
}
