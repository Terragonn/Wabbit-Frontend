import { useEffect, useState } from "react";
import { getTokenAmount, isApproved, ROUND_NUMBER, Token } from "../utils";

export function useInput(token: Token, account: string, vault: string, library: any, onChange?: (data: string) => void, defaultValue?: string) {
    const [amount, setAmount] = useState<string>(defaultValue || "");
    const [approved, setApproved] = useState<boolean>(true);
    const [max, setMax] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (onChange) onChange(amount);
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
