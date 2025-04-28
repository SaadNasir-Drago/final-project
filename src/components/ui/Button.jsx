'use client';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = 'py-3 font-medium rounded transition focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border border-purple-600 text-purple-600 hover:bg-purple-50',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
