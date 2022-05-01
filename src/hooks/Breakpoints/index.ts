import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function useBreakpoint() {
    const theme = useMantineTheme();

    const matchesMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
    const matchesSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    return { matchesSm, matchesMd };
}
