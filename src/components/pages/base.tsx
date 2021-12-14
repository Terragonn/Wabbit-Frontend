import { ethers } from "ethers";
import { useEffect, useState } from "react";
import parseTime from "../../utils/parseTime";
import useContracts from "../../utils/useContracts";
import Wallet from "../wallet";

function Base(props: { children: any }) {
    const [contracts] = useContracts();

    const [epilogueTimes, setEpilogueTimes] = useState<[number, number]>([Date.now(), Date.now()]);

    const [prologueActive, setPrologueActive] = useState<boolean>(false);
    const [epilogueActive, setEpilogueActive] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            // Get the prologue and epilogue times
            const pool = contracts?.pool;

            const _epilogueTimes = await pool?.getEpilogueTimes();
            const timesParsed = _epilogueTimes.map((time: ethers.BigNumber) => time.toNumber() * 1000);
            console.log(new Date(timesParsed[0]));
            console.log(new Date());
            setEpilogueTimes(timesParsed);

            const _prologueActive = await pool?.isPrologue();
            setPrologueActive(_prologueActive);
            const _epilogueActive = await pool?.isEpilogue();
            setEpilogueActive(_epilogueActive);
        })();
    }, [contracts]);

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
