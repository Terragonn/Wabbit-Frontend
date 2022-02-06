import {useWeb3React} from "@web3-react/core";
import useNavState from "../../../utils/providers/useNavState";
import NavLink from "../NavLink";

export default function SideNav() {
    const {account} = useWeb3React();

    const [navState, setNavState] = useNavState();

    return (
        <nav className={`fixed top-0 h-full w-80 bg-neutral-900 p-5 xl:glow xl:left-0 left-[-20rem] ${navState ? "!left-0 !glow" : ""}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 mb-8 cursor-pointer xl:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                onClick={(e) => setNavState(false)}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <a href="https://torque.money">
                <img src="https://i.imgur.com/dhNWbW3.png" width={200} className="pt-5 mx-auto" alt="Torque logo" />
            </a>
            <p className="text-center text-white font-bold text-xl pt-5 pb-24">
                {!account ? "Not Connected" : `${account.slice(0, 6)}...${account.slice(account.length - 6, account.length)}`}
            </p>
            <ul className="flex flex-col items-stretch space-y-16">
                <li>
                    <NavLink base="/dashboard" directories={[]}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink base="/wrap" directories={[]}>
                        Wrap
                    </NavLink>
                </li>
                <li>
                    <NavLink base="/provide-liquidity" directories={[]}>
                        Provide
                    </NavLink>
                </li>
                <li>
                    <NavLink base="/leverage" directories={[["/long", "Long"]]}>
                        Leverage
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center justify-evenly space-x-5 mx-auto mt-72 text-lg font-bold text-neutral-500 text-center w-3/4">
                <li>
                    <a className="hover:text-neutral-300" href="https://docs.torque.money/">
                        Docs
                    </a>
                </li>
                <li>
                    <a className="hover:text-neutral-300" href="https://linktr.ee/torque_money">
                        Links
                    </a>
                </li>
            </ul>
        </nav>
    );
}
