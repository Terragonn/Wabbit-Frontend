import "../styles/globals.css";
import type {AppProps} from "next/app";

import HeadWrapper from "../components/Wrapper/HeadWrapper";
import PageWrapper from "../components/Wrapper/PageWrapper";
import LayoutWrapper from "../components/Wrapper/LayoutWrapper";
import ContextWrapper from "../components/Wrapper/ContextWrapper";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <HeadWrapper>
            <ContextWrapper>
                <LayoutWrapper>
                    <PageWrapper>
                        <Component {...pageProps} />
                    </PageWrapper>
                </LayoutWrapper>
            </ContextWrapper>
        </HeadWrapper>
    );
}

export default MyApp;
