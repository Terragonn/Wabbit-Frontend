import "../styles/globals.css";
import type {AppProps} from "next/app";

import HeadWrapper from "../components/Wrapper/HeadWrapper";
import LayoutWrapper from "../components/Wrapper/LayoutWrapper";
import ContextWrapper from "../components/Wrapper/ContextWrapper";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <HeadWrapper>
            <ContextWrapper>
                <LayoutWrapper>
                    <Component {...pageProps} />
                </LayoutWrapper>
            </ContextWrapper>
        </HeadWrapper>
    );
}

export default MyApp;
