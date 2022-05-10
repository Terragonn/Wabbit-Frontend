import { BigNumber, ethers } from "ethers";

import { loadERC20, TO_APPROVE, TO_APPROVE_THRESHOLD, ROUND_NUMBER, Token } from "..";

// Check if the signer has approved their tokens for use with the specified account
export async function isApproved(token: string, toApprove: string, signer: ethers.providers.JsonRpcSigner) {
    const signerAddress = await signer.getAddress();
    const tkn = loadERC20(token, signer);

    const allowance = await tkn.allowance(signerAddress, toApprove);

    return allowance.gt(TO_APPROVE_THRESHOLD);
}

// Approve the signers tokens for use with the specified account
export async function approve(token: string, toApprove: string, signer: ethers.providers.JsonRpcSigner) {
    if (await isApproved(token, toApprove, signer)) return;

    const tkn = loadERC20(token, signer);

    await (await tkn.approve(toApprove, TO_APPROVE)).wait();
}

// Get the max token amount of the signer account as a number
export async function getTokenAmount(token: Token, signer: ethers.providers.JsonRpcSigner) {
    const signerAddress = await signer.getAddress();
    const tkn = loadERC20(token.address, signer);

    const bal = await tkn.balanceOf(signerAddress);

    return bal.mul(ROUND_NUMBER).div(BigNumber.from(10).pow(token.decimals)).toNumber() / ROUND_NUMBER;
}
