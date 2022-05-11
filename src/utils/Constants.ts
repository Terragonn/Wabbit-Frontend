import { BigNumber } from "ethers";

import { SupportedChainId } from ".";

const LOCAL_MODE = process.env.LOCAL_MODE && process.env.LOCAL_MODE === "local";

export const SELECTED_CHAIN_ID: SupportedChainId = LOCAL_MODE ? 1337 : 250;

export const TO_APPROVE = BigNumber.from(2).pow(255);

export const TO_APPROVE_THRESHOLD = BigNumber.from(2).pow(200);

export const ROUND_NUMBER = 1e6;

export const API_URL = LOCAL_MODE ? "http://localhost:7000" : "https://api.torque.money";
