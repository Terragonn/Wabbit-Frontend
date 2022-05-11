import { Paper } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useWeb3React } from "@web3-react/core";

import { Token } from "../../utils";
import Data from "./Data";
import Display from "./Display";

export default function Vault({
    vault,
    name,
    token,
    aggregator,
    aggregated,
    tags,
    color,
    wrapper,
    disabled = false,
}: {
    vault: string;
    name: string;
    token: Token[];
    aggregator: Token;
    aggregated: Token[];
    tags: string[];
    color: string;
    wrapper: string;
    disabled?: boolean;
}) {
    const { active, account } = useWeb3React();

    const modals = useModals();

    return (
        <Paper
            p="xl"
            onClick={() => {
                if (disabled)
                    showNotification({
                        title: "Vault Error",
                        message: "This vault is currently disabled",
                        color: "red",
                    });
                else if (!active) {
                    showNotification({
                        title: "Wallet Error",
                        message: "Connect your wallet first to the correct network",
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
            <Display name={name} token={token} aggregator={aggregator} aggregated={aggregated} color={color} tags={tags} disabled={disabled} />
            {!disabled && vault && account && <Data vault={vault} account={account} />}
        </Paper>
    );
}
