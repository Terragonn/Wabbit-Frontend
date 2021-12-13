function Base(props: { children: any }) {
    // **** Have something here which renders a message if there is no wallet connected

    return (
        <>
            <div className="mx-auto w-4/5 bg-zinc-900 my-10 p-8 rounded-md drop-shadow-sm text-center">
                {/* **** Get the actual period ending times and time to and the type of current prologue / epilogue */}
                <h1 className="font-medium text-white text-lg">Current period id: 314 | Prologue: active | Epilogue: inactive </h1>
            </div>
            <div className="mx-auto w-4/5 bg-zinc-900 my-5 p-8 rounded-md drop-shadow-sm">{props.children}</div>
        </>
    );
}

export default Base;
