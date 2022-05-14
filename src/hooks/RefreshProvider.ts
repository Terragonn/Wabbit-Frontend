import { createContext, useContext, useEffect, useState } from "react";

export const refreshProviderContext = createContext<{ refresh: number; updateRefresh: () => void }>(undefined as any);

export function useRefreshCounter() {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        setInterval(() => updateCounter(), 60 * 1000);
    }, []);

    function updateCounter() {
        setCounter((cntr) => cntr + 1);
    }

    return { refresh: counter, updateRefresh: updateCounter };
}

export function useRefresh() {
    return useContext(refreshProviderContext);
}
