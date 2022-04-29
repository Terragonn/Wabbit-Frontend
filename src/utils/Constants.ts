import { BigNumber } from "ethers";

import { SupportedChainId } from ".";

export const SELECTED_CHAIN_ID: SupportedChainId = 250;

export const TO_APPROVE = BigNumber.from(2).pow(255);

export const TO_APPROVE_THRESHOLD = BigNumber.from(2).pow(200);

export const ROUND_NUMBER = 1e6;

export const API_URL = "https://api.torque.money";
