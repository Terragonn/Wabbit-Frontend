export default function NotificationBanner() {
    const DISPLAY = false;

    return (
        <>
            {DISPLAY ? (
                <p className="text-center text-xl font-medium text-neutral-300 pt-6 pb-3">
                    Due to recent confusion, we have{" "}
                    <span className="font-bold">
                        temporarily disabled <span className="text-yellow-300">Rinkeby</span> testnet
                    </span>
                    . If you are looking to use our protocol,{" "}
                    <span className="font-bold">
                        switch over to <span className="text-sky-500">Fantom Mainnet</span>
                    </span>
                    . Please check our{" "}
                    <a className="font-bold" href="https://discord.gg/Wk33hnKtvx">
                        Discord
                    </a>{" "}
                    for more information.
                </p>
            ) : null}
        </>
    );
}
