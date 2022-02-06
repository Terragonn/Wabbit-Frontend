import "../styles/globals.css";
import type {AppProps} from "next/app";

import PageWrapper from "../components/Wrapper/PageWrapper";
import LayoutWrapper from "../components/Wrapper/LayoutWrapper";
import ContextWrapper from "../components/Wrapper/ContextWrapper";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ContextWrapper>
            <LayoutWrapper>
                <PageWrapper>
                    <Component {...pageProps} />
                </PageWrapper>
            </LayoutWrapper>
        </ContextWrapper>
    );
}

export default MyApp;
