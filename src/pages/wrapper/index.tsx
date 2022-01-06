export default function Wrapper({ children }: { children: any }) {
  return (
    <div className="xl:ml-80 ml-0">
      <div className="w-5/6 mx-auto">{children}</div>
    </div>
  );
}
