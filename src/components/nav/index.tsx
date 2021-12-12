import Wallet from "../wallet";
import NavLink, { Link } from "./navLink";

function Nav(props: { navLinks: Link[]; current: number; setPageId: (pageId: number) => void }) {
    return (
        <nav className="bg-zinc-900 mx-auto p-6 flex items-center justify-evenly">
            <div className="mx-auto flex items-center justify-evenly">
                {props.navLinks.map((link, index) => (
                    <NavLink key={index} current={link.id === props.current} link={link} setPageId={props.setPageId} />
                ))}
            </div>
            <Wallet />
        </nav>
    );
}

export default Nav;
