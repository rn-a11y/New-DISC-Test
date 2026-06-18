import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ children, color, size = 'md' }: BadgeProps) {
  const sizeClasses = { sm: 'px-2.5 py-0.5 text-[10px]', md: 'px-3 py-1 text-xs', lg: 'px-4 py-1.5 text-sm' };
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${sizeClasses[size]}`}
      style={{ backgroundColor: color + '15', color }}
    >
      {children}
    </span>
  );
}
