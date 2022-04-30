import { Button } from "@mantine/core";

import { useExecuteTransaction } from "../../hooks";

export default function ExecuteTransaction({ buttonProps, action, children }: { buttonProps: any; action: () => Promise<any>; children: any }) {
    const { active, setActive } = useExecuteTransaction();

    // Realistically the button will be pressed, and then the state will be set to active, and then if it fails it will display an error message and cancel the active

    return <Button {...buttonProps}>{children}</Button>;
}
