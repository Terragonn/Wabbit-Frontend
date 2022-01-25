import {SUPPORTED_CHAIN_IDS} from "../../utils/useChainData";

import {InjectedConnector} from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [...SUPPORTED_CHAIN_IDS],
});
