
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-surface p-6 sm:p-8 rounded-lg shadow-xl ${className}`}>
            {children}
        </div>
    );
};

export default Card;
