import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export const Link: React.FC<LinkProps> = ({ 
  href, 
  children, 
  className = '', 
  active = false 
}) => {
  return (
    <a
      href={href}
      className={`
        relative text-gray-300 hover:text-white transition-colors duration-300
        ${active ? 'text-white' : ''}
        ${className}
      `}
    >
      {children}
      <span 
        className={`
          absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300
          ${active ? 'w-full' : ''}
          group-hover:w-full
        `} 
      />
    </a>
  );
};