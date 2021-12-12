function Base(props: { children: any }) {
    // **** Have something here which renders a message if there is no wallet connected
    return <div className="mx-auto w-4/5 bg-zinc-900 my-20 p-8 rounded-md drop-shadow-sm">{props.children}</div>;
}

export default Base;
