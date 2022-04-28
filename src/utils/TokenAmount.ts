import { BigNumber, ethers } from "ethers";

import { loadERC20 } from ".";
import { ROUND_NUMBER } from "./Constants";
import { Token } from "./TokenData";

export async function getTokenAmount(token: Token, account: string, signer: ethers.providers.JsonRpcSigner) {
    const tkn = loadERC20(token.address, signer);

    const bal = await tkn.balanceOf(account);

    return bal.mul(ROUND_NUMBER).div(BigNumber.from(10).pow(token.decimals)).toNumber() / ROUND_NUMBER;
}
