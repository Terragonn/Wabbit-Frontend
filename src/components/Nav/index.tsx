import { Navbar } from "@mantine/core";
import { useBreakpoint, useNavProvider } from "../../hooks";

import NavGroupHeader from "./NavGroupHeader";
import NavLinkRenderer from "./NavLinkRenderer";
import SocialLinkRenderer from "./SocialLinkRenderer";

export default function Nav() {
    const { ltLg } = useBreakpoint();
    const { opened } = useNavProvider();

    function NavWrapper({ children }: { children: any }) {
        if (ltLg && opened)
            return (
                <Navbar fixed position={{ top: 0, left: 0 }} p="xl" width={{ base: 300 }}>
                    {children}
                </Navbar>
            );
        else if (!ltLg)
            return (
                <Navbar p="xl" width={{ base: 300 }}>
                    {children}
                </Navbar>
            );
        else return null;
    }

    return (
        <NavWrapper>
            <Navbar.Section grow>
                <NavGroupHeader>Links</NavGroupHeader>
                <NavLinkRenderer />
            </Navbar.Section>
            <Navbar.Section>
                <NavGroupHeader>Socials</NavGroupHeader>
                <SocialLinkRenderer />
            </Navbar.Section>
        </NavWrapper>
    );
}
