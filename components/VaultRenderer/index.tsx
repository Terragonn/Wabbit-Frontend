import VaultV1 from "./VaultV1";

export default function VaultRenderer() {
    return (
        <>
            <VaultV1
                name="Beefy FTM-USDC LP"
                description="Torque USDC-FTM LP strategy optimized on-chain over different vaults on Beefy Finance to earn you the highest yield possible with the least effort on your behalf!"
                tags={["New", "Low Risk"]}
                color={"blue"}
            />
        </>
    );
}
