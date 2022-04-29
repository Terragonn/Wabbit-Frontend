import { useEffect, useState } from "react";
import { parseNumber, parseToPercentage } from "../../utils";
import { vaultAPY, vaultFee, vaultTVL, vaultUserTVL } from "../../utils/VaultAPIData";

export function useVaultData(vault: string) {
    const [apy, setAPY] = useState<string | undefined>(undefined);
    const [balance, setBalance] = useState<string | undefined>(undefined);
    const [tvl, setTVL] = useState<string | undefined>(undefined);
    const [fee, setFee] = useState<string | undefined>(undefined);

    async function onFail(fn: () => Promise<any>) {
        try {
            await fn();
        } catch (e: any) {}
    }

    useEffect(() => {
        onFail(async () => setAPY(parseToPercentage(await vaultAPY(vault))) + " %");
    }, []);

    useEffect(() => {
        onFail(async () => setBalance(parseNumber(await vaultUserTVL(vault))));
    }, []);

    useEffect(() => {
        onFail(async () => setTVL(parseNumber(await vaultTVL(vault))));
    }, []);

    useEffect(() => {
        onFail(async () => setFee(parseToPercentage(await vaultFee(vault)) + " %"));
    }, []);

    return { apy, balance, tvl, fee };
}
