import {ethers} from "ethers";

import {OVERRIDE} from "./providers/useProtocolMethods";
import ERC20 from "../config/ERC20.json";
import {ERC20 as ERC20Type} from "../typechain-types";

export function loadERC20(token: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(token, ERC20.abi, signer) as ERC20Type;
}

export async function approveERC20(token: string, amount: ethers.BigNumber, contractAddress: string, signer: ethers.providers.JsonRpcSigner) {
    const contract = loadERC20(token, signer);

    if (!(await isApprovedERC20(token, amount, contractAddress, signer)))
        await (await contract.approve(contractAddress, ethers.BigNumber.from(2).pow(255), OVERRIDE)).wait();
}

export async function isApprovedERC20(token: string, amount: ethers.BigNumber, contractAddress: string, signer: ethers.providers.JsonRpcSigner) {
    const contract = loadERC20(token, signer);

    const signerAddress = await contract.signer.getAddress();

    // **** Now there is a problem with this (probably because of the tokens ? - yes it is trying to call allowance on the token that does not exist - how do others deal with this ?)

    const approved = await contract.allowance(signerAddress, contractAddress);
    return approved.gte(amount);
}
