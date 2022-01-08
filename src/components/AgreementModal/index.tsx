import {useEffect, useState} from "react";

export default function AgreementModal() {
    const [agreed, setAgreed] = useState<boolean>(false);
    const [ticked, setTicked] = useState<boolean>(false);

    const STORAGE_KEY = "agreed";

    useEffect(() => {
        const agreed = localStorage.getItem(STORAGE_KEY);
        if (agreed && JSON.stringify(agreed)) setAgreed(true);
    }, []);

    return (
        <div className={`${agreed ? "hidden" : ""} bg-black bg-opacity-80 fixed inset-0 flex items-center justify-center z-50 modal`}>
            <div className="mx-auto lg:w-2/5 w-4/5 min-w-min bg-neutral-900 glow rounded-xl p-6">
                <h2 className="text-white font-bold text-xl mb-2">Disclaimer Agreement</h2>
                <p className="text-neutral-400 font-medium mb-3">
                    By using this app you acknowledge the risks of cryptocurrencies, tokens, smart contracts, and leveraged trading.
                </p>
                <p className="text-neutral-400 font-medium pb-5 border-b-2 border-b-neutral-800 border-opacity-30">
                    You acknowledge that using this app is risky and that you are responsible for ALL losses incurred on the platform.
                </p>

                <div className="flex lg:items-center items-stretch lg:space-y-0 space-y-3 justify-between mt-5 lg:flex-row flex-col">
                    <label className="flex items-center justify-start cursor-pointer">
                        <input type="checkbox" className="form-checkbox rounded-md bg-transparent p-2 cursor-pointer" onChange={(e) => setTicked((prev) => !prev)} />
                        <span className="text-neutral-400 font-medium ml-3">I have read and agree to the disclaimer agreement above</span>
                    </label>
                    <button
                        className={`${
                            ticked ? "bg-fuchsia-700 hover:bg-fuchsia-600 glow" : "bg-neutral-700 cursor-default"
                        } text-white font-bold text-xl px-5 py-2.5 rounded-xl whitespace-nowrap`}
                        onClick={(e) => {
                            if (ticked) {
                                localStorage.setItem(STORAGE_KEY, JSON.stringify(true));
                                setAgreed(true);
                            }
                        }}
                    >
                        I Agree
                    </button>
                </div>
            </div>
        </div>
    );
}
