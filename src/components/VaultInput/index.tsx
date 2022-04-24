import { Button, Group, NumberInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { approve, isApproved, Token } from "../../utils";

export default function VaultInput({ token, account, vault, library }: { token: Token; account: string; vault: string; library: any }) {
    const [amount, setAmount] = useState<string>("");
    const [approved, setApproved] = useState<boolean>(true);

    useEffect(() => {
        (async () => setApproved(await isApproved(token.address, account, vault, library.getSigner())))();
    }, []);

    return (
        <Group grow>
            <NumberInput
                mt="lg"
                label={token.name + " (" + token.ticker + ")"}
                placeholder="0.0"
                size="md"
                hideControls
                value={parseFloat(amount) == NaN ? undefined : parseFloat(amount)}
                onChange={(num) => setAmount(num ? num.toString() : "")}
            />
            {!approved && (
                <Button
                    onClick={async () => {
                        await approve(token.address, account as string, vault, library.getSigner());
                        setApproved(true);
                    }}
                    size="sm"
                    color="indigo"
                >
                    Approve
                </Button>
            )}
        </Group>
    );
}
