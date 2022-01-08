import { createContext, useContext, useState } from "react";

const errorCtx = createContext<[string | null, (error: string | null) => void]>(
  undefined as any
);

export default function useError() {
  return useContext(errorCtx);
}

export function ErrorProvider(props: { children: any }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <errorCtx.Provider value={[error, setError]}>
      {props.children}
    </errorCtx.Provider>
  );
}
