import {ethers} from "ethers";
import {Web3ReactProvider} from "@web3-react/core";

import {ChainDataProvider} from "../../../providers/useChainData";
import {ContractsProvider} from "../../../providers/useContracts";
import {ErrorProvider} from "../../../providers/useError";
import {NavStateProvider} from "../../../providers/useNavState";
import {ProtocolDataProvider} from "../../../providers/useProtocolData";
import {ProtocolMaxProvider} from "../../../providers/useProtocolMax";
import {ProtocolMethodsProvider} from "../../../providers/useProtocolMethods";
import {WalletSelectorProvider} from "../../../providers/useWalletSelector";

export default function ContextWrapper({children}: {children: any}) {
    return (
        <>
            <Web3ReactProvider
                getLibrary={(provider) => {
                    return new ethers.providers.Web3Provider(provider, "any");
                }}
            >
                <ErrorProvider>
                    <WalletSelectorProvider>
                        <ChainDataProvider>
                            <ContractsProvider>
                                <ProtocolDataProvider>
                                    <ProtocolMethodsProvider>
                                        <ProtocolMaxProvider>
                                            <NavStateProvider>{children}</NavStateProvider>
                                        </ProtocolMaxProvider>
                                    </ProtocolMethodsProvider>
                                </ProtocolDataProvider>
                            </ContractsProvider>
                        </ChainDataProvider>
                    </WalletSelectorProvider>
                </ErrorProvider>
            </Web3ReactProvider>
        </>
    );
}
