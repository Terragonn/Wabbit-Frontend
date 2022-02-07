import Head from "next/head";

export default function HeadWrapper({children}: {children: any}) {
    return (
        <>
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-1GYTWEZJJG" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() {
                                dataLayer.push(arguments);
                            }
                            gtag("js", new Date());

                            gtag("config", "G-1GYTWEZJJG");
                        `,
                    }}
                />

                <meta charSet="utf-8" />
                <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#921ebb" />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://app.torque.money" />
                <meta
                    name="description"
                    content="The official dapp of the Torque DeFi leveraging protocol. Borrow extreme amounts of crypto against your collateral, or provide liquidity for high APY's and yield farming bonuses."
                />
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                <title>Torque DApp - Extreme DeFi Leveraging</title>
            </Head>
            {children}
        </>
    );
}
