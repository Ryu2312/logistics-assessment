import { ReactNode } from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({ children, size = 'md', className = '', ...props }: IconButtonProps) {
  const sizeClasses = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg',
  };

  return (
    <button
      className={`text-slate-400 hover:text-slate-600 transition-colors cursor-pointer ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
