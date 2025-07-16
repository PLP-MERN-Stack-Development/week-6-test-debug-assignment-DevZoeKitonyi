import React from 'react';

const Button = ({ children, to, variant = 'primary', size = 'md', disabled = false, className = '', ...props }) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };
  const disabledClasses = disabled ? 'btn-disabled' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className,
  ].join(' ').trim();

  if (to) {
    return (
      <a href={to} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;