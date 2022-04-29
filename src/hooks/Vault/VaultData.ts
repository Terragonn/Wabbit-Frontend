import { useEffect, useState } from "react";
import { parseNumber, parseToPercentage } from "../../utils";
import { vaultAPY, vaultFee, vaultTVL, vaultUserTVL } from "../../utils/VaultAPIData";

export function useVaultData(vault: string) {
    const [apy, setAPY] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [tvl, setTVL] = useState<string | null>(null);
    const [fee, setFee] = useState<string | null>(null);

    useEffect(() => {
        (async () => setAPY(parseToPercentage(await vaultAPY(vault))))();
    }, []);

    useEffect(() => {
        (async () => setBalance(parseNumber(await vaultUserTVL(vault))))();
    }, []);

    useEffect(() => {
        (async () => setTVL(parseNumber(await vaultTVL(vault))))();
    }, []);

    useEffect(() => {
        (async () => setFee(parseToPercentage(await vaultFee(vault))))();
    }, []);

    return { apy, balance, tvl, fee };
}
