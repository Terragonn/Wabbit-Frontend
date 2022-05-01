import { Shell } from "../../components";
import { BaseHead } from "../../head";
import { WalletProvider, CSSProvider, WalletAutoConnectProvider, NavProvider } from "../../providers";

export default function DefaultLayout({ children }: { children: any }) {
    return (
        <>
            <BaseHead />
            <WalletProvider>
                <WalletAutoConnectProvider>
                    <NavProvider>
                        <CSSProvider>
                            <Shell>{children}</Shell>
                        </CSSProvider>
                    </NavProvider>
                </WalletAutoConnectProvider>
            </WalletProvider>
        </>
    );
}
