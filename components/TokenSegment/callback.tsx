import {ethers} from "ethers";
import {useState} from "react";
import {Approved} from "../../providers/useChainData";

export default function Callback({
    callback,
}: {
    callback: {
        cta: string;
        fn: (token: Approved, num: ethers.BigNumber) => Promise<void>;
        approve?: (token: Approved, num: ethers.BigNumber) => Promise<(() => Promise<void>) | null>;
    }[];
}) {
    const [processing, setProcessing] = useState<boolean>(false);
    async function processHandler(fn: () => Promise<any>) {
        setProcessing(true);
        await fn();
        setProcessing(false);
    }

    return (
        <>
            {callback.map((cb, index) => (
                <Button
                    loading={processing}
                    onClick={async () => {
                        if (token)
                            if (!approve[index]) {
                                await processHandler(async () => await cb.fn(token, bigNum));
                                setNum("");
                            } else {
                                if (cb.approve) {
                                    const fn = await cb.approve(token, bigNum);
                                    if (fn) {
                                        await fn();
                                        setUpdateApprove((prev) => prev + 1);
                                    }
                                }
                            }
                    }}
                >
                    {approve[index] ? "Approve" : cb.cta}
                </Button>
            ))}
        </>
    );
}
