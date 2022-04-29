import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { getTokenAmount, isApproved, Token } from "../../utils";

export function useVaultInput(token: Token, vault: string, library: ethers.providers.JsonRpcSigner, onChange?: (data: number) => void, defaultValue?: number) {
    const [amount, setAmount] = useState<string>(defaultValue ? (defaultValue > 0 ? defaultValue?.toString() : "") : "");
    const [approved, setApproved] = useState<boolean>(true);
    const [max, setMax] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (onChange) onChange(isNaN(parseFloat(amount)) ? 0 : parseFloat(amount));
    }, [amount]);

    useEffect(() => {
        (async () => setApproved(await isApproved(token.address, vault, library)))();
    }, []);

    useEffect(() => {
        (async () => setMax(await getTokenAmount(token, library)))();
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
