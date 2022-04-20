import MantineWrapper from "../providers/MantineWrapper";
import ShellWrapper from "../providers/ShellWrapper";
import WalletProvider from "../providers/WalletProvider";

export default function Layout({ children }: { children: any }) {
    return (
        <WalletProvider>
            <MantineWrapper>
                <ShellWrapper>{children}</ShellWrapper>
            </MantineWrapper>
        </WalletProvider>
    );
}
