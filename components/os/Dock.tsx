import React from 'react';

export interface DockApp {
    id: string;
    name: string;
    icon: string;
    gradient: string;
    isActive?: boolean;
}

interface DockProps {
    apps: DockApp[];
    onAppClick: (appId: string) => void;
}

const Dock: React.FC<DockProps> = ({ apps, onAppClick }) => {
    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
            <div className="glass-strong rounded-2xl px-3 py-2 shadow-2xl">
                <div className="flex items-end space-x-2">
                    {apps.map((app) => (
                        <button
                            key={app.id}
                            onClick={() => onAppClick(app.id)}
                            className="group relative"
                            title={app.name}
                        >
                            <div className={`w-14 h-14 rounded-xl ${app.gradient} flex items-center justify-center text-white text-xl
                                          hover:scale-125 transition-all duration-200 ease-out shadow-lg
                                          ${app.isActive ? 'scale-110' : ''}`}>
                                <i className={app.icon}></i>
                            </div>
                            
                            {app.isActive && (
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white"></div>
                            )}
                            
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 
                                          bg-surface-light rounded-lg text-xs whitespace-nowrap opacity-0 
                                          group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                                {app.name}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dock;
