import { Shell } from "../../components";
import { BaseHead } from "../../head";
import { WalletProvider, CSSProvider, WalletAutoConnectProvider } from "../../providers";

export default function DefaultLayout({ children }: { children: any }) {
    return (
        <>
            <BaseHead />
            <WalletProvider>
                <WalletAutoConnectProvider>
                    <CSSProvider>
                        <Shell>{children}</Shell>
                    </CSSProvider>
                </WalletAutoConnectProvider>
            </WalletProvider>
        </>
    );
}
