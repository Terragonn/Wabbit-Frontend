import { SimpleGrid } from "@mantine/core";

import { useVaultData } from "./hooks";
import VaultData from "./VaultData";

export default function Data({ vault, account }: { vault: string; account: string }) {
    const { apy, balance, fee, tvl } = useVaultData(vault, account);

    return (
        <SimpleGrid cols={2}>
            <VaultData label="APY:" value={apy} />
            <VaultData label="Balance:" value={balance} align="right" />
            <VaultData label="TVL:" value={tvl} />
            <VaultData label="Fee:" value={fee} align="right" />
        </SimpleGrid>
    );
}
