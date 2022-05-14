import { useEffect, useState } from "react";

import { useRefresh } from "../../../hooks";
import { onFail, parseNumber, parseToPercentage, vaultAPY, vaultFee, vaultTVL, vaultUserTVL } from "../../../utils";

export function useVaultData(vault: string, account: string) {
    const { refresh } = useRefresh();

    const [apy, setAPY] = useState<string | undefined>(undefined);
    const [balance, setBalance] = useState<string | undefined>(undefined);
    const [tvl, setTVL] = useState<string | undefined>(undefined);
    const [fee, setFee] = useState<string | undefined>(undefined);

    useEffect(() => {
        onFail(async () => setAPY(parseToPercentage(await vaultAPY(vault)) + " %"));
    }, [vault, refresh]);

    useEffect(() => {
        onFail(async () => setBalance("$ " + parseNumber(await vaultUserTVL(vault, account))));
    }, [vault, account, refresh]);

    useEffect(() => {
        onFail(async () => setTVL("$ " + parseNumber(await vaultTVL(vault))));
    }, [vault, refresh]);

    useEffect(() => {
        onFail(async () => setFee(parseToPercentage(await vaultFee(vault)) + " %"));
    }, [vault, refresh]);

    return { apy, balance, tvl, fee };
}
