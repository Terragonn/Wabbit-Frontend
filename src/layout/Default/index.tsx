import { Shell } from "../../components";
import { WalletProvider, CSSProvider, ErrorProvider } from "../../providers";

export default function DefaultLayout({ children }: { children: any }) {
    return (
        <CSSProvider>
            <ErrorProvider>
                <WalletProvider>
                    <Shell>{children}</Shell>
                </WalletProvider>
            </ErrorProvider>
        </CSSProvider>
    );
}
