import { Box } from "@mantine/core";
import { Eyeglass, BuildingBank } from "tabler-icons-react";

import NavLink from "../NavLink";

const data = [
    { icon: <Eyeglass size={16} />, color: "indigo", label: "Lens", href: "lens" },
    { icon: <BuildingBank size={16} />, color: "grape", label: "Lever", href: "lever" },
];

export default function NavLinkRenderer() {
    return (
        <div>
            {data.map((link, index) => (
                <Box mt={24} key={index}>
                    <NavLink {...link} />
                </Box>
            ))}
        </div>
    );
}
