import { Navbar } from "@mantine/core";

import NavGroupHeader from "./NavGroupHeader";
import NavLinkRenderer from "./NavLinkRenderer";
import SocialLinkRenderer from "./SocialLinkRenderer";

export default function Nav() {
    return (
        <Navbar fixed position={{ top: 0, left: 0 }} p="xl" width={{ base: 300 }}>
            <Navbar.Section grow>
                <NavGroupHeader>Links</NavGroupHeader>
                <NavLinkRenderer />
            </Navbar.Section>
            <Navbar.Section>
                <NavGroupHeader>Socials</NavGroupHeader>
                <SocialLinkRenderer />
            </Navbar.Section>
        </Navbar>
    );
}
