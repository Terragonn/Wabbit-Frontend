import { Box, Button, Group, Modal, NumberInput, Text } from "@mantine/core";
import { useState } from "react";
import { Token } from "../../utils";

export default function VaultV1Modal({ token, name, opened, onClose }: { token: Token[]; name: string; opened: boolean; onClose: () => void }) {
    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>({});

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
                <Group grow>
                    <NumberInput
                        key={index}
                        mt="lg"
                        label={tkn.name + " (" + tkn.ticker + ")"}
                        placeholder="0.0"
                        size="md"
                        hideControls
                        // **** This should probably be controlled instead... ?
                        min={0}
                        max={9999999}
                        onChange={(num) =>
                            setTokenAmount((tknAmnt) => {
                                tknAmnt[tkn.address] = num ? num : 0;
                                return tknAmnt;
                            })
                        }
                    />
                </Group>
            ))}
            <Group grow mt="xl">
                <Button size="lg" color="grape">
                    Deposit
                </Button>
            </Group>
        </Modal>
    );
}
