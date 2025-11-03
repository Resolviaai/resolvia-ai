import React from 'react';
import { DockApp } from './Dock';

interface MobileNavProps {
    apps: DockApp[];
    onAppClick: (appId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ apps, onAppClick }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10">
            <div className="flex items-center justify-around py-2 px-2">
                {apps.slice(0, 5).map((app) => (
                    <button
                        key={app.id}
                        onClick={() => onAppClick(app.id)}
                        className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all
                                  ${app.isActive ? 'bg-white/10' : ''}`}
                    >
                        <div className={`w-10 h-10 rounded-xl ${app.gradient} 
                                      flex items-center justify-center text-white text-sm shadow-lg
                                      ${app.isActive ? 'scale-110' : ''}`}>
                            <i className={app.icon}></i>
                        </div>
                        <span className="text-[10px] text-text-secondary">{app.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileNav;
