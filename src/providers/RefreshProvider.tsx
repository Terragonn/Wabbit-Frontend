import { refreshProviderContext, useUpdateCounter } from "../hooks";

export default function RefreshProvider({ children }: { children: any }) {
    const counter = useUpdateCounter();

    return <refreshProviderContext.Provider value={counter}>{children}</refreshProviderContext.Provider>;
}
