import { BigNumber } from "ethers";
import { SupportedChainId } from ".";

export const SELECTED_CHAIN_ID: SupportedChainId = 250;

export const TO_APPROVE = BigNumber.from(10).pow(255);

export const TO_APPROVE_THRESHOLD = BigNumber.from(10).pow(200);
