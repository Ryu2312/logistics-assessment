import { SearchInput } from './SearchInput';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchValue, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="relative flex items-center space-x-4">
        <SearchInput
          placeholder="Buscar operación..."
          value={searchValue}
          onChange={onSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="icon icon-tabler icons-tabler-outline icon-tabler-search absolute right-6"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      </div>
    </header>
  );
}
