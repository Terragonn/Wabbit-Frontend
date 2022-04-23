import { Shell } from "../../components";
import { WalletProvider, CSSProvider, ErrorProvider, WalletAutoConnectProvider } from "../../providers";

export default function DefaultLayout({ children }: { children: any }) {
    return (
        <CSSProvider>
            <ErrorProvider>
                <WalletProvider>
                    <WalletAutoConnectProvider>
                        <Shell>{children}</Shell>
                    </WalletAutoConnectProvider>
                </WalletProvider>
            </ErrorProvider>
        </CSSProvider>
    );
}
