import { Link } from "react-router-dom";
import NavLink from "./navLink";

export default function SideNav() {
    return (
        <nav className="fixed top-0 left-0 h-screen w-80 bg-neutral-900 p-5 shadow-xl shadow-fuchsia-500/20">
            <Link to="">
                <img src={require("../../images/logo1.png")} width={200} className="pt-5 mx-auto" alt="Torque logo" />
            </Link>
            <p className="text-center text-white font-bold text-xl pt-5 pb-24">0xa02E...7EfA</p>
            <ul className="flex flex-col space-y-16">
                <li>
                    <NavLink base="dashboard" directories={["leverage"]}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink base="stake" directories={["leverage"]}>
                        Stake
                    </NavLink>
                </li>
                <li>
                    <NavLink base="leverage" directories={[]}>
                        Leverage
                    </NavLink>
                </li>
                <li>
                    <NavLink base="yield" directories={[]}>
                        Yield
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
