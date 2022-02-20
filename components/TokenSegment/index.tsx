import {ethers} from "ethers";
import {useState} from "react";

import {Approved} from "../../providers/useChainData";

import Keys from "./keys";
import Callback from "./callback";
import Input from "./input";

export default function TokenSegment({
    title,
    keys,
    token,
    callback,
    hideInput,
    max,
}: {
    title: string;
    keys: [string, string][];
    token: Approved;
    callback: {
        cta: string;
        fn: (token: Approved, num: ethers.BigNumber) => Promise<void>;
        approve?: (token: Approved, num: ethers.BigNumber) => Promise<(() => Promise<void>) | null>;
    }[];
    hideInput?: boolean;
    max?: [ethers.BigNumber, number];
}) {
    const [num, setNum] = useState<string>("");
    const [bigNum, setBigNum] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

    return (
        <div>
            <h3 className="text-neutral-500 font-bold lg:text-center text-left text-2xl mb-4">{title}</h3>
            {!hideInput ? <Input token={token} max={max} setGlobalBigNum={setBigNum} globalNum={num} /> : null}
            <div className="mt-16 lg:w-4/5 w-full mx-auto flex flex-col items-stretch">
                <Keys keys={keys} />
                <Callback token={token} globalBigNum={bigNum} setGlobalNum={setNum} callback={callback} />
            </div>
        </div>
    );
}
