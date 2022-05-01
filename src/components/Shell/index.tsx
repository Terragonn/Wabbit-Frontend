import { AppShell, Paper } from "@mantine/core";

import { Header } from "..";
import { Nav } from "..";

export default function Shell({ children }: { children: any }) {
    return (
        <AppShell
            padding="md"
            navbar={<Nav />}
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
