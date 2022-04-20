import { ErrorProvider } from "../providers/ErrorProvider";
import MantineWrapper from "../providers/MantineWrapper";
import ShellWrapper from "../providers/ShellWrapper";
import WalletProvider from "../providers/WalletProvider";

export default function Layout({ children }: { children: any }) {
    return (
        <WalletProvider>
            <MantineWrapper>
                <ErrorProvider>
                    <ShellWrapper>{children}</ShellWrapper>
                </ErrorProvider>
            </MantineWrapper>
        </WalletProvider>
    );
}
