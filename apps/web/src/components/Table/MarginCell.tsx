import { useEffect, useState } from 'react';

interface MarginCellProps {
  value: number | null;
  onChange: (value: number) => void;
}

export function MarginCell({ value, onChange }: MarginCellProps) {
  const [margin, setMargin] = useState(value?.toString() ?? '');

  useEffect(() => {
    setMargin(value?.toString() ?? '');
  }, [value]);

  const numericValue = margin === '' ? null : Number(margin);
  const hasError = numericValue !== null && numericValue < 5;

  const handleBlur = () => {
    if (numericValue === null) return;
    onChange(numericValue);
  };

  return (
    <td
      className={`px-4 py-3 text-center group relative ${
        hasError ? 'bg-red-50 text-red-600 border-red-500 font-bold' : 'text-slate-600'
      }`}
    >
      <input
        type="number"
        value={margin}
        onChange={(e) => setMargin(e.target.value)}
        onBlur={handleBlur}
        className={`max-w-[3ch] text-center ${
          hasError ? 'w-[3ch] border-b-2 inline-block px-1' : ''
        }`}
      />
      %
      {hasError && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
          <div className="relative bg-slate-800 text-white text-xs py-1 px-3 rounded shadow-lg whitespace-nowrap">
            El número no puede ser menor a 5%
          </div>
        </div>
      )}
    </td>
  );
}
