import {createContext, useContext} from "react";

interface ProtocolMethods {}

const protocolMethodsCtx = createContext<ProtocolMethods | null>(undefined as any);

export default function useProtocolMethods() {
    return useContext(protocolMethodsCtx);
}

export function ProtocolMethodsProvider({children}: {children: any}) {
    return <></>;
}
