import { AppShell, Paper } from "@mantine/core";

import Head from "../Head";
import Nav from "../Nav";

export default function ShellWrapper({ children }: { children: any }) {
    return (
        <AppShell padding="md" navbar={<Nav />} header={<Head />}>
            <Paper p="xl">{children}</Paper>
        </AppShell>
    );
}
