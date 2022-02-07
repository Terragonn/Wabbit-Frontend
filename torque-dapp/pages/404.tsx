import {useRouter} from "next/router";

export default function Custom404() {
    useRouter().push("/");

    return <></>;
}
