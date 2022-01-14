import {ethers} from "ethers";
import {useState} from "react";
import {Approved} from "../../utils/getApproved";
import {ROUND_CONSTANT} from "../../utils/parseNumber";
import Button from "../Button";

export default function TokenSegment({
    title,
    keys,
    cta,
    token,
    callback,
}: {
    title: string;
    keys: {[key: string]: string};
    cta: string;
    token: Approved;
    callback?: (num: ethers.BigNumber, token: Approved, ...args: any[]) => any;
}) {
    const [num, setNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

    return (
        <>
            <h3 className="text-neutral-500 font-bold lg:text-center text-left text-2xl mb-4">{title}</h3>
            <div className="bg-neutral-900 rounded-3xl p-3 glow w-full text-center">
                <input
                    className="bg-transparent border-none rounded-xl text-center text-white text-xl font-bold w-full"
                    type="number"
                    value="0.00"
                    min={0}
                    step={0.01}
                    onChange={(e) => setNum(ethers.BigNumber.from(e.target.valueAsNumber * ROUND_CONSTANT))}
                />
            </div>
            <div className="mt-16 lg:w-4/5 w-full mx-auto flex flex-col items-stretch justify-evenly">
                <div>
                    {Object.entries(keys).map(([key, value], index) => (
                        <div key={index} className="flex items-center justify-between text-white font-medium text-lg mb-6">
                            <span>{key}:</span>
                            <span className="whitespace-nowrap">{value}</span>
                        </div>
                    ))}
                </div>
                <Button onClick={() => (callback ? callback(num, token) : null)}>{cta}</Button>
            </div>
        </>
    );
}
