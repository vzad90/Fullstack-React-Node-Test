import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
    shadow?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
    children, 
    className = '', 
    padding = 'md',
    shadow = 'md'
}) => {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };
    
    const shadowClasses = {
        sm: 'shadow-sm',
        md: 'shadow-lg',
        lg: 'shadow-xl'
    };
    
    const baseClasses = 'bg-white rounded-xl';
    const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`;
    
    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Card; 