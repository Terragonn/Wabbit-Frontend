import { ethers } from "ethers";

import { IERC20ABI, TorqueVaultV1ABI } from "../../abi";
import { IERC20, TorqueVaultV1 } from "../../types";

export function loadERC20(token: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(token, IERC20ABI.abi, signer) as IERC20;
}

export function loadTorqueVaultV1(vault: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(vault, TorqueVaultV1ABI.abi, signer) as TorqueVaultV1;
}
