import { Eyeglass, Coin, Planet, BuildingBank } from "tabler-icons-react";

import NavLink from "../NavLink";

export default function NavLinkRenderer() {
    return (
        <>
            <NavLink icon={<Eyeglass size={16} />} color={"indigo"} label="Lens" href="/lens" mt="xl" />
        </>
    );
}
