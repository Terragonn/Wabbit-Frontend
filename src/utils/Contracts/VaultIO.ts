import { BigNumber, ethers } from "ethers";

import { parseAddress, parseToBigNumber, getTokenDataByAddress, ROUND_NUMBER, loadERC20 } from "..";
import { IVaultETHWrapper } from "../../../types";
import { loadContractVault, loadContractVaultETHWrapper } from "./Contracts";
import { getETHAmount } from "./ETHUtils";

// Deposit a given amount of tokens as numbers into a vault
export async function vaultDeposit(vault: string, amount: { [key: string]: number }, signer: ethers.providers.JsonRpcSigner, wrapper: string) {
    const signerAddress = await signer.getAddress();
    const _vault = loadContractVault(vault, signer);

    const vaultETHWrapper = loadContractVaultETHWrapper(wrapper, signer);
    const weth = parseAddress(await vaultETHWrapper.WETH());

    const tokens = Object.keys(amount);
    const bnAmount: { [key: string]: BigNumber } = {};

    for (const address of tokens) {
        const { decimals } = getTokenDataByAddress(address);
        const depositAmount = parseToBigNumber(amount[address], decimals);

        const token = loadERC20(address, signer);
        const max = address === weth ? parseToBigNumber(await getETHAmount(signer), decimals) : await token.balanceOf(signerAddress);

        bnAmount[parseAddress(address)] = max.gt(depositAmount) ? depositAmount : max;
    }

    const depositAmount: BigNumber[] = new Array(tokens.length);
    for (let i = 0; i < tokens.length; i++) {
        const token = parseAddress(await _vault.tokenByIndex(i));
        depositAmount[i] = bnAmount[token];
    }

    await (await vaultETHWrapper.deposit(vault, depositAmount, { value: bnAmount[weth] })).wait();
}

// Redeem a specified percentage of tokens from a vault
export async function vaultRedeem(vault: string, percent: number, signer: ethers.providers.JsonRpcSigner, wrapper: string) {
    percent = Math.min(1, Math.max(0, percent));

    const signerAddress = await signer.getAddress();
    const _vault = loadContractVault(vault, signer);
    const vaultETHWrapper = loadContractVaultETHWrapper(wrapper, signer);
    const token = loadERC20(vault, signer);

    const max = await token.balanceOf(signerAddress);
    const shares = max.mul(Math.floor(ROUND_NUMBER * percent)).div(ROUND_NUMBER);

    await (await vaultETHWrapper.redeem(vault, shares)).wait();
}
