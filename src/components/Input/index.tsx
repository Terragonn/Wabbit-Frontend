import { Button, Group, NumberInput } from "@mantine/core";
import { useEffect, useState } from "react";

import { approve, getTokenAmount, isApproved, Token } from "../../utils";

export default function VaultInputSingle({
    token,
    account,
    vault,
    library,
    onChange,
    onApprove,
}: {
    token: Token;
    account: string;
    vault: string;
    library: any;
    onChange?: (data: string) => void;
    onApprove?: () => void;
}) {
    const [amount, setAmount] = useState<string>("");
    const [approved, setApproved] = useState<boolean>(true);
    const [max, setMax] = useState<number>(0);

    useEffect(() => {
        if (onChange) onChange(amount);
    }, [amount]);

    useEffect(() => {
        if (onApprove) onApprove();
    }, [approved]);

    useEffect(() => {
        (async () => setApproved(await isApproved(token.address, account, vault, library.getSigner())))();
    }, []);

    useEffect(() => {
        (async () => {
            const tknMax = await getTokenAmount(token, library.getSigner());
            setMax(tknMax);
        })();
    }, []);

    // **** Just make it value controlled instead tbh

    // **** Also need another way to be able to get the max

    return (
        <NumberInput
            variant="default"
            placeholder="0.0"
            label={token.name}
            icon={token.icon(25)}
            size="md"
            hideControls
            value={isNaN(parseFloat(amount)) ? undefined : parseFloat(amount)}
            onChange={(num) => setAmount(num ? num.toString() : "")}
            rightSection={
                <Group position="apart">
                    {!approved && (
                        <Button
                            onClick={async () => {
                                await approve(token.address, account as string, vault, library.getSigner());
                                setApproved(true);
                            }}
                            size="xs"
                            color="indigo"
                            variant="subtle"
                        >
                            Approve
                        </Button>
                    )}
                    <Button size="xs" color="grape" variant="subtle">
                        Max
                    </Button>
                </Group>
            }
            rightSectionWidth={!approved ? 160 : 65}
        />
    );
}
