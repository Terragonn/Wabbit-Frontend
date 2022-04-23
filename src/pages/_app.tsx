import { AppProps } from "next/app";

import DefaultLayout from "../layout/Default";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <DefaultLayout>
            <Component {...pageProps} />
        </DefaultLayout>
    );
}
