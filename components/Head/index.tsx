import { Header } from "@mantine/core";
import Logo from "../Logo";

export default function Head() {
    return (
        <Header height={80} p="xl">
            <Logo />
        </Header>
    );
}

// https://github.com/mantinedev/mantine/tree/master/src/mantine-demos/src/demos/core/AppShell
// https://mantine.dev/core/app-shell/#navbar-and-aside-components
