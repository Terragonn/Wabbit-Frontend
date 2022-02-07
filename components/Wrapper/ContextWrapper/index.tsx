import {ethers} from "ethers";
import {Web3ReactProvider} from "@web3-react/core";

import {ChainDataProvider} from "../../../utils/providers/useChainData";
import {ContractsProvider} from "../../../utils/providers/useContracts";
import {ErrorProvider} from "../../../utils/providers/useError";
import {NavStateProvider} from "../../../utils/providers/useNavState";
import {ProtocolDataProvider} from "../../../utils/providers/useProtocolData";
import {ProtocolMaxProvider} from "../../../utils/providers/useProtocolMax";
import {ProtocolMethodsProvider} from "../../../utils/providers/useProtocolMethods";

import {WalletSelectorProvider} from "../../Wallet/WalletSelector";

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
