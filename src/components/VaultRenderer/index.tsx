import { Grid, Group } from "@mantine/core";
import TokenData from "../../utils/TokenData";
import VaultV1 from "./VaultV1";

export default function VaultRenderer() {
    return (
        <Grid>
            <Grid.Col span={6}>
                <VaultV1
                    name="Beefy FTM-USDC LP"
                    description="Torque USDC-FTM LP strategy optimized on-chain over different vaults on Beefy Finance to earn you the highest yield possible with the least effort on your behalf!"
                    token={[TokenData.FTM, TokenData.USDC]}
                    tags={["New", "Low Risk"]}
                    color={"blue"}
                    apy={24.79}
                    tvl={102.3}
                    fee={0}
                />
            </Grid.Col>
        </Grid>
    );
}
