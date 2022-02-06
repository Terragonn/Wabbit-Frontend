import {ethers} from "ethers";

import {Web3ReactProvider} from "@web3-react/core";
import {ChainDataProvider} from "../../../utils/useChainData";
import {ContractsProvider} from "../../../utils/useContracts";
import {ErrorProvider} from "../../../utils/useError";
import {NavStateProvider} from "../../../utils/useNavState";
import {ProtocolDataProvider} from "../../../utils/useProtocolData";
import {ProtocolMaxProvider} from "../../../utils/useProtocolMax";
import {ProtocolMethodsProvider} from "../../../utils/useProtocolMethods";
import {WalletSelectorProvider} from "../../WalletSelector";

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
