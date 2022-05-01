import { Burger, Group, Header as _Header } from "@mantine/core";
import { useEffect, useState } from "react";

import { ConnectWallet, Logo } from "..";
import { useNavProvider, useBreakpoint } from "../../hooks";

export default function Header() {
    const { opened, setOpened } = useNavProvider();

    const { ltMd } = useBreakpoint();

    return (
        <_Header height={80} p="xl">
            <Group position="apart">
                {ltMd && <Burger opened={opened} onClick={() => setOpened((o) => !o)} />}
                <Logo />
                <ConnectWallet />
            </Group>
        </_Header>
    );
}
