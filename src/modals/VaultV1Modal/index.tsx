import { Tabs } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useWeb3React } from "@web3-react/core";
import { ArrowsMaximize, ArrowsMinimize } from "tabler-icons-react";

import { Token } from "../../utils";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

export default function VaultV1Modal({ context, id, innerProps: { token, name, vault } }: ContextModalProps<{ token: Token[]; name: string; vault: string }>) {
    const { account, library } = useWeb3React();

    if (account && library)
        return (
            <Tabs grow mt="xl" color="indigo">
                <Tabs.Tab label="Deposit" icon={<ArrowsMinimize size={14} />}>
                    <Deposit token={token} vault={vault} account={account} library={library} />
                </Tabs.Tab>
                <Tabs.Tab label="Withdraw" icon={<ArrowsMaximize size={14} />}>
                    <Withdraw vault={vault} library={library} />
                </Tabs.Tab>
            </Tabs>
        );

    return null;
}
