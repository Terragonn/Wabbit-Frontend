import { Box, Button, Group, Modal, NumberInput, Text } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { approve, Token, vaultDeposit } from "../../utils";

export default function VaultV1Modal({ token, name, vault, opened, onClose }: { token: Token[]; name: string; vault: string; opened: boolean; onClose: () => void }) {
    const { account, library } = useWeb3React();

    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    return (
        <Modal opened={opened} onClose={onClose}>
            <Box
                pb="sm"
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                })}
            >
                <Text size="md">
                    <Text weight={700} component="span">
                        {name}
                    </Text>{" "}
                    Vault
                </Text>
            </Box>
            {token.map((tkn, index) => (
                <Group grow key={index}>
                    <NumberInput
                        key={index}
                        mt="lg"
                        label={tkn.name + " (" + tkn.ticker + ")"}
                        placeholder="0.0"
                        size="md"
                        hideControls
                        min={0}
                        max={9999999}
                        onChange={(num) =>
                            setTokenAmount((tknAmnt) => {
                                tknAmnt[tkn.address] = num ? num : 0;
                                return tknAmnt;
                            })
                        }
                    />
                    {/* **** Remove this if already approved */}
                    {/* **** Add error wrappers for all of these */}
                    {/* <Button onClick={async () => await approve(tkn.address, account as string, vault, library.getSigner())} size="sm" color="indigo"> */}
                    <Button onClick={() => console.log(tokenAmount)} size="sm" color="indigo">
                        Approve
                    </Button>
                </Group>
            ))}
            <Group grow mt="xl">
                {/* **** Fix whatever problem is wrong with this ? */}
                <Button size="lg" color="grape" onClick={async () => await vaultDeposit(vault, tokenAmount, library.getSigner())}>
                    Deposit
                </Button>
            </Group>
        </Modal>
    );
}
