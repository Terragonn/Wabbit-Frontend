import { useWeb3React } from "@web3-react/core";
import NavLink from "./navLink";

export default function SideNav({
  navState,
  setNavState,
}: {
  navState: boolean;
  setNavState: (state: boolean) => void;
}) {
  const { account } = useWeb3React();

  return (
    <nav
      className={`fixed top-0 h-full w-80 bg-neutral-900 p-5 xl:glow xl:left-0 left-[-20rem] ${
        navState ? "!left-0 !glow" : ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-8 cursor-pointer xl:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        onClick={(e) => setNavState(false)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <a href="https://torque.money">
        <img
          src={require("../../images/logo1.png")}
          width={200}
          className="pt-5 mx-auto"
          alt="Torque logo"
        />
      </a>
      <p className="text-center text-white font-bold text-xl pt-5 pb-24">
        {!account
          ? "Not Connected"
          : `${account.slice(0, 6)}...${account.slice(
              account.length - 6,
              account.length
            )}`}
      </p>
      <ul className="flex flex-col space-y-16">
        <li>
          <NavLink base="dashboard" directories={[]}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink base="stake" directories={[]}>
            Stake
          </NavLink>
        </li>
        <li>
          <NavLink base="leverage" directories={["long", "short"]}>
            Leverage
          </NavLink>
        </li>
        <li>
          <NavLink base="reserve" directories={[]}>
            Reserve
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
