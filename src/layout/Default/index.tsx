import { ErrorProvider } from "../../providers/ErrorProvider";
import CSSProvider from "../../providers/CSSProvider";
import ShellWrapper from "../../components/ShellWrapper";
import WalletProvider from "../../providers/WalletProvider";

export default function DefaultLayout({ children }: { children: any }) {
    return (
        <WalletProvider>
            <CSSProvider>
                <ErrorProvider>
                    <ShellWrapper>{children}</ShellWrapper>
                </ErrorProvider>
            </CSSProvider>
        </WalletProvider>
    );
}
