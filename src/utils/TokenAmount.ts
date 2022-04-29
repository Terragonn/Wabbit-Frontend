import { BigNumber, ethers } from "ethers";

import { loadERC20, ROUND_NUMBER, Token } from ".";

// Get the max token amount of the signer account as a number
export async function getTokenAmount(token: Token, signer: ethers.providers.JsonRpcSigner) {
    const signerAddress = await signer.getAddress();
    const tkn = loadERC20(token.address, signer);

    const bal = await tkn.balanceOf(signerAddress);

    return bal.mul(ROUND_NUMBER).div(BigNumber.from(10).pow(token.decimals)).toNumber() / ROUND_NUMBER;
}
