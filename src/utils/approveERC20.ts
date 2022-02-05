import {ethers} from "ethers";
import loadERC20 from "./loadERC20";
import {OVERRIDE} from "./useProtocolMethods";

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
