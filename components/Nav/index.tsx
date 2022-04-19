import { Navbar } from "@mantine/core";
import NavGroupHeader from "./NavGroupHeader";
import NavLinkRenderer from "./NavLinkRenderer";

export default function Nav() {
    return (
        <Navbar p="xl">
            <Navbar.Section grow>
                <NavGroupHeader>Links</NavGroupHeader>
                <NavLinkRenderer />
            </Navbar.Section>
            <Navbar.Section>
                <NavGroupHeader>Socials</NavGroupHeader>
            </Navbar.Section>
        </Navbar>
    );
}
