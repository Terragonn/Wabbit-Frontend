import { ethers } from "ethers";

import { loadERC20 } from ".";
import { TO_APPROVE, TO_APPROVE_THRESHOLD } from "./Constants";

export async function isApproved(token: string, account: string, toApprove: string, signer: ethers.providers.JsonRpcSigner) {
    const tkn = loadERC20(token, signer);

    const allowance = await tkn.allowance(account, toApprove);

    return allowance.gt(TO_APPROVE_THRESHOLD);
}

export async function approve(token: string, account: string, toApprove: string, signer: ethers.providers.JsonRpcSigner) {
    if (await isApproved(token, account, toApprove, signer)) return;

    const tkn = loadERC20(token, signer);

    await (await tkn.approve(toApprove, TO_APPROVE)).wait();
}
