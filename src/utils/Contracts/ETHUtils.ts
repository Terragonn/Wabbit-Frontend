import { BigNumber, ethers } from "ethers";

import { ROUND_NUMBER } from "..";

// Get the max ETH amount of the signer account as a number
export async function getETHAmount(signer: ethers.providers.JsonRpcSigner) {
    const bal = await signer.getBalance();

    return bal.mul(ROUND_NUMBER).div(BigNumber.from(10).pow(18)).toNumber() / ROUND_NUMBER;
}
