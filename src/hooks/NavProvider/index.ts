import { createContext, useContext, useState } from "react";

export const navProviderContext = createContext<{ opened: boolean; setOpened: (opened: boolean) => void }>(undefined as any);

export function useOpened() {
    const [opened, setOpened] = useState<boolean>(false);

    return { opened, setOpened };
}

export function useNavProvider() {
    return useContext(navProviderContext);
}
