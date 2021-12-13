import Wallet from "../wallet";
import NavLink, { Link } from "./navLink";

function NavModal(props: { navLinks: Link[]; current: number; setPageId: (pageId: number) => void }) {
    return (
        <div className="bg-zinc-900 fixed inset-0 flex items-center justify-start z-10 flex-col">
            <span className="mx-auto w-full mt-40 mb-8">
                <Wallet />
            </span>
            <div className="mx-auto flex items-center justify-start flex-col w-full">
                {props.navLinks.map((link, index) => (
                    <NavLink key={index} current={link.id === props.current} link={link} setPageId={props.setPageId} />
                ))}
            </div>
        </div>
    );
}

export default NavModal;
