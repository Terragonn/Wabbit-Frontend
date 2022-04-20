import type { NextPage } from "next";
import { useRouter } from "next/router";

const Custom404: NextPage = () => {
    useRouter().push("/");

    return null;
};

export default Custom404;
