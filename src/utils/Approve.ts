import { ethers } from "ethers";
import { loadERC20 } from ".";
import { TO_APPROVE_THRESHOLD } from "./Constants";

export async function isApproved(token: string, account: string, toApprove: string, signer: ethers.providers.JsonRpcSigner) {
    const tkn = loadERC20(token, signer);

    const allowance = await tkn.allowance(account, toApprove);

    return allowance.gt(TO_APPROVE_THRESHOLD);
}

export function approve(token: string, account: string, signer: ethers.providers.JsonRpcSigner) {
    // **** We need to approve it to be above the given threshold
}
