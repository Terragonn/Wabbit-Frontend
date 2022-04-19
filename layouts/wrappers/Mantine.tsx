import { MantineProvider } from "@mantine/core";

export default function MantineWrapper({ children }: { children: any }) {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                /** Put your mantine theme override here */
                colorScheme: "dark",
            }}
        >
            {children}
        </MantineProvider>
    );
}
