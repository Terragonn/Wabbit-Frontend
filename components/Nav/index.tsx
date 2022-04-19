import { Navbar } from "@mantine/core";

export default function Nav() {
    return (
        <Navbar p="xl">
            <Navbar.Section>Brand</Navbar.Section>
            <Navbar.Section grow>MainLinks</Navbar.Section>
        </Navbar>
    );
}
