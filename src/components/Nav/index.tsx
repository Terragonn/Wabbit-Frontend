import Wallet from "../Wallet";
import ChainSelector from "../ChainSelector";

export default function Nav({setNavState}: {setNavState: (state: boolean) => void}) {
    return (
        <nav className="py-8 flex items-center xl:justify-end justify-between xl:space-x-16">
            <div className="xl:hidden block cursor-pointer" onClick={(e) => setNavState(true)}>
                <div className="px-5 py-1 my-1 bg-white glow rounded-md" />
                <div className="px-5 py-1 my-1 bg-white glow rounded-md" />
                <div className="px-5 py-1 my-1 bg-white glow rounded-md" />
            </div>
            <ChainSelector />
            <Wallet />
        </nav>
    );
}
