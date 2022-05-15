import Head from "next/head";
import Script from "next/script";

export default function BaseHead() {
    const title = "Torque Money - DeFi The Norm";
    const description = "A decentralized on-chain aggregator of yield aggregators platform powered by the Fantom blockchain.";
    const url = "https://app.torque.money";
    const bannerUrl = "https://i.imgur.com/voyXWCK.png";
    const twitterHandle = "@torque_money";

    return (
        <>
            <Head>
                {/* Main section */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#921ebb" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={url} />

                <title>{title}</title>
                <meta name="description" content={description} />

                {/* OG Section */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={bannerUrl} />
                <meta property="og:url" content={url} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:url" content={url} />
                <meta name="twitter:image" content={bannerUrl} />
                <meta name="twitter:site" content={twitterHandle} />
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
