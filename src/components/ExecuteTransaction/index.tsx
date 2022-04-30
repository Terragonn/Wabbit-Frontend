import { Button } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useState } from "react";
import { Check, X } from "tabler-icons-react";

export default function ExecuteTransaction({ action, children, buttonProps }: { action: () => Promise<any>; children: any; buttonProps?: any }) {
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
                        title: "Processing",
                        message: "Your transaction is being processed, please wait",
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
