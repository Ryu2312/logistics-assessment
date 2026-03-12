interface MarginCellProps {
  value: number;
}

export function MarginCell({ value }: MarginCellProps) {
  const hasError = value < 5;

  if (hasError) {
    return (
      <td className="px-4 py-2 text-center group relative bg-red-50">
        <div className="border-b-2 border-red-500 inline-block px-1 font-bold text-red-600">
          {value} %
        </div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
          <div className="relative bg-slate-800 text-white text-[11px] py-1 px-3 rounded shadow-lg whitespace-nowrap">
            El número no puede ser menor a 5%
          </div>
        </div>
      </td>
    );
  }

  return <td className="px-4 py-3 text-center text-slate-600">{value} %</td>;
}
