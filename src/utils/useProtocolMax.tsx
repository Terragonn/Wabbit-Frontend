import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import loadERC20 from "./loadERC20";
import parseNumber, {parseDecimals, ROUND_CONSTANT} from "./parseNumber";
import {Approved} from "./useChainData";
import useContracts from "./useContracts";

interface ProtocolMaxData {
    availableToken: (token: Approved) => Promise<[ethers.BigNumber, number] | undefined>;
    availableLPToken: (token: Approved) => Promise<[ethers.BigNumber, number] | undefined>;

    availableCollateral: (token: Approved) => Promise<[ethers.BigNumber, number] | undefined>;
    availableLeverage: (token: Approved) => Promise<[ethers.BigNumber, number] | undefined>;
}

const protocolMaxCtx = createContext<ProtocolMaxData | null>(undefined as any);

export default function useProtocolMax() {
    return useContext(protocolMaxCtx);
}

export function ProtocolMaxProvider({children}: {children: any}) {
    const contracts = useContracts();

    const [protocolMax, setProtocolMax] = useState<ProtocolMaxData | null>(null);

    async function availableToken(token: Approved) {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const tokenContract = loadERC20(token.address, contracts.signer);
            const rawBalance = await tokenContract.balanceOf(signerAddress);

            const parsed = parseDecimals(rawBalance, token.decimals).toNumber() / ROUND_CONSTANT;

            return [rawBalance, parsed] as any;
        }
    }

    // **** Don't forget to go and add the provider and use it in the max otherwise obviously it wont work

    async function availableLPToken(token: Approved) {
        if (contracts) {
        }
    }

    async function availableCollateral(token: Approved) {
        if (contracts) {
        }
    }

    async function availableLeverage(token: Approved) {
        if (contracts) {
        }
    }

    useEffect(() => {
        if (!contracts) {
        } else {
            setProtocolMax({
                availableToken,
                availableLPToken,
                availableCollateral,
                availableLeverage,
            });
        }
    }, [contracts]);

    return <protocolMaxCtx.Provider value={protocolMax}>{children}</protocolMaxCtx.Provider>;
}
