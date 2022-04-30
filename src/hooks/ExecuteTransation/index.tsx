import { showNotification, updateNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Check, Cross } from "tabler-icons-react";

export function useExecuteTransaction() {
    const notificationId = Math.random().toString();

    const [active, setActive] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (active)
            showNotification({
                id: notificationId,
                loading: true,
                title: "Processing",
                message: "Your transaction is being processed, please wait",
                autoClose: false,
            });
    }, [active]);

    useEffect(() => {
        if (completed)
            updateNotification({
                id: notificationId,
                color: "teal",
                title: "Transaction successful",
                message: "Your transaction was executed successfully",
                icon: <Check />,
                autoClose: 2000,
            });
    }, [completed]);

    useEffect(() => {
        if (error)
            updateNotification({
                id: notificationId,
                color: "red",
                title: "Transaction error",
                message: error,
                icon: <Cross />,
                autoClose: 2000,
            });
    }, [error]);

    return { active, setActive, setCompleted, setError };
}
