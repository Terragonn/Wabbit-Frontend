import { Button, Group } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";

import VaultInput from "./VaultInput";
import { Token } from "../../utils";

export default function Deposit({ token, vault }: { token: Token[]; vault: string }) {
    const { account, library } = useWeb3React();

    if (account && library)
        return (
            <>
                {account && library && <VaultInput token={token} account={account} vault={vault} library={library} />}
                <Group grow mt="lg">
                    <Button variant="gradient" size="lg" gradient={{ from: "pink", to: "grape", deg: 45 }}>
                        Deposit
                    </Button>
                </Group>
            </>
        );

    return null;
}
