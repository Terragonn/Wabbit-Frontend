import useError from "../../utils/useError";

function Error() {
    const [error, setError] = useError();

    return (
        <>
            {error ? ( // **** FIX THIS TO BE THE OPPOSITE
                <div
                    className="mx-auto w-4/5 bg-red-400 text-rose-700 border-2 border-rose-700 my-10 p-3 rounded-md drop-shadow-sm text-center cursor-pointer"
                    onClick={() => setError(null)}
                >
                    <h1 className="font-medium">{error}</h1>
                </div>
            ) : null}
        </>
    );
}

export default Error;
