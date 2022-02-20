import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";

import Button from "../Button";

export default function Callback({
    token,
    globalBigNum,
    setGlobalNum,
    callback,
}: {
    token: Approved;
    globalBigNum: ethers.BigNumber;
    setGlobalNum: (num: string) => void;
    callback: {
        cta: string;
        fn: (token: Approved, num: ethers.BigNumber) => Promise<void>;
        approve?: (token: Approved, num: ethers.BigNumber) => Promise<(() => Promise<void>) | null>;
    }[];
}) {
    const [processing, setProcessing] = useState<boolean>(false);
    const [approve, setApprove] = useState<boolean[]>(Array(callback.length).fill(false));
    const [updateApprove, setUpdateApprove] = useState<number>(0);

    async function processHandler(fn: () => Promise<any>) {
        setProcessing(true);
        await fn();
        setProcessing(false);
    }

    useEffect(() => {
        (async () => {
            const newApprovedState = [...approve];
            for (let i = 0; i < callback.length; i++) {
                const cb = callback[i];
                newApprovedState[i] = cb.approve && (await cb.approve(token, globalBigNum)) ? true : false;
            }
            setApprove(newApprovedState);
        })();
    }, [globalBigNum, updateApprove, token]);

    return (
        <div>
            {callback.map((cb, index) => (
                <Button
                    loading={processing}
                    onClick={async () => {
                        if (token)
                            if (!approve[index]) {
                                await processHandler(async () => await cb.fn(token, globalBigNum));
                                setGlobalNum("");
                            } else {
                                if (cb.approve) {
                                    const fn = await cb.approve(token, globalBigNum);
                                    if (fn) {
                                        await processHandler(async () => await fn());
                                        setUpdateApprove((prev) => prev + 1);
                                    }
                                }
                            }
                    }}
                >
                    {approve[index] ? "Approve" : cb.cta}
                </Button>
            ))}
        </div>
    );
}
