import { Button } from "@mantine/core";

import { injected } from "../../connectors";

// **** This needs to be reimplemented with mobx

export default function ConnectWallet() {
    function connect() {}

    return (
        <Button color="grape" onClick={connect}>
            Connect
        </Button>
    );
}
