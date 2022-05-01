import { navProviderContext, useOpened } from "../hooks";

export default function NavProvider({ children }: { children: any }) {
    const opened = useOpened();

    return <navProviderContext.Provider value={opened}>{children}</navProviderContext.Provider>;
}
