import { refreshProviderContext, useRefreshCounter } from "../hooks";

export default function RefreshProvider({ children }: { children: any }) {
    const counter = useRefreshCounter();

    return <refreshProviderContext.Provider value={counter}>{children}</refreshProviderContext.Provider>;
}
