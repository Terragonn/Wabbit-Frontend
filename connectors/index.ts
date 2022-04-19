import { InjectedConnector } from "@web3-react/injected-connector";

// **** Need to add wallet connect + wallet link

export const injected = new InjectedConnector({
    supportedChainIds: [250],
});
