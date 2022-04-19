import { Navbar } from "@mantine/core";
import NavLinkRenderer from "./NavLinkRenderer";

export default function Nav() {
    return (
        <Navbar p="xl">
            <Navbar.Section grow>
                <NavLinkRenderer />
            </Navbar.Section>
            <Navbar.Section>Socials</Navbar.Section>
        </Navbar>
    );
}
