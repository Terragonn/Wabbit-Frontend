import { Navbar } from "@mantine/core";

import NavGroupHeader from "./NavGroupHeader";
import NavLinkRenderer from "./NavLinkRenderer";
import SocialLinkRenderer from "./SocialLinkRenderer";

export default function Nav() {
    return (
        <Navbar p="xl" width={{ base: 300 }}>
            <Navbar.Section grow>
                <NavGroupHeader>Links</NavGroupHeader>
                <NavLinkRenderer />
            </Navbar.Section>
            <Navbar.Section grow>
                <NavGroupHeader>Socials</NavGroupHeader>
                <SocialLinkRenderer />
            </Navbar.Section>
        </Navbar>
    );
}
