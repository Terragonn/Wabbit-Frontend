import { Burger, Group, Header as _Header } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { ConnectWallet } from "..";
import { Logo } from "..";
import { useNavProvider } from "../../hooks";
import { useBreakpoint } from "../../hooks/Breakpoints";

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
