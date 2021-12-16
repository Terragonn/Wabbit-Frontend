import Wallet from "../wallet";
import useContracts from "../../utils/useContracts";
import Period from "../period";
import Error from "../error";

function Base(props: { children: any }) {
    const [contracts] = useContracts();

    return (
        <>
            <Error />
            <div className="mx-auto w-4/5 bg-zinc-900 my-10 p-8 rounded-md drop-shadow-sm text-center">
                <Period />
            </div>
            <div className="mx-auto w-4/5 bg-zinc-900 my-5 p-8 rounded-md drop-shadow-sm">
                {!contracts ? (
                    <div className="text-center">
                        <h1 className="text-white font-bold mb-6">Please connect with a wallet to be able to access the app.</h1>
                        <Wallet />
                    </div>
                ) : (
                    props.children
                )}
            </div>
        </>
    );
}

export default Base;
