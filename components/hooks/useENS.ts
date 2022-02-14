import {ethers} from "ethers";
import {useEffect, useState} from "react";

const useENS = (address: string | null | undefined): {ensName: string | null | undefined; ensAvatar: string | null | undefined} => {
    const [ensName, setENSName] = useState<string | null | undefined>(null);
    const [ensAvatar, setENSAvatar] = useState<string | null | undefined>(null);

    useEffect(() => {
        const resolveENS = async (): Promise<void> => {
            if (address) {
                const provider = await ethers.providers.getDefaultProvider();
                const ensName = await provider.lookupAddress(address);
                const resolver = await provider.getResolver(ensName ?? "");
                const ensAvatar = await resolver?.getAvatar();
                setENSAvatar(ensAvatar?.url);
                setENSName(ensName);
            }
        };
        resolveENS();
    }, [address]);

    return {ensName, ensAvatar};
};

export default useENS;
