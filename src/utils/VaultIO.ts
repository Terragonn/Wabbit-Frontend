import { BigNumber, ethers } from "ethers";
import { loadTorqueVaultV1 } from "./Contracts";

import { parseToBigNumber } from "./Parse";
import { getTokenDataByAddress } from "./TokenData";

// **** Make sure that we deal with the approvals as well (otherwise there could be problems)

export async function vaultDeposit(vault: string, amount: { [key: string]: number }, signer: ethers.providers.JsonRpcSigner) {
    console.log(signer);

    const _vault = loadTorqueVaultV1(vault, signer);

    const bnAmount: { [key: string]: BigNumber } = {};

    const amountKeys = Object.keys(amount);

    for (const address of amountKeys) {
        const { decimals } = getTokenDataByAddress(address);
        bnAmount[address] = parseToBigNumber(amount[address], decimals);
    }

    const depositAmount: BigNumber[] = new Array(amountKeys.length);
    for (let i = 0; i < amountKeys.length; i++) depositAmount[i] = bnAmount[await _vault.tokenByIndex(i)];

    await (await _vault.deposit(depositAmount)).wait();
}

export async function vaultWithdraw(token: string, shares: number) {}
