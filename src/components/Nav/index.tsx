import { Navbar } from "@mantine/core";

import NavGroupHeader from "./NavGroupHeader";
import NavLinkRenderer from "./NavLinkRenderer";
import SocialLinkRenderer from "./SocialLinkRenderer";

export default function Nav() {
    function navContent() {
        return (
            <>
                <Navbar.Section grow>
                    <NavGroupHeader>Links</NavGroupHeader>
                    <NavLinkRenderer />
                </Navbar.Section>
                <Navbar.Section>
                    <NavGroupHeader>Socials</NavGroupHeader>
                    <SocialLinkRenderer />
                </Navbar.Section>
            </>
        );
    }

    return (
        <Navbar fixed position={{ top: 0, left: 0 }} p="xl" width={{ base: 300 }}>
            {navContent()}
        </Navbar>
    );
}
