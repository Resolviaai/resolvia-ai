import React, { useState } from 'react';

interface WindowProps {
    title: string;
    icon?: string;
    children: React.ReactNode;
    onClose?: () => void;
    onMinimize?: () => void;
    isMaximized?: boolean;
    onMaximize?: () => void;
    gradient?: string;
}

const Window: React.FC<WindowProps> = ({ 
    title, 
    icon, 
    children, 
    onClose, 
    onMinimize,
    isMaximized = false,
    onMaximize,
    gradient = 'from-primary to-secondary'
}) => {
    const [isHoveringControls, setIsHoveringControls] = useState(false);

    return (
        <div className={`flex flex-col ${isMaximized ? 'w-full h-full' : 'w-full max-w-6xl h-[85vh]'} 
                        glass-strong rounded-xl window-shadow overflow-hidden animate-scale-in`}>
            <div className={`bg-gradient-to-r ${gradient} h-10 flex items-center justify-between px-4 select-none`}>
                <div className="flex items-center space-x-3">
                    <div 
                        className="flex items-center space-x-2"
                        onMouseEnter={() => setIsHoveringControls(true)}
                        onMouseLeave={() => setIsHoveringControls(false)}
                    >
                        {onClose && (
                            <button 
                                onClick={onClose}
                                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                            >
                                {isHoveringControls && (
                                    <i className="fas fa-times text-[8px] text-red-900 opacity-0 group-hover:opacity-100"></i>
                                )}
                            </button>
                        )}
                        {onMinimize && (
                            <button 
                                onClick={onMinimize}
                                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                            >
                                {isHoveringControls && (
                                    <i className="fas fa-minus text-[8px] text-yellow-900 opacity-0 group-hover:opacity-100"></i>
                                )}
                            </button>
                        )}
                        {onMaximize && (
                            <button 
                                onClick={onMaximize}
                                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                            >
                                {isHoveringControls && (
                                    <i className={`fas ${isMaximized ? 'fa-compress' : 'fa-expand'} text-[8px] text-green-900 opacity-0 group-hover:opacity-100`}></i>
                                )}
                            </button>
                        )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {icon && <i className={`${icon} text-white text-sm`}></i>}
                        <span className="text-white text-sm font-medium">{title}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-surface/30 scrollbar-thin">
                {children}
            </div>
        </div>
    );
};

export default Window;
