import React from 'react';

interface ComingSoonProps {
    title: string;
    description: string;
    icon: string;
    features: string[];
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, description, icon, features }) => {
    return (
        <div className="flex items-center justify-center min-h-full p-6">
            <div className="max-w-2xl text-center space-y-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl 
                              bg-gradient-to-br from-primary to-secondary animate-float">
                    <i className={`${icon} text-5xl text-white`}></i>
                </div>
                
                <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-bold text-glow">{title}</h2>
                    <p className="text-lg text-text-secondary">{description}</p>
                </div>

                <div className="glass p-6 rounded-xl text-left">
                    <h3 className="text-lg font-bold mb-4">Coming Soon:</h3>
                    <ul className="space-y-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-3">
                                <i className="fas fa-check-circle text-secondary mt-1"></i>
                                <span className="text-text-secondary">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/20 text-primary">
                    <i className="fas fa-clock"></i>
                    <span className="text-sm font-medium">Under Development</span>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
