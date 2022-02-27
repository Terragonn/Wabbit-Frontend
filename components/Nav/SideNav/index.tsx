import useContracts from "../../../providers/useContracts";

import useNavState from "../../../providers/useNavState";
import useENS from "../../../hooks/useENS";

import NavLink from "../NavLink";

export default function SideNav() {
    const contracts = useContracts();
    const [navState, setNavState] = useNavState();

    const {account, ensName, ensAvatar} = useENS(contracts?.signer);

    return (
        <nav className={`fixed overflow-y-auto top-0 h-full w-80 bg-neutral-900 bg-opacity-95 p-5 xl:glow xl:left-0 left-[-20rem] ${navState ? "!left-0 !glow" : ""}`}>
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
            <div className="pt-5 pb-24 flex items-center justify-center space-x-3">
                {ensAvatar ? <img className="h-8 w-8 rounded-full" src={ensAvatar} alt="ENS Avatar" /> : null}
                <p className="text-center text-white font-bold text-xl">
                    {!account ? "Not Connected" : ensName || `${account.slice(0, 6)}...${account.slice(account.length - 6, account.length)}`}
                </p>
            </div>
            <ul className="flex flex-col items-stretch space-y-16">
                <li>
                    <NavLink base="/" directories={[]}>
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
                    <NavLink base="/collateral" directories={[]}>
                        Collateral
                    </NavLink>
                </li>
                <li>
                    <NavLink base="/leverage" directories={[["/long", "Long"]]}>
                        Leverage
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center justify-evenly space-x-5 mx-auto mt-48 text-lg font-bold text-neutral-500 text-center w-3/4">
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
