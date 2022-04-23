import { createContext, useContext, useState } from "react";
import { Dialog, Notification } from "@mantine/core";
import { X } from "tabler-icons-react";

const errorCtx = createContext<(error: string) => void>(undefined as any);

export default function useError() {
    return useContext(errorCtx);
}

export function ErrorProvider({ children }: { children: any }) {
    const [error, setError] = useState<string>("");

    return (
        <>
            <Dialog opened={error != ""} size="lg" radius="md" p={0}>
                <Notification title="Error!" icon={<X size={18} />} color="red" onClose={() => setError("")}>
                    {error}
                </Notification>
            </Dialog>

            <errorCtx.Provider value={setError}>{children}</errorCtx.Provider>
        </>
    );
}
