import { Button } from './Button';
import { SearchInput } from './SearchInput';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchValue, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SearchInput
          placeholder="Buscar empresa..."
          value={searchValue}
          onChange={onSearchChange}
        />
        <Button variant="secondary" size="sm">
          Filtros
        </Button>
      </div>
    </header>
  );
}
