import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Custom404: NextPage = () => {
    const DEFAULT_ROUTE = "/lens";

    const router = useRouter();

    useEffect(() => {
        router.push(DEFAULT_ROUTE);
    }, [router]);

    return <></>;
};

export default Custom404;
