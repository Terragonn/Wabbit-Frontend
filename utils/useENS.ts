import {useEffect, useState} from "react";
import {ethers} from "ethers";

export default function useENS(signer: ethers.providers.JsonRpcSigner | undefined) {
    const [account, setAccount] = useState<string | null>(null);
    const [ensName, setENSName] = useState<string | null | undefined>(null);
    const [ensAvatar, setENSAvatar] = useState<string | null | undefined>(null);

    useEffect(() => {
        (async () => {
            if (signer) {
                const provider = signer.provider;
                const address = await signer.getAddress();

                const ensName = await provider.lookupAddress(address);
                const resolver = await provider.getResolver(ensName || "");
                const ensAvatar = await resolver?.getAvatar();

                setAccount(address);
                setENSAvatar(ensAvatar?.url);
                setENSName(ensName);
            }
        })();
    }, []);

    return {account, ensName, ensAvatar};
}
