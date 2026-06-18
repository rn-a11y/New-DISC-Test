import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export function Button({ children, onClick, variant = 'primary', size = 'md', disabled, className = '', type = 'button' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]';
  const sizes = { sm: 'px-4 py-2 text-sm gap-1.5', md: 'px-6 py-2.5 text-base gap-2', lg: 'px-8 py-3.5 text-lg gap-2' };
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-light shadow-lg shadow-navy/10 focus:ring-navy',
    secondary: 'bg-white text-navy border-2 border-navy/20 hover:border-navy/40 hover:bg-slate-50 focus:ring-navy',
    ghost: 'bg-transparent text-navy hover:bg-slate-100 focus:ring-slate-300',
    outline: 'bg-transparent text-navy border border-slate-200 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-300',
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
