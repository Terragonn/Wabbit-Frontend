import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Contracts} from "../../providers/useContracts";
import {Approved} from "../../providers/useChainData";

import parseNumber, {MAX_INPUT_NUMBER, parseDecimals, parseStringToNumber, ROUND_CONSTANT} from "../../utils/parseNumber";
import Button from "../Button";
import Keys from "./keys";
import Callback from "./callback";

export default function TokenSegment({
    title,
    keys,
    token,
    contracts,
    callback,
    hideInput,
    max,
}: {
    title: string;
    keys: [string, string][];
    token: Approved;
    contracts: Contracts;
    callback: {
        cta: string;
        fn: (token: Approved, num: ethers.BigNumber) => Promise<void>;
        approve?: (token: Approved, num: ethers.BigNumber) => Promise<(() => Promise<void>) | null>;
    }[];
    hideInput?: boolean;
    max?: [ethers.BigNumber, number];
}) {
    // **** Maybe these ones should be global variables, and we will simply report the correct values to them using our input function
    const [num, setNum] = useState<number>(0);
    const [bigNum, setBigNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

    const [approve, setApprove] = useState<boolean[]>(Array(callback.length).fill(false));
    const [updateApprove, setUpdateApprove] = useState<number>(0);

    // **** We will probably need to break the approve up

    useEffect(() => {
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
            if (contracts && (await contracts.oracle.isSupported(token.address))) {
                const price = await contracts.oracle.priceMin(token.address, decimals);
                const parsed = parseDecimals(price, (await contracts.oracle.priceDecimals()).toNumber());
                setPriceNum(parsed);
            }

            if (isMax) setIsMax(false);
        })();
    }, [num, token]);

    useEffect(() => {
        console.log("Update");
        console.log(bigNum);

        (async () => {
            const newApprovedState = [...approve];
            for (let i = 0; i < callback.length; i++) {
                const cb = callback[i];
                newApprovedState[i] = cb.approve && (await cb.approve(token, bigNum)) ? true : false;
            }
            setApprove(newApprovedState);
        })();
    }, [bigNum, updateApprove, token]);

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
                <Keys keys={keys} />
                <Callback />
            </div>
        </>
    );
}
