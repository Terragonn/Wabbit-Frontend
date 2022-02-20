import Head from "next/head";
import Script from "next/script";

export default function HeadWrapper({children}: {children: any}) {
    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-1GYTWEZJJG" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag() {
                            dataLayer.push(arguments);
                        }
                        gtag("js", new Date());

                        gtag("config", "G-1GYTWEZJJG");
                    `}
            </Script>
            <Head>
                <link rel="icon" href="/images/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />

                <title>Torque DApp - Extreme DeFi Leveraging</title>
                <meta
                    name="description"
                    content="The official dapp of the Torque DeFi leveraging protocol. Borrow extreme amounts of crypto against your collateral, or provide liquidity for high APY's and yield farming bonuses."
                />

                <meta name="theme-color" content="#921ebb" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://app.torque.money" />
            </Head>
            {children}
        </>
    );
}
