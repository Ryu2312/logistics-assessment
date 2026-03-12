import { Button } from './Button';

interface MenuItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function MenuItem({ label, isActive = false, onClick }: MenuItemProps) {
  return (
    <Button
      onClick={onClick}
      className={`w-full text-left ${
        isActive ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700' : 'text-slate-600'
      }`}
      variant={isActive ? 'primary' : 'secondary'}
      size="sm"
    >
      {label}
    </Button>
  );
}
