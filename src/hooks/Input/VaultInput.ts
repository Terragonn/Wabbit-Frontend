import { useEffect, useState } from "react";

import { getTokenAmount, isApproved, Token } from "../../utils";

export function useVaultInput(token: Token, account: string, vault: string, library: any, onChange?: (data: number) => void, defaultValue?: number) {
    const [amount, setAmount] = useState<string>(defaultValue ? (defaultValue > 0 ? defaultValue?.toString() : "") : "");
    const [approved, setApproved] = useState<boolean>(true);
    const [max, setMax] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (onChange) onChange(isNaN(parseFloat(amount)) ? 0 : parseFloat(amount));
    }, [amount]);

    useEffect(() => {
        (async () => setApproved(await isApproved(token.address, account, vault, library.getSigner())))();
    }, []);

    useEffect(() => {
        (async () => setMax(await getTokenAmount(token, library.getSigner())))();
    }, []);

    useEffect(() => {
        if (parseFloat(amount) > max) {
            setError("Amount exceeds balance");
            return;
        }

        setError(undefined);
    }, [amount, max]);

    return { amount, setAmount, approved, setApproved, max, error };
}
