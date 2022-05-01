import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";

export function useBreakpoint() {
    const theme = useMantineTheme();

    const _ltSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const [ltSm, setLtSm] = useState<boolean>(false);

    const _ltMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
    const [ltMd, setLtMd] = useState<boolean>(false);

    useEffect(() => {
        setLtSm(_ltSm);
    }, [_ltSm]);

    useEffect(() => {
        setLtMd(_ltMd);
    }, [_ltMd]);

    return { ltSm, ltMd };
}
