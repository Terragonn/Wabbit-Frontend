export default function Wrapper({ children }: { children: any }) {
    return (
        <div className="ml-80">
            <div className="w-5/6 mx-auto">{children}</div>
        </div>
    );
}
