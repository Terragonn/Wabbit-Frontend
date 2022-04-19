import { Navbar } from "@mantine/core";

export default function Nav() {
    return (
        <Navbar p="xl">
            <Navbar.Section grow>MainLinks</Navbar.Section>
            <Navbar.Section>Socials</Navbar.Section>
        </Navbar>
    );
}
