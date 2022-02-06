import {createContext, useContext, useState} from "react";

const navStateCtx = createContext<[boolean, (navState: boolean) => void]>(undefined as any);

export default function useNavState() {
    return useContext(navStateCtx);
}

export function NavStateProvider({children}: {children: any}) {
    const navState = useState<boolean>(false);

    return <navStateCtx.Provider value={navState}>{children}</navStateCtx.Provider>;
}
