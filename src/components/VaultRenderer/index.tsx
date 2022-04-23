import { Grid } from "@mantine/core";

import { TokenData } from "../../utils";
import { VaultV1 } from "..";

export default function VaultRenderer() {
    return (
        <Grid>
            <Grid.Col span={6}>
                <VaultV1
                    vault="0x7b02CBA8c6bFAc6eBAb2dfA57096A9D60d2162Ae"
                    name="Beefy FTM-USDC LP"
                    description="Torque USDC-FTM LP strategy optimized on-chain over different vaults on Beefy Finance to earn you the highest yield possible with the least effort on your behalf!"
                    token={[TokenData.FTM, TokenData.USDC]}
                    tags={["New", "Low Risk"]}
                    color={"blue"}
                />
            </Grid.Col>
        </Grid>
    );
}
