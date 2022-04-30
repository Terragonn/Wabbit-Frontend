import { Eyeglass, Coin, Planet, BuildingBank } from "tabler-icons-react";

import NavLink from "../NavLink";

export default function NavLinkRenderer() {
    return (
        <>
            <NavLink icon={<Eyeglass size={16} />} color={"indigo"} label="Lens" href="lens" mt="xl" />
            <NavLink icon={<Coin size={16} />} color={"blue"} label="Pawn" href="pawn" mt="xl" disabled={true} />
            <NavLink icon={<Planet size={16} />} color={"grape"} label="Portal" href="portal" mt="xl" disabled={true} />
            <NavLink icon={<BuildingBank size={16} />} color={"cyan"} label="Lever" href="lever" mt="xl" disabled={true} />
        </>
    );
}
