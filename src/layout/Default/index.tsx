import { Shell } from "../../components";
import { BaseHead } from "../../head";
import { WalletProvider, CSSProvider, WalletAutoConnectProvider, NavProvider, RefreshProvider } from "../../providers";

export default function DefaultLayout({ children }: { children: any }) {
    return (
        <>
            <BaseHead />
            <RefreshProvider>
                <WalletProvider>
                    <WalletAutoConnectProvider>
                        <NavProvider>
                            <CSSProvider>
                                <Shell>{children}</Shell>
                            </CSSProvider>
                        </NavProvider>
                    </WalletAutoConnectProvider>
                </WalletProvider>
            </RefreshProvider>
        </>
    );
}
