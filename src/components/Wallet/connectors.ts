import {InjectedConnector} from "@web3-react/injected-connector";
import {supportedChainIds} from "../../utils/useChainData";

export const injected = new InjectedConnector({
    supportedChainIds,
});
