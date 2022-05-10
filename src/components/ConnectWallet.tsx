import { Button, Group } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";
import { useModals } from "@mantine/modals";

import { chainDataConfig, getTokenDataByAddress, SELECTED_CHAIN_ID } from "../utils";
import { useDisconnect } from "../hooks";
import { TokenIcon } from ".";

export default function ConnectWallet() {
    const { account, chainId } = useWeb3React();

    const modals = useModals();

    const disconnect = useDisconnect();

    const chainToken = getTokenDataByAddress(chainDataConfig[250].token);

    return (
        <>
            {account ? (
                chainId === SELECTED_CHAIN_ID ? (
                    <Button onClick={disconnect} variant="outline" color="indigo">
                        <Group position="apart">
                            <TokenIcon name={chainToken.name} src={chainToken.icon} width={20} />
                            {account.slice(0, 6)}...{account.slice(account.length - 2, account.length)}
                        </Group>
                    </Button>
                ) : (
                    <Button variant="outline" color="red">
                        Wrong Network!
                    </Button>
                )
            ) : (
                <Button
                    onClick={() => modals.openContextModal("wallet", { title: "Choose A Wallet", innerProps: {} })}
                    variant="gradient"
                    gradient={{ from: "indigo", to: "grape", deg: 45 }}
                >
                    Connect
                </Button>
            )}
        </>
    );
}
