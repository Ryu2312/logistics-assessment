import { InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchInput({
  placeholder = 'Buscar...',
  value,
  onChange,
  className = '',
  ...props
}: SearchInputProps) {
  return (
    <input
      className={`px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-64 ${className}`}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    />
  );
}
