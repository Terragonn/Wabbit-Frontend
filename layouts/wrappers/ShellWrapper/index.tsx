import { AppShell } from "@mantine/core";

import Head from "../../../components/Head";
import Nav from "../../../components/Nav";

export default function ShellWrapper({ children }: { children: any }) {
    return (
        <AppShell padding="md" navbar={<Nav />} header={<Head />}>
            {children}
        </AppShell>
    );
}
