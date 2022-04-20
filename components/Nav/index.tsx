import { Navbar } from "@mantine/core";

import NavGroupHeader from "./NavGroupHeader";
import NavLinkRenderer from "./NavLinkRenderer";
import Social from "./Social";

export default function Nav() {
    return (
        <Navbar p="xl">
            <Navbar.Section grow>
                <NavGroupHeader>Links</NavGroupHeader>
                <NavLinkRenderer />
            </Navbar.Section>
            <Navbar.Section>
                <NavGroupHeader>Socials</NavGroupHeader>
                <Social />
            </Navbar.Section>
        </Navbar>
    );
}
