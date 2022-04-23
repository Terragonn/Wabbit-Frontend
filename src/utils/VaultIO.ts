import { ethers } from "ethers";

export async function vaultDeposit(token: string, amounts: { [key: string]: number }, signer: ethers.providers.JsonRpcSigner) {
    // **** First we will need to get the decimal for each token and then we will have to find its decimals and parse it into its correct amount
    // **** After that we will have to get the correct amounts
    // **** This once again is going to require iteration over the things... - maybe make a util to do this for me ???
}
