import { Eyeglass, BuildingBank, Coin } from "tabler-icons-react";

import NavLink from "../NavLink";

export default function NavLinkRenderer() {
    return (
        <>
            <NavLink icon={<Eyeglass size={16} />} color={"indigo"} label="Lens" href="lens" mt="xl" />
            <NavLink icon={<BuildingBank size={16} />} color={"grape"} label="Lever" href="lever" mt="xl" disabled={true} />
            <NavLink icon={<Coin size={16} />} color={"blue"} label="Pawn" href="pawn" mt="xl" disabled={true} />
        </>
    );
}
