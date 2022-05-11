import { Button, Group, NumberInput } from "@mantine/core";
import { ethers } from "ethers";

import { TokenIcon } from "../../../../components";
import { useVaultInput, useVaultInputDisplay } from "./hooks";
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
    wrapper: string;
    library: ethers.providers.JsonRpcSigner;
    onChange?: (data: number) => void;
    defaultValue?: number;
}) {
    const { setAmount, approved, setApproved, max, error } = useVaultInputDisplay(token, library, wrapper);

    const { setFeedbackInput, feedbackOutput } = useVaultInput((num) => {
        setAmount(num);
        onChange && onChange(num);
    }, defaultValue);

    return (
        <NumberInput
            variant="default"
            placeholder="0.00"
            label={token.name}
            size="md"
            error={error}
            hideControls
            value={feedbackOutput}
            precision={5}
            onChange={setFeedbackInput}
            icon={<TokenIcon name={token.name} src={token.icon} width={24} />}
            rightSection={
                <Group position="apart">
                    {!approved && (
                        <ExecuteTransaction
                            action={async () => {
                                await approve(token.address, wrapper, library);
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
                    <Button size="xs" color="grape" variant="subtle" onClick={() => setFeedbackInput(max)}>
                        Max
                    </Button>
                </Group>
            }
            rightSectionWidth={!approved ? 180 : 65}
        />
    );
}
