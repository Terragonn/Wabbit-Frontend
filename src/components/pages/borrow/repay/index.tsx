function Repay(props: {}) {
    // **** Fix this with the correct data of course

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Repay</h1>
            {/* Update these with the actual values */}
            <div className="grid grid-cols-2 gap-6 mx-5 text-base text-white mb-4">
                <h2>Margin value: 2.6K</h2>
                <h2>Min time left: 1d</h2>
            </div>
            <button className="bg-indigo-600 bg-zinc-500 hover:bg-indigo-700 p-3 rounded-md text-white font-medium">Repay</button>
        </div>
    );
}

export default Repay;
