import React from 'react';

interface DashboardProps {
    onLaunchApp: (appId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLaunchApp }) => {
    const quickStats = [
        { label: 'Active Projects', value: '0', icon: 'fas fa-rocket', color: 'text-primary' },
        { label: 'Revenue', value: '$0', icon: 'fas fa-dollar-sign', color: 'text-secondary' },
        { label: 'AI Agents', value: '0', icon: 'fas fa-robot', color: 'text-accent-purple' },
        { label: 'Tasks Completed', value: '0', icon: 'fas fa-check-circle', color: 'text-accent-orange' },
    ];

    const quickActions = [
        { 
            id: 'saas-builder',
            title: 'Build a SaaS', 
            description: 'Create a complete SaaS product from idea to launch',
            icon: 'fas fa-layer-group',
            gradient: 'from-primary to-primary-dark'
        },
        { 
            id: 'ecommerce',
            title: 'Launch E-commerce', 
            description: 'Start your online store with AI assistance',
            icon: 'fas fa-shopping-cart',
            gradient: 'from-secondary to-secondary-dark'
        },
        { 
            id: 'influencer',
            title: 'Influencer Studio', 
            description: 'Build and monetize your personal brand',
            icon: 'fas fa-star',
            gradient: 'from-accent-purple to-accent-pink'
        },
        { 
            id: 'agency',
            title: 'Agency Hub', 
            description: 'Manage clients and deliver services at scale',
            icon: 'fas fa-briefcase',
            gradient: 'from-accent-orange to-accent-pink'
        },
    ];

    return (
        <div className="p-6 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-glow">
                    Welcome to Cooper
                </h1>
                <p className="text-text-secondary text-lg">
                    Your Business Operating System - Build, Launch, and Scale with AI
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat, index) => (
                    <div key={index} className="glass p-5 rounded-xl hover-lift">
                        <div className="flex items-center justify-between mb-2">
                            <i className={`${stat.icon} ${stat.color} text-2xl`}></i>
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Quick Start</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {quickActions.map((action) => (
                        <button
                            key={action.id}
                            onClick={() => onLaunchApp(action.id)}
                            className="glass p-6 rounded-xl text-left hover-lift group"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} 
                                          flex items-center justify-center text-white text-xl mb-4
                                          group-hover:scale-110 transition-transform`}>
                                <i className={action.icon}></i>
                            </div>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                {action.title}
                            </h3>
                            <p className="text-sm text-text-secondary">
                                {action.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="glass p-6 rounded-xl">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary 
                                  flex items-center justify-center text-white text-xl flex-shrink-0">
                        <i className="fas fa-lightbulb"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-2">Getting Started</h3>
                        <p className="text-text-secondary text-sm mb-4">
                            Cooper is your all-in-one business operating system. Choose a business type above to get started,
                            or explore the marketplace to connect with manufacturers, influencers, and talent.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs">
                                AI-Powered
                            </span>
                            <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs">
                                Autopilot Mode
                            </span>
                            <span className="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-xs">
                                24/7 Agents
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
