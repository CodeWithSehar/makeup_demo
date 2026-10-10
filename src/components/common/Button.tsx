import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'whatsapp' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 shadow-sm',
    md: 'text-sm px-5 py-2.5 gap-2 shadow-sm',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-md',
  };

  const variantStyles = {
    primary:
      'bg-primary hover:bg-primary-dark text-white shadow-rose-200/50 hover:shadow-lg hover:shadow-rose-300/40',
    outline:
      'border border-rose-300/70 text-primary hover:bg-rose-50/70 active:bg-rose-100/50',
    whatsapp:
      'bg-whatsapp hover:bg-[#128C7E] text-white shadow-emerald-200/50 hover:shadow-lg hover:shadow-emerald-300/40 font-semibold',
    secondary:
      'bg-stone-900 hover:bg-stone-800 text-white shadow-stone-300/40',
    ghost:
      'text-text-main hover:text-primary hover:bg-rose-50/60 shadow-none',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

