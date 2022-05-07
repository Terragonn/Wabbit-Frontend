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
                    vault="0x242E9E75Dea7Fd2Ba2e55783B79E76648178145D"
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
