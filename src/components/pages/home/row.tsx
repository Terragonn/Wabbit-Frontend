export interface AssetData {
    name: string;
    symbol: string;
    icon: string;
    address: string;
}

function Row(props: { data: AssetData; last: boolean }) {
    return (
        <tr className={`text-white font-normal text-lg ${!props.last ? "border-b-2" : ""} border-zinc-800 text-center`}>
            <td className="flex items-center px-4 py-3 my-5 mx-4 justify-start">
                <img className="rounded-md mx-1" src={props.data.icon} alt={props.data.symbol} width="32" />
                <span className="mx-1">{props.data.name}</span>
                <span className="mx-1 text-zinc-500">{props.data.symbol}</span>
            </td>

            {/* The following will need to be calculated and are currently just placeholders - also use the nice "billion" formats */}
            <td className="px-4 py-3 my-5">2.4B</td>
            <td className="px-4 py-3 my-5">1.6B</td>
            <td className="px-4 py-3 my-5">4.0B</td>
            <td className="px-4 py-3 my-5">28.34%</td>
        </tr>
    );
}

export default Row;
