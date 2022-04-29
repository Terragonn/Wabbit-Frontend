import Head from "next/head";
import Script from "next/script";

export default function BaseHead() {
    return (
        <>
            <Head>
                <link rel="icon" href="/images/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />

                <title>Torque Money - DeFi The Norm</title>
                <meta name="description" content="The official dapp of Torque Money. Maximize your DeFi yields with the least effort possible!" />

                <meta name="theme-color" content="#921ebb" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://app.torque.money" />
            </Head>
            <div>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-M831HRNWYT" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-M831HRNWYT');
                `}
                </Script>
            </div>
        </>
    );
}
