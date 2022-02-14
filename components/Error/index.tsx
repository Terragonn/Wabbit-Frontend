import useError from "../../providers/useError";

export default function Error() {
    const [error, setError] = useError();

    return (
        <div
            className={`text-center max-h-48 bg-red-700 hover:bg-red-600 p-5 font-bold overflow-auto text-white rounded-xl my-10 shadow-lg shadow-red-500 text-xl cursor-pointer ${
                !error ? "hidden" : ""
            }`}
            onClick={(e) => setError(null)}
        >
            {error}
        </div>
    );
}
