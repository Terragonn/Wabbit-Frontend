import { Shell } from "../../components";
import { WalletProvider, CSSProvider, WalletAutoConnectProvider } from "../../providers";

export default function DefaultLayout({ children }: { children: any }) {
    return (
        <CSSProvider>
            <WalletProvider>
                <WalletAutoConnectProvider>
                    <Shell>{children}</Shell>
                </WalletAutoConnectProvider>
            </WalletProvider>
        </CSSProvider>
    );
}
