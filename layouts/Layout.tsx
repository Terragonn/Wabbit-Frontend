import MantineWrapper from "./wrappers/MantineWrapper";
import ShellWrapper from "./wrappers/ShellWrapper";

export default function Layout({ children }: { children: any }) {
    return (
        <MantineWrapper>
            <ShellWrapper>{children}</ShellWrapper>
        </MantineWrapper>
    );
}
