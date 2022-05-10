import { useEffect, useState } from "react";

import { TokenData } from "../../utils";
import { Vault } from "..";
import { useBreakpoint } from "../../hooks";
import { SimpleGrid } from "@mantine/core";

export default function VaultRenderer() {
    const { ltSm } = useBreakpoint();
    const [cols, setCols] = useState<number>(2);

    useEffect(() => {
        if (ltSm) setCols(1);
        else setCols(2);
    }, [ltSm]);

    return (
        <SimpleGrid cols={cols}>
            <Vault
                vault="0x242e9e75dea7fd2ba2e55783b79e76648178145d"
                wrapper="0x5d7b57e4554cd40141b50bb165ba9ba0de290ca7"
                name="Beefy FTM-USDC LP"
                description="Aggregates your USDC and FTM tokens over Beefy Finance's SushiSwap, WigoSwap, SpiritSwap, and SpookySwap strategies to ensure you are getting the highest APY possible on your tokens!"
                token={[TokenData.FTM, TokenData.USDC]}
                aggregator={TokenData.BIFI}
                aggregated={[TokenData.BOO, TokenData.SPIRIT, TokenData.SUSHI, TokenData.WIGO]}
                tags={["New", "Blue Chip"]}
                color={"blue"}
            />
            <Vault
                name="Beefy CRV-FTM LP"
                description="Aggregates your CRV and FTM tokens over Beefy Finance's WigoSwap, SpiritSwap, and SpookySwap strategies to ensure you are getting the highest APY possible on your tokens!"
                token={[TokenData.CRV, TokenData.FTM]}
                aggregator={TokenData.BIFI}
                aggregated={[TokenData.BOO, TokenData.SPIRIT, TokenData.WIGO]}
                tags={["New", "Blue Chip"]}
                color={"green"}
            />
        </SimpleGrid>
    );
}
