import { Button, Group, NumberInput } from "@mantine/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { TokenIcon } from "../../../../components";
import { useVaultInput } from "./hooks";
import { approve, Token } from "../../../../utils";
import { ExecuteTransaction } from "..";

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
    const [viewAmount, setViewAmount] = useState<number | undefined>(undefined);

    const { amount, setAmount, approved, setApproved, max, error } = useVaultInput(token, vault, library, wrapper, onChange);

    useEffect(() => {
        setAmount(!viewAmount ? 0 : viewAmount);
    }, [viewAmount]);

    return (
        <NumberInput
            variant="default"
            placeholder="0.00"
            label={token.name}
            size="md"
            error={error}
            hideControls
            value={viewAmount}
            precision={5}
            onChange={setViewAmount}
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
                    <Button size="xs" color="grape" variant="subtle" onClick={() => setViewAmount(max)}>
                        Max
                    </Button>
                </Group>
            }
            rightSectionWidth={!approved ? 180 : 65}
        />
    );
}
