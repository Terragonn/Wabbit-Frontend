import { Code, Social } from "tabler-icons-react";

import NavLink from "../NavLink";

export default function SocialLinks() {
    const links: { icon: JSX.Element; color: string; label: string; href: string; mb: string; disabled?: boolean }[] = [
        {
            icon: <Social size={16} />,
            color: "gray",
            label: "Links",
            href: "https://linktr.ee/torque_money",
            mb: "sm",
        },
        {
            icon: <Code size={16} />,
            color: "gray",
            label: "Documentation",
            href: "https://docs.torque.money",
            mb: "sm",
        },
    ];

    return (
        <>
            {links.map((link, index) => (
                <NavLink key={index} {...link} />
            ))}
        </>
    );
}
