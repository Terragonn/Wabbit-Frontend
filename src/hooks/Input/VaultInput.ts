import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { getETHAmount, getTokenAmount, isApproved, loadContractVaultETHWrapper, parseAddress, Token } from "../../utils";

export function useVaultInput(
    token: Token,
    vault: string,
    library: ethers.providers.JsonRpcSigner,
    wrapper?: string,
    onChange?: (data: number) => void,
    defaultValue?: number
) {
    const [visualAmount, setVisualAmount] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    const [approved, setApproved] = useState<boolean>(true);
    const [max, setMax] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (onChange) {
            onChange(isNaN(parseFloat(amount)) ? 0 : parseFloat(amount));
        }
    }, [visualAmount]);

    useEffect(() => {
        (async () => {
            const _isApproved = await isApproved(token.address, wrapper || vault, library);
            const _required = wrapper ? token.address != parseAddress(await loadContractVaultETHWrapper(wrapper, library).WETH()) : true;

            setApproved(!_required || _isApproved);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let _max;

            if (wrapper && token.address === parseAddress(await loadContractVaultETHWrapper(wrapper, library).WETH())) _max = await getETHAmount(library);
            else _max = await getTokenAmount(token, library);

            setMax(_max);
        })();
    }, []);

    useEffect(() => {
        if (parseFloat(amount) > max) {
            setError("Amount exceeds balance");
            return;
        }

        setError(undefined);
    }, [amount, max]);

    return { amount, visualAmount, setVisualAmount, approved, setApproved, max, error };
}
