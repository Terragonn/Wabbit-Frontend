import {ethers} from "ethers";
import {OVERRIDE} from "./useProtocolMethods";
import ERC20 from "../config/ERC20.json";
import {ERC20 as ERC20Type} from "../typechain-types";

// Return an ERC20 contract for the given address
export function loadERC20(token: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(token, ERC20.abi, signer) as ERC20Type;
}

export async function approveERC20(token: string, amount: ethers.BigNumber, contractAddress: string, signer: ethers.providers.JsonRpcSigner) {
    const contract = loadERC20(token, signer);

    if (!isApprovedERC20(token, amount, contractAddress, signer)) await (await contract.approve(contractAddress, ethers.BigNumber.from(2).pow(255), OVERRIDE)).wait();
}

export async function isApprovedERC20(token: string, amount: ethers.BigNumber, contractAddress: string, signer: ethers.providers.JsonRpcSigner) {
    const contract = loadERC20(token, signer);

    const signerAddress = await contract.signer.getAddress();

    const approved = await contract.allowance(signerAddress, contractAddress);
    return approved.gte(amount);
}
