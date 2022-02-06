import Wallet from "../../Wallet/Wallet";
import ChainSelector from "../../ChainSelector";
import useNavState from "../../../utils/providers/useNavState";

export default function Nav() {
    const [, setNavState] = useNavState();

    return (
        <nav className="py-8 flex items-center xl:justify-end justify-between space-x-10">
            <div className="xl:hidden block cursor-pointer" onClick={(e) => setNavState(true)}>
                <i className="block px-5 py-1 my-1 bg-white glow rounded-md" />
                <i className="block px-5 py-1 my-1 bg-white glow rounded-md" />
                <i className="block px-5 py-1 my-1 bg-white glow rounded-md" />
            </div>
            <div className="flex items-center justify-evenly space-x-10">
                <ChainSelector />
                <Wallet />
            </div>
        </nav>
    );
}
