import { BigNumber, ethers } from "ethers";

import { parseAddress, parseToBigNumber, getTokenDataByAddress, loadTorqueVaultV1, ROUND_NUMBER, loadERC20 } from ".";

// Deposit a given amount of tokens as numbers into a vault
export async function vaultDeposit(vault: string, amount: { [key: string]: number }, signer: ethers.providers.JsonRpcSigner) {
    const _vault = loadTorqueVaultV1(vault, signer);

    const bnAmount: { [key: string]: BigNumber } = {};

    const amountKeys = Object.keys(amount);

    for (const address of amountKeys) {
        const { decimals } = getTokenDataByAddress(address);
        bnAmount[address] = parseToBigNumber(amount[address], decimals);
    }

    const depositAmount: BigNumber[] = new Array(amountKeys.length);
    for (let i = 0; i < amountKeys.length; i++) depositAmount[i] = bnAmount[parseAddress(await _vault.tokenByIndex(i))];

    await (await _vault.deposit(depositAmount)).wait();
}

// Redeem a specified percentage of tokens from a vault
export async function vaultRedeem(vault: string, percent: number, signer: ethers.providers.JsonRpcSigner) {
    const signerAddress = await signer.getAddress();

    const _vault = loadTorqueVaultV1(vault, signer);
    const token = loadERC20(vault, signer);

    const max = await token.balanceOf(signerAddress);
    const shares = max.mul(Math.floor(ROUND_NUMBER * percent)).div(ROUND_NUMBER);

    await (await _vault.redeem(shares)).wait();
}
