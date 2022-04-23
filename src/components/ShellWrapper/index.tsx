import { AppShell, Paper } from "@mantine/core";

import Head from "../Head";
import Nav from "../Nav";

export default function ShellWrapper({ children }: { children: any }) {
    return (
        <AppShell
            padding="md"
            navbar={<Nav />}
            header={<Head />}
            styles={(theme) => ({
                main: {
                    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
        >
            <Paper p="xl">{children}</Paper>
        </AppShell>
    );
}
