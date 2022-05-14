import { useEffect, useState } from "react";

import { useRefresh } from "../../../hooks";
import { onFail, parseNumber, parseToPercentage, updateIfChanged, vaultAPY, vaultFee, vaultTVL, vaultUserTVL } from "../../../utils";

export function useVaultData(vault: string, account: string) {
    const { refresh } = useRefresh();

    const [apy, setAPY] = useState<string | undefined>(undefined);
    const [balance, setBalance] = useState<string | undefined>(undefined);
    const [tvl, setTVL] = useState<string | undefined>(undefined);
    const [fee, setFee] = useState<string | undefined>(undefined);

    useEffect(() => {
        onFail(async () => {
            const updated = parseToPercentage(await vaultAPY(vault)) + " %";
            updateIfChanged(updated, apy, setAPY);
        });
    }, [vault, refresh]);

    useEffect(() => {
        onFail(async () => {
            const updated = "$ " + parseNumber(await vaultUserTVL(vault, account));
            updateIfChanged(updated, balance, setBalance);
        });
    }, [vault, account, refresh]);

    useEffect(() => {
        onFail(async () => {
            const updated = "$ " + parseNumber(await vaultTVL(vault));
            updateIfChanged(updated, tvl, setTVL);
        });
    }, [vault, refresh]);

    useEffect(() => {
        onFail(async () => {
            const updated = parseToPercentage(await vaultFee(vault)) + " %";
            updateIfChanged(updated, fee, setFee);
        });
    }, [vault, refresh]);

    return { apy, balance, tvl, fee };
}
