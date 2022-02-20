import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import useProtocolData from "../../providers/useProtocolData";

import parseError from "../../utils/parseError";

import {MAX_INPUT_NUMBER, parseNumber, parseNumberAsBigNumber, parseStringToNumber} from "../../utils/parseNumber";

export default function Input({
    token,
    max,
    setGlobalBigNum,
    globalNum,
}: {
    token: Approved;
    max?: [ethers.BigNumber, number];
    setGlobalBigNum: (num: ethers.BigNumber) => void;
    globalNum: string;
}) {
    const protocolData = useProtocolData();

    const [num, setNum] = useState<string>("");
    const [bigNum, setBigNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [isMax, setIsMax] = useState<boolean>(false);
    const [priceNum, setPriceNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

    useEffect(() => {
        let newBigNum: ethers.BigNumber;

        if (max && isMax) {
            newBigNum = max[0];
            setIsMax(false);
        } else newBigNum = parseNumberAsBigNumber(parseStringToNumber(num), token.decimals);

        setBigNum(newBigNum);
    }, [num, token]);

    useEffect(() => {
        if (protocolData)
            (async () => {
                const priceMin = (await parseError(async () => await protocolData.priceMin(token, bigNum))) || ethers.BigNumber.from(0);
                setPriceNum(priceMin);
            })();
    }, [token, bigNum, protocolData]);

    useEffect(() => setGlobalBigNum(bigNum), [bigNum]);
    useEffect(() => setNum(globalNum), [globalNum]);

    return (
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
    );
}
