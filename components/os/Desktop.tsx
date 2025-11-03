import React from 'react';

export interface DesktopApp {
    id: string;
    name: string;
    icon: string;
    gradient: string;
    description?: string;
}

interface DesktopProps {
    apps: DesktopApp[];
    onAppClick: (appId: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ apps, onAppClick }) => {
    return (
        <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {apps.map((app) => (
                <button
                    key={app.id}
                    onClick={() => onAppClick(app.id)}
                    className="group flex flex-col items-center space-y-3 p-4 rounded-2xl hover-lift hover:bg-white/5 transition-all"
                >
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${app.gradient} 
                                    flex items-center justify-center text-white text-3xl sm:text-4xl shadow-xl
                                    group-hover:shadow-2xl transition-shadow`}>
                        <i className={app.icon}></i>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                            {app.name}
                        </div>
                        {app.description && (
                            <div className="text-xs text-text-secondary mt-1 line-clamp-2">
                                {app.description}
                            </div>
                        )}
                    </div>
                </button>
            ))}
        </div>
    );
};

export default Desktop;
