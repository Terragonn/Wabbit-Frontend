import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { useRefresh } from "../../../../../hooks";
import { getETHAmount, getTokenAmount, isApproved, loadContractVaultETHWrapper, parseAddress, Token } from "../../../../../utils";

export function useVaultInputDisplay(token: Token, library: ethers.providers.JsonRpcSigner, wrapper: string) {
    const { refresh } = useRefresh();

    const [amount, setAmount] = useState<number>(0);

    const [approved, setApproved] = useState<boolean>(true);
    const [max, setMax] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const _isApproved = await isApproved(token.address, wrapper, library);
            const _required = token.address != parseAddress(await loadContractVaultETHWrapper(wrapper, library).WETH());

            setApproved(!_required || _isApproved);
        })();
    }, [library]);

    useEffect(() => {
        (async () => {
            let _max;

            if (token.address === parseAddress(await loadContractVaultETHWrapper(wrapper, library).WETH())) _max = await getETHAmount(library);
            else _max = await getTokenAmount(token, library);

            setMax(_max);
        })();
    }, [library, refresh]);

    useEffect(() => {
        if (amount > max) {
            setError("Amount exceeds balance");
            return;
        }

        setError(undefined);
    }, [amount, max]);

    return { setAmount, approved, setApproved, max, error };
}
