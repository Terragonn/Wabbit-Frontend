import { ethers } from "ethers";

import { loadERC20 } from ".";

export async function getTokenAmount(address: string, account: string, signer: ethers.providers.JsonRpcSigner) {
    const token = loadERC20(address, signer);

    return await token.balanceOf(account);
}
