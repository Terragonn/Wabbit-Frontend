import { Grid } from "@mantine/core";
import { useEffect, useState } from "react";

import { TokenData } from "../../utils";
import { Vault } from "..";
import { useBreakpoint } from "../../hooks";

export default function VaultRenderer() {
    const { ltSm } = useBreakpoint();
    const [span, setSpan] = useState<number>(6);

    useEffect(() => {
        if (ltSm) setSpan(12);
        else setSpan(6);
    }, [ltSm]);

    return (
        <Grid>
            <Grid.Col span={span}>
                <Vault
                    vault="0x242e9e75dea7fd2ba2e55783b79e76648178145d"
                    wrapper="0x5d7b57e4554cd40141b50bb165ba9ba0de290ca7"
                    name="Beefy FTM-USDC LP"
                    description="Torque USDC-FTM LP strategy optimized on-chain over different vaults on Beefy Finance to earn you the highest yield possible with the least effort on your behalf!"
                    token={[TokenData.FTM, TokenData.USDC]}
                    tags={["New", "Blue Chip"]}
                    color={"blue"}
                />
            </Grid.Col>
        </Grid>
    );
}
