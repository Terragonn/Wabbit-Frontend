import { ethers } from "ethers";

export function loadERC20(token: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(token, IERC20ABI.abi, signer) as IERC20;
}

export function loadContractLens(address: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(address, ILensABI.abi, provider) as ILens;
}

export function loadContractStrategy(address: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(address, IStrategyABI.abi, provider) as IStrategy;
}

export function loadContractSupportsFee(address: string) {
    return new ethers.Contract(address, ISupportsFeeABI.abi) as ISupportsFee;
}

export function loadContractVault(address: string, signer: ethers.providers.JsonRpcSigner) {
    return new ethers.Contract(address, IVaultABI.abi, provider) as IVault;
}
