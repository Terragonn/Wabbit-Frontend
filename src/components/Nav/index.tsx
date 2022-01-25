import Wallet from "../Wallet";
import ChainSelector from "../ChainSelector";

export default function Nav({setNavState}: {setNavState: (state: boolean) => void}) {
    return (
        <nav className="py-8 flex items-center xl:justify-end justify-between space-x-10">
            <div className="xl:hidden block cursor-pointer" onClick={(e) => setNavState(true)}>
                <div className="px-5 py-1 my-1 bg-white glow rounded-md" />
                <div className="px-5 py-1 my-1 bg-white glow rounded-md" />
                <div className="px-5 py-1 my-1 bg-white glow rounded-md" />
            </div>
            <div className="flex items-center justify-evenly space-x-10">
                <ChainSelector />
                <Wallet />
            </div>
        </nav>
    );
}
