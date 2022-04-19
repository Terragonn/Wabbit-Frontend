import NavLink from "../NavLink";
import { Eyeglass, BuildingBank } from "tabler-icons-react";

const data = [
    { icon: <Eyeglass size={16} />, color: "indigo", label: "Lens" },
    { icon: <BuildingBank size={16} />, color: "grape", label: "Lever" },
];

export default function NavLinkRenderer() {
    const links = data.map((link, index) => <NavLink {...link} key={index} />);
    return <div>{links}</div>;
}
