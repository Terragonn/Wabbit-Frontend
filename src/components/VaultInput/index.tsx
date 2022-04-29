import { Button, Group, NumberInput } from "@mantine/core";
import { useVaultInput } from "../../hooks";

import { approve, Token } from "../../utils";

export default function VaultInput({
    token,
    account,
    vault,
    library,
    onChange,
    defaultValue,
}: {
    token: Token;
    account: string;
    vault: string;
    library: any;
    onChange?: (data: number) => void;
    defaultValue?: number;
}) {
    const { amount, setAmount, approved, setApproved, max, error } = useVaultInput(token, account, vault, library, onChange, defaultValue);

    return (
        <NumberInput
            variant="default"
            placeholder="0.0"
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
                    <Button size="xs" color="grape" variant="subtle" onClick={() => setAmount(max.toString())}>
                        Max
                    </Button>
                </Group>
            }
            rightSectionWidth={!approved ? 160 : 65}
        />
    );
}
