import {ethers} from "ethers";
import {useEffect, useState} from "react";
import parseNumber, {parseDecimals, ROUND_CONSTANT} from "../../utils/parseNumber";
import {Approved} from "../../utils/useChainData";
import useContracts from "../../utils/useContracts";
import {RequiresApproval} from "../../utils/useProtocolMethods";
import Button from "../Button";

export default function TokenSegment({
    title,
    keys,
    cta,
    token,
    callback,
    hideInput,
    max,
}: {
    title: string;
    keys: [string, string][];
    cta: string;
    token: Approved | null;
    callback?: (token: Approved, num: ethers.BigNumber) => Promise<RequiresApproval>;
    hideInput?: boolean;
    max?: [ethers.BigNumber, number];
}) {
    const contracts = useContracts();

    // **** I am going to set the num as a string, and then I am going to reset the value to be back to "" eventually

    const [num, setNum] = useState<number>(0);
    const [bigNum, setBigNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [priceNum, setPriceNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [isMax, setIsMax] = useState<boolean>(false);

    const [approve, setApprove] = useState<boolean>(false);

    const [processing, setProcessing] = useState<boolean>(false);
    async function processHandler(fn: () => Promise<any>) {
        setProcessing(true);
        try {
            await fn();
        } catch {}
        setProcessing(false);
    }

    useEffect(() => {
        if (token) {
            let decimals: ethers.BigNumber;
            if (max && isMax) {
                decimals = max[0];
                setBigNum(decimals);
            } else {
                const padded = Math.floor(num * ROUND_CONSTANT);
                decimals = ethers.BigNumber.from(10).pow(token.decimals).mul(padded).div(ROUND_CONSTANT);
                setBigNum(decimals);
            }

            (async () => {
                if (callback) {
                    const requiresApproval = await callback(token, decimals);
                    setApprove(requiresApproval[1] !== null);
                }

                if (contracts) {
                    const price = await contracts?.oracle.priceMin(token.address, decimals);
                    const parsed = parseDecimals(price, (await contracts?.oracle.priceDecimals()).toNumber());
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
                        value={num === 0 ? "" : num}
                        min={0}
                        step={0.01}
                        onChange={(e) => {
                            setNum(e.target.valueAsNumber || 0);
                        }}
                    />
                    {max ? (
                        <span
                            className="mx-auto text-neutral-600 font-bold text-xl whitespace-nowrap cursor-pointer hover:text-neutral-500"
                            onClick={async () => {
                                setIsMax(true);
                                setNum(max[1]);
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
                                        setNum(0);
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
