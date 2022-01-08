import {ethers} from "ethers";

export default async function approveERC20(contract: ethers.Contract, address: string) {
    // Require that a minimum amount approved is allocated
    const MIN_APPROVED = "9".repeat(30);
    const TO_APPROVE = "9".repeat(40);

    // Get the approved value
    const signerAddress = await contract.signer.getAddress();
    const approved = await contract.allowance(signerAddress, address);
    if (ethers.BigNumber.from(approved).lte(ethers.BigNumber.from(MIN_APPROVED))) {
        await contract.approve(address, TO_APPROVE);
    }
}
