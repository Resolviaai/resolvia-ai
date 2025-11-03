
import React from 'react';

interface LoadingSpinnerProps {
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
            {text && <span className="text-text-primary">{text}</span>}
        </div>
    );
};

export default LoadingSpinner;
