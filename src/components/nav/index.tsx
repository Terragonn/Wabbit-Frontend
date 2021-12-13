import Wallet from "../wallet";
import NavLink, { Link } from "./navLink";

function Nav(props: { navLinks: Link[]; current: number; setPageId: (pageId: number) => void }) {
    return (
        <nav className="bg-zinc-900 mx-auto p-6 text-center drop-shadow-md">
            <div className="mx-auto w-5/6 flex items-center justify-evenly">
                <h1 className="mx-auto text-white font-bold text-lg">Wabbit</h1>
                <div className="mx-auto flex items-center justify-evenly">
                    {props.navLinks.map((link, index) => (
                        <NavLink key={index} current={link.id === props.current} link={link} setPageId={props.setPageId} />
                    ))}
                </div>
                <span className="mx-auto w-5/12">
                    <Wallet />
                </span>
            </div>
        </nav>
    );
}

export default Nav;
