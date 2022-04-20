import { Box } from "@mantine/core";
import { Eyeglass, BuildingBank } from "tabler-icons-react";

import NavLink from "../NavLink";

const data = [
    { icon: <Eyeglass size={16} />, color: "indigo", label: "Lens" },
    { icon: <BuildingBank size={16} />, color: "grape", label: "Lever" },
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
