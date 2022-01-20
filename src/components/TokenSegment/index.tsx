import {ethers} from "ethers";
import {useEffect, useState} from "react";
import parseNumber, {parseDecimals, ROUND_CONSTANT} from "../../utils/parseNumber";
import {Approved} from "../../utils/useChainData";
import useContracts from "../../utils/useContracts";
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
    const contracts = useContracts();

    const [num, setNum] = useState<number>(0);
    const [bigNum, setBigNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [priceNum, setPriceNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

    useEffect(() => {
        const padded = Math.floor(num * ROUND_CONSTANT);
        const decimals = ethers.BigNumber.from(10).pow(token.decimals).mul(padded).div(ROUND_CONSTANT);
        setBigNum(decimals);

        (async () => {
            if (contracts) {
                const price = await contracts?.oracle.priceMin(token.address, decimals);
                const parsed = parseDecimals(price, await contracts?.oracle.priceDecimals());
                setPriceNum(parsed);
            }
        })();
    }, [num]);

    return (
        <>
            <h3 className="text-neutral-500 font-bold lg:text-center text-left text-2xl mb-4">{title}</h3>
            <div className="bg-neutral-900 rounded-3xl py-3 px-6 glow w-full text-center flex items-center justify-between space-x-2">
                <input
                    className="bg-transparent border-none rounded-xl text-center text-white text-xl font-bold w-full"
                    type="number"
                    placeholder="0.00"
                    min={0}
                    step={0.01}
                    onChange={(e) => {
                        setNum(e.target.valueAsNumber || 0);
                    }}
                />
                <p className="mx-auto w-1/8 text-neutral-600 font-bold text-xl whitespace-nowrap">($ {parseNumber(priceNum)})</p>
            </div>
            <div className="mt-16 lg:w-4/5 w-full mx-auto flex flex-col items-stretch justify-evenly">
                <div>
                    {Object.entries(keys).map(([key, value], index) => (
                        <div key={index} className="flex items-center justify-between text-neutral-400 font-medium text-lg mb-6">
                            <span>{key}:</span>
                            <span className="whitespace-nowrap text-white font-bold">{value}</span>
                        </div>
                    ))}
                </div>
                <Button onClick={() => (callback ? callback(bigNum, token) : null)}>{cta}</Button>
            </div>
        </>
    );
}
