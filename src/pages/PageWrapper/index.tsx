import {useWeb3React} from "@web3-react/core";
import Wallet from "../../components/Wallet";

export default function PageWrapper({children}: {children: any}) {
    const {active} = useWeb3React();

    return (
        <>
            {active ? (
                children
            ) : (
                <div className="mt-32 p-12 bg-neutral-900 rounded-xl glow pb-10 my-10 flex flex-col items-center justify-evenly bg-opacity-50 text-center">
                    <h2 className="font-bold text-white text-3xl">Connect Your Wallet</h2>
                    <p className="mt-4 mb-16 text-2xl font-medium text-neutral-400">Connect your wallet to access the dApp.</p>
                    <Wallet />
                </div>
            )}
        </>
    );
}
