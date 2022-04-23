import { ethers } from "ethers";

import IERC20ABI from "../../abi/IERC20.json";
import TorqueVaultV1ABI from "../../abi/TorqueVaultV1.json";

export function loadERC20(token: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(token, IERC20ABI.abi, signer);
}

export function loadTorqueVaultV1(vault: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(vault, TorqueVaultV1ABI.abi, signer);
}
