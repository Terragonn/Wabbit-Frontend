import { Group, Header } from "@mantine/core";
import ConnectWallet from "../ConnectWallet";
import Logo from "../Logo";

export default function Head() {
    return (
        <Header height={80} p="xl">
            <Group position="apart">
                <Logo />
                <ConnectWallet />
            </Group>
        </Header>
    );
}
