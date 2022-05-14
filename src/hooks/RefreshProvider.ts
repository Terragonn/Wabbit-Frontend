import { createContext, useContext, useEffect, useState } from "react";

export const refreshProviderContext = createContext<number>(undefined as any);

export function useUpdateCounter() {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        setInterval(() => {
            setCounter((cntr) => cntr + 1);
        }, 60 * 1000);
    }, []);

    return counter;
}

export function useRefresh() {
    return useContext(refreshProviderContext);
}
