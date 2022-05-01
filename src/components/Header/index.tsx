import { Burger, Group, Header as _Header, MediaQuery } from "@mantine/core";

import { ConnectWallet } from "..";
import { Logo } from "..";
import { useNavProvider } from "../../hooks";

export default function Header() {
    const { opened, setOpened } = useNavProvider();

    return (
        <_Header height={80} p="xl">
            <Group position="apart">
                <MediaQuery largerThan="lg" styles={{ display: "none" }}>
                    <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
                </MediaQuery>
                <Logo />
                <ConnectWallet />
            </Group>
        </_Header>
    );
}
