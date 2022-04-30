import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

import { VaultModal, WalletModal } from "../modals";

export default function CSSProvider({ children }: { children: any }) {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                /** Put your mantine theme override here */
                colorScheme: "dark",
            }}
        >
            <ModalsProvider modals={{ wallet: WalletModal, vault: VaultModal }}>
                <NotificationsProvider>{children}</NotificationsProvider>
            </ModalsProvider>
        </MantineProvider>
    );
}
