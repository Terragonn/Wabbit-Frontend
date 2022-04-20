import { Box } from "@mantine/core";
import { Eyeglass, BuildingBank } from "tabler-icons-react";

import NavLink from "../NavLink";

const data = [
    { icon: <Eyeglass size={16} />, color: "indigo", label: "Lens", href: "" },
    { icon: <BuildingBank size={16} />, color: "grape", label: "Lever", href: "" },
];

export default function NavLinkRenderer() {
    return (
        <div>
            {data.map((link, index) => (
                <Box mt={24}>
                    <NavLink {...link} key={index} />
                </Box>
            ))}
        </div>
    );
}
