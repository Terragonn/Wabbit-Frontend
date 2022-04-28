import { useEffect, useState } from "react";
import { getTokenAmount, isApproved, Token } from "../utils";

export function useInput(token: Token, account: string, vault: string, library: any, onChange?: (data: string) => void, defaultValue?: string, onApprove?: () => void) {
    const [amount, setAmount] = useState<string>(defaultValue || "");
    const [approved, setApproved] = useState<boolean>(true);
    const [max, setMax] = useState<number>(0);

    useEffect(() => {
        if (onChange) onChange(amount);
    }, [amount]);

    useEffect(() => {
        if (onApprove) onApprove();
    }, [approved]);

    useEffect(() => {
        (async () => setApproved(await isApproved(token.address, account, vault, library.getSigner())))();
    }, []);

    useEffect(() => {
        (async () => setMax(await getTokenAmount(token, library.getSigner())))();
    }, []);

    return { amount, setAmount, approved, setApproved, max };
}
