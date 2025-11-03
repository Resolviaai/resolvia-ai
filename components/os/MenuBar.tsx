import React, { useState, useEffect } from 'react';

const MenuBar: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short', 
            day: 'numeric'
        });
    };

    return (
        <div className="glass-strong h-12 flex items-center justify-between px-4 border-b border-white/10 relative z-50">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <i className="fas fa-building text-white text-xs"></i>
                    </div>
                    <span className="font-bold text-sm tracking-tight">Cooper</span>
                </div>
                
                <div className="hidden md:flex items-center space-x-4 text-sm">
                    <button className="hover:text-primary transition-colors">Apps</button>
                    <button className="hover:text-primary transition-colors">Window</button>
                    <button className="hover:text-primary transition-colors">Help</button>
                </div>
            </div>

            <div className="flex items-center space-x-4 text-sm">
                <div className="hidden sm:flex items-center space-x-3">
                    <button className="hover:text-primary transition-colors" title="Notifications">
                        <i className="fas fa-bell"></i>
                    </button>
                    <button className="hover:text-primary transition-colors" title="Search">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                
                <div className="flex items-center space-x-2 text-text-secondary">
                    <span className="hidden sm:inline">{formatDate(currentTime)}</span>
                    <span className="font-medium">{formatTime(currentTime)}</span>
                </div>
                
                <button className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform">
                    U
                </button>
            </div>
        </div>
    );
};

export default MenuBar;
