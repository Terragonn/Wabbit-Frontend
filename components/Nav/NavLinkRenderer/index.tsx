import NavLink from "../NavLink";
import { Eyeglass } from "tabler-icons-react";

const data = [{ icon: <Eyeglass size={16} />, color: "blue", label: "Lens" }];

export default function NavLinkRenderer() {
    const links = data.map((link) => <NavLink {...link} key={link.label} />);
    return <div>{links}</div>;
}
