import MantineWrapper from "../wrappers/MantineWrapper";
import ShellWrapper from "../wrappers/ShellWrapper";
import WalletProvider from "../wrappers/WalletProvider";

export default function Layout({ children }: { children: any }) {
    return (
        <WalletProvider>
            <MantineWrapper>
                <ShellWrapper>{children}</ShellWrapper>
            </MantineWrapper>
        </WalletProvider>
    );
}
