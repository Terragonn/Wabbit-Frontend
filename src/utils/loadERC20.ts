import { ethers } from 'ethers'
import ERC20 from '../config/ERC20.json'

// Return an ERC20 contract for the given address
export default function loadERC20(address: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(address, ERC20.abi, signer)
}
