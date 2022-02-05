import {ethers} from "ethers";
import ERC20 from "../config/ERC20.json";
import {ERC20 as ERC20Type} from "../typechain-types";

// Return an ERC20 contract for the given address
export default function loadERC20(token: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(token, ERC20.abi, signer) as ERC20Type;
}
