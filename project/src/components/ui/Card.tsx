import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  className = '',
  children,
  hoverable = false,
  bordered = true,
}) => {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden';
  const borderStyles = bordered ? 'border border-gray-200 dark:border-gray-700' : '';
  const hoverStyles = hoverable ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : '';
  
  return (
    <div className={`${baseStyles} ${borderStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className = '', children }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ className = '', children }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className = '', children }) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export default Card;