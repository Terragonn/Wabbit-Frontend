import { Group, Header as _Header } from "@mantine/core";

import { ConnectWallet } from "..";
import { Logo } from "..";

export default function Header() {
    return (
        <_Header height={80} p="xl">
            <Group position="apart">
                <Logo />
                <ConnectWallet />
            </Group>
        </_Header>
    );
}
