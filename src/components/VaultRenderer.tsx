import { useEffect, useState } from "react";

import { TokenData } from "../utils";
import { Vault } from ".";
import { useBreakpoint } from "../hooks";
import { SimpleGrid } from "@mantine/core";

export default function VaultRenderer() {
    const { ltSm, ltMd } = useBreakpoint();
    const [cols, setCols] = useState<number>(3);

    useEffect(() => {
        if (ltSm) setCols(1);
        else if (ltMd) setCols(2);
        else setCols(3);
    }, [ltSm, ltMd]);

    return (
        <SimpleGrid cols={cols} spacing="xl">
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
                name="Beefy CRV-FTM LP (Disabled)"
                description="Aggregates your CRV and FTM tokens over Beefy Finance's WigoSwap, SpiritSwap, and SpookySwap strategies to ensure you are getting the highest APY possible on your tokens!"
                token={[TokenData.CRV, TokenData.FTM]}
                aggregator={TokenData.BIFI}
                aggregated={[TokenData.BOO, TokenData.SPIRIT, TokenData.WIGO]}
                tags={["New", "Blue Chip"]}
                color={"green"}
            />
            <Vault
                name="Beefy ETH-FTM LP (Disabled)"
                description="Aggregates your ETH and FTM tokens over Beefy Finance's WigoSwap, SushiSwap, and SpookySwap strategies to ensure you are getting the highest APY possible on your tokens!"
                token={[TokenData.ETH, TokenData.FTM]}
                aggregator={TokenData.BIFI}
                aggregated={[TokenData.BOO, TokenData.SUSHI, TokenData.WIGO]}
                tags={["New", "Blue Chip"]}
                color={"dark"}
            />
        </SimpleGrid>
    );
}
