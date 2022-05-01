import { AppShell, Paper } from "@mantine/core";

import { Header } from "..";
import { Nav } from "..";
import { useNavProvider } from "../../hooks";

export default function Shell({ children }: { children: any }) {
    const { opened } = useNavProvider();

    return (
        <AppShell
            padding="md"
            navbar={opened ? <Nav /> : undefined}
            header={<Header />}
            styles={(theme) => ({
                main: {
                    backgroundColor: theme.colors.dark[8],
                },
            })}
        >
            <Paper p="xl">{children}</Paper>
        </AppShell>
    );
}
