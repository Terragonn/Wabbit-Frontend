import { Box, Button, Group, Text } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";
import { VaultInput } from "../../components";
import { Token } from "../../utils";

export default function Deposit({ token, vault }: { token: Token[]; vault: string }) {
    const { account, library } = useWeb3React();

    if (account && library)
        return (
            <Box mt="sm">
                <Text size="xl" weight={700}>
                    Deposit
                </Text>
                {account && library && <VaultInput token={token} account={account} vault={vault} library={library} />}
                <Group grow mt="lg">
                    <Button size="lg" color="grape">
                        Deposit
                    </Button>
                </Group>
            </Box>
        );

    return null;
}
