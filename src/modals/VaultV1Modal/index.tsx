import { Tabs } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { ArrowsMaximize, ArrowsMinimize } from "tabler-icons-react";

import { Token } from "../../utils";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

export default function VaultV1Modal({ context, id, innerProps: { token, name, vault } }: ContextModalProps<{ token: Token[]; name: string; vault: string }>) {
    return (
        <Tabs grow mt="xl" color="indigo">
            <Tabs.Tab label="Deposit" icon={<ArrowsMinimize size={14} />}>
                <Deposit token={token} vault={vault} />
            </Tabs.Tab>
            <Tabs.Tab label="Withdraw" icon={<ArrowsMaximize size={14} />}>
                <Withdraw />
            </Tabs.Tab>
        </Tabs>
    );
}
