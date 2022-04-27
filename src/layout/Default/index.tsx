import { Shell } from "../../components";
import { WalletProvider, CSSProvider, WalletAutoConnectProvider } from "../../providers";

export default function DefaultLayout({ children }: { children: any }) {
    return (
        <WalletProvider>
            <WalletAutoConnectProvider>
                <CSSProvider>
                    <Shell>{children}</Shell>
                </CSSProvider>
            </WalletAutoConnectProvider>
        </WalletProvider>
    );
}
