
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`glass p-6 sm:p-8 rounded-xl border border-border/50 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
