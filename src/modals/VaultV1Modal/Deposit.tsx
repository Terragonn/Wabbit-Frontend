import { Box, Button, Group } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";

import { Token } from "../../utils";
import { useState } from "react";
import { Input } from "../../components";

export default function Deposit({ token, vault }: { token: Token[]; vault: string }) {
    const { account, library } = useWeb3React();

    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    if (account && library)
        return (
            <>
                {account && library && (
                    <Box>
                        {token.map((tkn, index) => (
                            <Box key={index} mb="md">
                                <Input token={tkn} account={account} vault={vault} library={library} />
                            </Box>
                        ))}
                    </Box>
                )}

                <Group grow mt="lg">
                    <Button variant="gradient" size="lg" gradient={{ from: "pink", to: "grape", deg: 45 }}>
                        Deposit
                    </Button>
                </Group>
            </>
        );

    return null;
}
