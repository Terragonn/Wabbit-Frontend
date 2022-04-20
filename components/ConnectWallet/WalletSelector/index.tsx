import useError from "../../../providers/ErrorProvider";
import { SupportedChainId } from "../../../utils/ChainData";
import WalletCard from "../WalletCard";
import { useMetamask, useWalletConnect, useWalletLink } from "../hooks";

export default function WalletSelector({ chainId, closeModal }: { chainId: SupportedChainId; closeModal: () => void }) {
    const setError = useError();

    const connectMetamask = useMetamask();
    const connectWalletConnect = useWalletConnect(chainId);
    const connectWalletLink = useWalletLink(chainId);

    function connectWrapper(connect: () => Promise<void>) {
        return async () => {
            try {
                await connect();
                closeModal();
            } catch (e: any) {
                setError(e.message);
            }
        };
    }

    return (
        <>
            <WalletCard
                name="Metamask"
                imgURL="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                onClick={connectWrapper(async () => await connectMetamask())}
            />
            <WalletCard
                name="WalletConnect"
                imgURL="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/bftsslxvhe2yaih6nyl9"
                onClick={connectWrapper(async () => await connectWalletConnect())}
            />
            <WalletCard
                name="WalletLink"
                imgURL="https://play-lh.googleusercontent.com/wrgUujbq5kbn4Wd4tzyhQnxOXkjiGqq39N4zBvCHmxpIiKcZw_Pb065KTWWlnoejsg"
                onClick={connectWrapper(async () => await connectWalletLink())}
            />
        </>
    );
}
