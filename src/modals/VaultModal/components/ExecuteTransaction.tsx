import { Button } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useState } from "react";
import { Check, X } from "tabler-icons-react";
import { useRefresh } from "../../../hooks";

export default function ExecuteTransaction({
    action,
    actionLabel,
    children,
    buttonProps,
}: {
    action: () => Promise<any>;
    actionLabel: string;
    children: any;
    buttonProps?: any;
}) {
    const { updateRefresh } = useRefresh();
    const notificationId = Math.random().toString();

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Button
            {...buttonProps}
            loading={loading}
            onClick={async () => {
                try {
                    setLoading(true);
                    showNotification({
                        id: notificationId,
                        loading: true,
                        title: actionLabel,
                        message: "Your transaction is being processed, please wait",
                        disallowClose: true,
                        autoClose: false,
                    });
                    await action();
                    updateNotification({
                        id: notificationId,
                        color: "teal",
                        title: "Transaction successful",
                        message: "Your transaction was executed successfully",
                        icon: <Check />,
                        autoClose: 3000,
                    });
                    setLoading(false);
                    updateRefresh();
                } catch (e: any) {
                    setLoading(false);
                    updateNotification({
                        id: notificationId,
                        color: "red",
                        title: "Transaction error",
                        message: e.data?.message || e.message,
                        icon: <X />,
                        autoClose: 3000,
                    });
                }
            }}
        >
            {children}
        </Button>
    );
}
