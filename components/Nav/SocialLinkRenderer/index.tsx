import { Box } from "@mantine/core";
import { Code, Social } from "tabler-icons-react";

import NavLink from "../NavLink";

const data = [
    { icon: <Social size={16} />, color: "gray", label: "Links", href: "https://linktr.ee/torque_money" },
    { icon: <Code size={16} />, color: "gray", label: "Documentation", href: "https://docs.torque.money" },
];

export default function SocialLinks() {
    return (
        <div>
            {data.map((link, index) => (
                <Box mt={12} key={index}>
                    <NavLink {...link} />
                </Box>
            ))}
        </div>
    );
}
