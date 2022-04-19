import MantineWrapper from "./wrappers/Mantine";

export default function Layout({ children }: { children: any }) {
    return <MantineWrapper>{children}</MantineWrapper>;
}
