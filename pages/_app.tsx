import { AppProps } from "next/app";

import Layout from "../layouts/Layout";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
