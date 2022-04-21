import VaultV1 from "./VaultV1";

export default function VaultRenderer() {
    return (
        <>
            <VaultV1
                name="Beefy FTM-USDC LP"
                description="Torque USDC-FTM LP strategy optimized over different vaults on Beefy Finance to earn the highest yield possible."
                tags={["New", "Low Risk"]}
                color={"blue"}
            />
        </>
    );
}
