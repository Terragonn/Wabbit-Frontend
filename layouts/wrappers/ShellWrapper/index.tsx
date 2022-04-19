import { AppShell, Navbar, Header } from "@mantine/core";
import Nav from "../../../components/Nav";

export default function ShellWrapper({ children }: { children: any }) {
    return (
        <AppShell padding="md" navbar={<Nav />}>
            {children}
        </AppShell>
    );
}
