import { useEffect } from "react";
import parseTime from "../../utils/parseTime";
import useContracts from "../../utils/useContracts";
import Wallet from "../wallet";

function Base(props: { children: any }) {
    const [contracts] = useContracts();

    useEffect(() => {
        (async () => {
            const pool = contracts?.pool;
            const currentPeriodId = await pool?.currentPeriodId();

            const prologueTimes = await pool?.getPrologueTimes();
            const epilogueTimes = await pool?.getEpilogueTimes();
        })();
    }, []);

    const prologueTimes = [Date.now(), Date.now()];
    const epilogueTimes = [Date.now(), Date.now() + 10000];

    const prologueActive = Date.now() >= prologueTimes[0] && Date.now() < prologueTimes[1];
    const epilogueActive = Date.now() >= epilogueTimes[0] && Date.now() < epilogueTimes[1];

    function activeClass(active: boolean) {
        return `${active ? "bg-emerald-300 text-green-600" : "bg-red-400 text-rose-700"} px-2 py-1 rounded-md ml-2`;
    }

    return (
        <>
            <div className="mx-auto w-4/5 bg-zinc-900 my-10 p-8 rounded-md drop-shadow-sm text-center">
                <h1 className="font-medium text-white text-lg flex items-center justify-evenly sm:flex-row flex-col">
                    <span className="sm:my-0 mb-4">
                        Prologue: <span className={activeClass(prologueActive)}>{prologueActive ? "active" : "inactive"}</span>
                    </span>
                    <span className="sm:my-0 mb-4">
                        Epilogue: <span className={activeClass(epilogueActive)}>{epilogueActive ? "active" : "inactive"}</span>
                    </span>
                    <span>Period end: {parseTime(epilogueTimes[1])}</span>
                </h1>
            </div>
            <div className="mx-auto w-4/5 bg-zinc-900 my-5 p-8 rounded-md drop-shadow-sm">
                {!contracts ? (
                    <div className="text-center">
                        <h1 className="text-white font-bold mb-6">Please connect with a wallet to be able to access the app.</h1>
                        <Wallet />
                    </div>
                ) : (
                    props.children
                )}
            </div>
        </>
    );
}

export default Base;
