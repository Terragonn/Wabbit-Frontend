import {ethers} from "ethers";
import loadERC20 from "./loadERC20";

export default async function approveERC20(amount: ethers.BigNumber, address: string, signer: ethers.providers.JsonRpcSigner) {
    const contract = loadERC20(address, signer);

    const toApprove = ethers.BigNumber.from(2).pow(256);

    const signerAddress = await contract.signer.getAddress();
    const approved = await contract.allowance(signerAddress, address);
    if (ethers.BigNumber.from(approved).lt(amount)) await contract.approve(address, toApprove);
}
