import { Button, Group, NumberInput } from "@mantine/core";
import { ethers } from "ethers";

import { useVaultInput } from "../../hooks";
import { approve, Token } from "../../utils";
import ExecuteTransaction from "../ExecuteTransaction";

export default function VaultInput({
    token,
    vault,
    library,
    onChange,
    defaultValue,
}: {
    token: Token;
    vault: string;
    library: ethers.providers.JsonRpcSigner;
    onChange?: (data: number) => void;
    defaultValue?: number;
}) {
    const { amount, setAmount, approved, setApproved, max, error } = useVaultInput(token, vault, library, onChange, defaultValue);

    return (
        <NumberInput
            variant="default"
            placeholder="0.00"
            label={token.name}
            size="md"
            error={error}
            hideControls
            value={isNaN(parseFloat(amount)) ? undefined : parseFloat(amount)}
            onChange={(num) => setAmount(num ? num.toString() : "")}
            icon={token.icon(24)}
            rightSection={
                <Group position="apart">
                    {!approved && (
                        <ExecuteTransaction
                            action={async () => {
                                await approve(token.address, vault, library);
                                setApproved(true);
                            }}
                            buttonProps={{
                                size: "xs",
                                color: "indigo",
                                variant: "subtle",
                            }}
                        >
                            Approve
                        </ExecuteTransaction>
                    )}
                    <Button size="xs" color="grape" variant="subtle" onClick={() => setAmount(max.toString())}>
                        Max
                    </Button>
                </Group>
            }
            rightSectionWidth={!approved ? 180 : 65}
        />
    );
}
