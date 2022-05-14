import { useEffect, useState } from "react";

export function useRefresh() {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        setInterval(() => {
            setCounter((cntr) => cntr + 1);
        }, 60 * 1000);
    }, []);

    return counter;
}
