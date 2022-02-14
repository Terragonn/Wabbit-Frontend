import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Contracts} from "../../providers/useContracts";
import {Approved} from "../../providers/useChainData";
import {RequiresApproval} from "../../providers/useProtocolMethods";

import parseNumber, {MAX_INPUT_NUMBER, parseDecimals, parseStringToNumber, ROUND_CONSTANT} from "../../utils/parseNumber";
import Button from "../Button";

export default function TokenSegment({
    title,
    keys,
    cta,
    token,
    contracts,
    callback,
    hideInput,
    max,
}: {
    title: string;
    keys: [string, string][];
    cta: string;
    token: Approved | null;
    contracts: Contracts | null;
    callback?: (token: Approved, num: ethers.BigNumber) => Promise<RequiresApproval>;
    hideInput?: boolean;
    max?: [ethers.BigNumber, number];
}) {
    const [num, setNum] = useState<string>("");
    const [bigNum, setBigNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [priceNum, setPriceNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [isMax, setIsMax] = useState<boolean>(false);

    const [approve, setApprove] = useState<boolean>(false);

    const [processing, setProcessing] = useState<boolean>(false);
    async function processHandler(fn: () => Promise<any>) {
        setProcessing(true);
        await fn();
        setProcessing(false);
    }

    useEffect(() => {
        if (token) {
            let decimals: ethers.BigNumber;
            if (max && isMax) {
                decimals = max[0];
                setBigNum(decimals);
            } else {
                const padded = Math.floor(parseStringToNumber(num) * ROUND_CONSTANT);
                decimals = ethers.BigNumber.from(10).pow(token.decimals).mul(padded).div(ROUND_CONSTANT);
                setBigNum(decimals);
            }

            (async () => {
                if (callback) {
                    const requiresApproval = await callback(token, decimals);
                    setApprove(requiresApproval[1] !== null);
                }

                if (contracts && (await contracts.oracle.isSupported(token.address))) {
                    const price = await contracts.oracle.priceMin(token.address, decimals);
                    const parsed = parseDecimals(price, (await contracts.oracle.priceDecimals()).toNumber());
                    setPriceNum(parsed);
                }

                if (isMax) setIsMax(false);
            })();
        }
    }, [num]);

    return (
        <>
            <h3 className="text-neutral-500 font-bold lg:text-center text-left text-2xl mb-4">{title}</h3>
            {!hideInput ? (
                <div className="bg-neutral-900 rounded-3xl py-3 px-6 glow w-full text-center flex items-center justify-between space-x-3">
                    <p className="mx-auto text-neutral-600 font-bold text-xl whitespace-nowrap">($ {parseNumber(priceNum)})</p>
                    <input
                        className="bg-transparent border-none rounded-xl text-left text-white text-xl font-bold w-full"
                        type="number"
                        placeholder="0.00"
                        value={num}
                        min={0}
                        step={0.01}
                        onChange={(e) => {
                            const maxNum = max ? max[1] : MAX_INPUT_NUMBER;
                            const numAsNumber = parseStringToNumber(e.target.value);

                            if (numAsNumber !== 0) {
                                const newMax = Math.max(0, Math.min(numAsNumber, maxNum));
                                setNum(newMax.toString());
                            } else setNum(e.target.value);
                        }}
                    />
                    {max ? (
                        <span
                            className="mx-auto text-neutral-600 font-bold text-xl whitespace-nowrap cursor-pointer hover:text-neutral-500"
                            onClick={async () => {
                                setIsMax(true);
                                setNum(max[1].toString());
                            }}
                        >
                            max
                        </span>
                    ) : null}
                </div>
            ) : null}
            <div className="mt-16 lg:w-4/5 w-full mx-auto flex flex-col items-stretch">
                <div>
                    {keys.map(([key, value], index) => (
                        <div key={index} className="flex items-center justify-between text-neutral-400 font-medium text-lg mb-6">
                            {key.length === 0 && key.length === 0 ? null : (
                                <>
                                    <span>{key}:</span>
                                    <span className="whitespace-nowrap text-white font-bold">{value}</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                {cta.length > 0 ? (
                    <Button
                        loading={processing}
                        onClick={() => {
                            if (callback && token)
                                (async () => {
                                    const requiresApproval = await callback(token, bigNum);

                                    if (requiresApproval[1]) {
                                        await processHandler(async () => await (requiresApproval[1] as any)());
                                        setApprove((await callback(token, bigNum))[1] !== null);
                                    } else {
                                        await processHandler(async () => await (requiresApproval[0] as any)());
                                        setNum("");
                                    }
                                })();
                        }}
                    >
                        {approve ? "Approve" : cta}
                    </Button>
                ) : null}
            </div>
        </>
    );
}
