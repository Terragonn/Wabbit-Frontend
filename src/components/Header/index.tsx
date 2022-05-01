import { Burger, Group, Header as _Header } from "@mantine/core";

import { ConnectWallet, Logo } from "..";
import { useNavProvider, useBreakpoint } from "../../hooks";

export default function Header() {
    const { opened, setOpened } = useNavProvider();

    const { matchesMd } = useBreakpoint();

    return (
        <_Header height={80} p="xl">
            <Group position="apart">
                {matchesMd && <Burger opened={opened} onClick={() => setOpened((o) => !o)} />}
                <Logo />
                <ConnectWallet />
            </Group>
        </_Header>
    );
}
