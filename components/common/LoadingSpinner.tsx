
import React from 'react';

interface LoadingSpinnerProps {
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-b-transparent border-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
            </div>
            {text && <span className="text-text-primary text-sm font-medium">{text}</span>}
        </div>
    );
};

export default LoadingSpinner;
