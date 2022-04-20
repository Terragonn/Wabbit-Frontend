import { ErrorProvider } from "../providers/ErrorProvider";
import CSSProvider from "../providers/CSSProvider";
import ShellWrapper from "../providers/ShellWrapper";
import WalletProvider from "../providers/WalletProvider";

export default function Layout({ children }: { children: any }) {
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
