import { Button, Group, NumberInput } from "@mantine/core";
import { ethers } from "ethers";

import { useVaultInput } from "../../hooks";
import { approve, Token } from "../../utils";
import { ExecuteTransaction } from "..";
import TokenIcon from "../TokenIcon";

export default function VaultInput({
    token,
    vault,
    wrapper,
    library,
    onChange,
    defaultValue,
}: {
    token: Token;
    vault: string;
    wrapper?: string;
    library: ethers.providers.JsonRpcSigner;
    onChange?: (data: number) => void;
    defaultValue?: number;
}) {
    const { amount, setAmount, approved, setApproved, max, error } = useVaultInput(token, vault, library, wrapper, onChange, defaultValue);

    // **** Really I need a seperate way of handling this data in terms of inputs and such - we will receive string data, update a seperate numerical state, and then parse the number

    return (
        <NumberInput
            variant="default"
            placeholder="0.00"
            label={token.name}
            size="md"
            error={error}
            hideControls
            value={amount === "" ? undefined : parseFloat(amount)}
            onChange={(num) => setAmount(num ? num.toString() : "")}
            icon={<TokenIcon name={token.name} src={token.icon} width={24} />}
            rightSection={
                <Group position="apart">
                    {!approved && (
                        <ExecuteTransaction
                            action={async () => {
                                await approve(token.address, wrapper || vault, library);
                                setApproved(true);
                            }}
                            actionLabel="Approving token"
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
