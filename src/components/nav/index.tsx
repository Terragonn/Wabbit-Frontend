import { useState } from "react";
import Wallet from "../wallet";
import NavLink, { Link } from "./navLink";

import NavModal from "./navModal";

function Nav(props: { navLinks: Link[]; current: number; setPageId: (pageId: number) => void }) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            {modalVisible ? <NavModal /> : null}
            <nav className="bg-zinc-900 mx-auto p-6 text-center lg:drop-shadow-md drop-shadow-none relative z-20">
                <div className="mx-auto w-5/6 flex items-center justify-evenly">
                    <h1 className="mx-auto text-white font-bold text-lg">Wabbit</h1>
                    <div className="mx-auto items-center justify-evenly lg:flex hidden">
                        {props.navLinks.map((link, index) => (
                            <NavLink key={index} current={link.id === props.current} link={link} setPageId={props.setPageId} />
                        ))}
                    </div>
                    <span className="mx-auto w-5/12 lg:block hidden">
                        <Wallet />
                    </span>
                    <div className="mx-auto cursor-pointer" onClick={() => setModalVisible(!modalVisible)}>
                        <div className="px-4 pt-1 my-1 bg-white" />
                        <div className="px-4 pt-1 my-1 bg-white" />
                        <div className="px-4 pt-1 my-1 bg-white" />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
