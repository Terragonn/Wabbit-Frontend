import { AppShell, Navbar, Header } from "@mantine/core";

import Head from "../../../components/Header";
import Nav from "../../../components/Nav";

export default function ShellWrapper({ children }: { children: any }) {
    return (
        <AppShell padding="md" navbar={<Nav />} header={<Head />}>
            {children}
        </AppShell>
    );
}
