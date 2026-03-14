import { useEffect, useRef, useState } from 'react';

interface MarginCellProps {
  value: number | null;
  onChange: (value: number) => void | Promise<void>;
}

export function MarginCell({ value, onChange }: MarginCellProps) {
  const [margin, setMargin] = useState(value?.toString() ?? '');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setMargin(value?.toString() ?? '');
  }, [value]);

  const parsedValue = margin === '' ? null : Number(margin);
  const isBelowMin = parsedValue !== null && parsedValue < 5;
  const isAboveMax = parsedValue !== null && parsedValue > 100;
  const hasError = isBelowMin || isAboveMax;
  const lastSavedValue = value?.toString() ?? '';

  const clearPendingTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const restoreLastSavedValue = () => {
    clearPendingTimeout();
    setMargin(lastSavedValue);
  };

  const commitValue = (nextValue: number) => {
    if (nextValue === value) return;
    onChange(nextValue);
  };

  useEffect(() => {
    if (parsedValue === null || hasError) {
      clearPendingTimeout();
      return;
    }

    if (parsedValue === value) {
      clearPendingTimeout();
      return;
    }

    clearPendingTimeout();

    timeoutRef.current = window.setTimeout(() => {
      commitValue(parsedValue);
    }, 500);

    return clearPendingTimeout;
  }, [parsedValue, hasError, value]);

  const handleBlur = () => {
    clearPendingTimeout();

    if (parsedValue === null || hasError) {
      restoreLastSavedValue();
      return;
    }

    commitValue(parsedValue);
  };

  return (
    <td
      className={`px-4 py-3 text-center group relative ${
        hasError ? 'bg-red-50 text-red-600 border-red-500 font-bold' : 'text-slate-600'
      }`}
    >
      <input
        type="number"
        min={5}
        max={100}
        value={margin}
        onChange={(e) => setMargin(e.target.value)}
        onBlur={handleBlur}
        className={`max-w-[4ch] text-center ${
          hasError ? 'w-[4ch] border-b-2 inline-block px-1' : ''
        }`}
      />
      %
      {hasError && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
          <div className="relative bg-slate-800 text-white text-xs py-1 px-3 rounded shadow-lg whitespace-nowrap">
            {isBelowMin && 'El número no puede ser menor a 5%'}
            {isAboveMax && 'El número no puede ser mayor a 100%'}
          </div>
        </div>
      )}
    </td>
  );
}
