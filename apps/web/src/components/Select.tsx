interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    id: string;
    name: string;
  }[];
  label?: string;
}

export function Select({ options, label, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>}
      <select
        className={`w-full border border-slate-200 rounded-md px-3 py-2 text-sm font-medium focus:ring-slate-80 focus:border-slate-800 bg-white sele ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
