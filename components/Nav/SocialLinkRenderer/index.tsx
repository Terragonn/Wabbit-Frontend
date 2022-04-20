import { Box } from "@mantine/core";
import { Code, Social } from "tabler-icons-react";

import NavLink from "../NavLink";

const data = [
    { icon: <Social size={16} />, color: "gray", label: "Links" },
    { icon: <Code size={16} />, color: "gray", label: "Documentation" },
];

export default function SocialLinks() {
    return (
        <div>
            {data.map((link, index) => (
                <Box mt={12}>
                    <NavLink {...link} key={index} />
                </Box>
            ))}
        </div>
    );
}
