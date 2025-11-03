import React, { useState } from 'react';
import MenuBar from './MenuBar';
import Dock, { DockApp } from './Dock';
import MobileNav from './MobileNav';
import Desktop, { DesktopApp } from './Desktop';
import Window from './Window';
import Dashboard from '../Dashboard';
import SaaSBuilderApp from '../SaaSBuilderApp';
import ComingSoon from '../ComingSoon';

type AppId = 'desktop' | 'dashboard' | 'saas-builder' | 'ecommerce' | 'influencer' | 'agency' | 'marketplace' | 'settings';

const OSShell: React.FC = () => {
    const [activeApp, setActiveApp] = useState<AppId>('dashboard');
    const [isMaximized, setIsMaximized] = useState(false);

    const dockApps: DockApp[] = [
        { 
            id: 'dashboard', 
            name: 'Dashboard', 
            icon: 'fas fa-home', 
            gradient: 'bg-gradient-to-br from-primary to-primary-dark',
            isActive: activeApp === 'dashboard'
        },
        { 
            id: 'saas-builder', 
            name: 'SaaS Builder', 
            icon: 'fas fa-layer-group', 
            gradient: 'bg-gradient-to-br from-primary to-secondary',
            isActive: activeApp === 'saas-builder'
        },
        { 
            id: 'ecommerce', 
            name: 'E-commerce', 
            icon: 'fas fa-shopping-cart', 
            gradient: 'bg-gradient-to-br from-secondary to-secondary-dark',
            isActive: activeApp === 'ecommerce'
        },
        { 
            id: 'influencer', 
            name: 'Influencer', 
            icon: 'fas fa-star', 
            gradient: 'bg-gradient-to-br from-accent-purple to-accent-pink',
            isActive: activeApp === 'influencer'
        },
        { 
            id: 'agency', 
            name: 'Agency', 
            icon: 'fas fa-briefcase', 
            gradient: 'bg-gradient-to-br from-accent-orange to-accent-pink',
            isActive: activeApp === 'agency'
        },
        { 
            id: 'marketplace', 
            name: 'Marketplace', 
            icon: 'fas fa-store', 
            gradient: 'bg-gradient-to-br from-accent-pink to-primary',
            isActive: activeApp === 'marketplace'
        },
        { 
            id: 'desktop', 
            name: 'Apps', 
            icon: 'fas fa-th', 
            gradient: 'bg-gradient-to-br from-surface-light to-border',
            isActive: activeApp === 'desktop'
        },
    ];

    const desktopApps: DesktopApp[] = [
        { 
            id: 'dashboard', 
            name: 'Dashboard', 
            icon: 'fas fa-home', 
            gradient: 'bg-gradient-to-br from-primary to-primary-dark',
            description: 'Business overview and quick start'
        },
        { 
            id: 'saas-builder', 
            name: 'SaaS Builder', 
            icon: 'fas fa-layer-group', 
            gradient: 'bg-gradient-to-br from-primary to-secondary',
            description: 'Build complete SaaS products'
        },
        { 
            id: 'ecommerce', 
            name: 'E-commerce', 
            icon: 'fas fa-shopping-cart', 
            gradient: 'bg-gradient-to-br from-secondary to-secondary-dark',
            description: 'Launch your online store'
        },
        { 
            id: 'influencer', 
            name: 'Influencer Studio', 
            icon: 'fas fa-star', 
            gradient: 'bg-gradient-to-br from-accent-purple to-accent-pink',
            description: 'Build your personal brand'
        },
        { 
            id: 'agency', 
            name: 'Agency Hub', 
            icon: 'fas fa-briefcase', 
            gradient: 'bg-gradient-to-br from-accent-orange to-accent-pink',
            description: 'Manage clients and services'
        },
        { 
            id: 'marketplace', 
            name: 'Marketplace', 
            icon: 'fas fa-store', 
            gradient: 'bg-gradient-to-br from-accent-pink to-primary',
            description: 'Connect with partners and talent'
        },
        { 
            id: 'settings', 
            name: 'Settings', 
            icon: 'fas fa-cog', 
            gradient: 'bg-gradient-to-br from-surface-light to-border',
            description: 'Configure your workspace'
        },
    ];

    const handleAppClick = (appId: string) => {
        setActiveApp(appId as AppId);
        setIsMaximized(false);
    };

    const handleClose = () => {
        setActiveApp('dashboard');
        setIsMaximized(false);
    };

    const renderAppContent = () => {
        switch (activeApp) {
            case 'desktop':
                return <Desktop apps={desktopApps} onAppClick={handleAppClick} />;
            case 'dashboard':
                return <Dashboard onLaunchApp={handleAppClick} />;
            case 'saas-builder':
                return <SaaSBuilderApp />;
            case 'ecommerce':
                return (
                    <ComingSoon
                        title="E-commerce Builder"
                        description="Launch and scale your online store with AI-powered automation"
                        icon="fas fa-shopping-cart"
                        features={[
                            'Product research and selection with AI insights',
                            'Automated store creation and listing optimization',
                            'Manufacturing partner matching from marketplace',
                            'Multi-channel marketing campaigns (ads, social, influencers)',
                            'Inventory and order management automation',
                            'Customer acquisition through AI-driven outreach'
                        ]}
                    />
                );
            case 'influencer':
                return (
                    <ComingSoon
                        title="Influencer Studio"
                        description="Build, monetize, and scale your personal brand"
                        icon="fas fa-star"
                        features={[
                            'Professional website and landing pages',
                            'Course creation and hosting platform',
                            'Lead magnet development and automation',
                            'Custom community management',
                            'Brand product/service launch assistance',
                            'Talent marketplace for editors and designers'
                        ]}
                    />
                );
            case 'agency':
                return (
                    <ComingSoon
                        title="Agency Hub"
                        description="Scale your service business with AI agents"
                        icon="fas fa-briefcase"
                        features={[
                            'Automated client acquisition and outreach',
                            'Talent matching from marketplace',
                            'Portfolio website generation',
                            'Email campaigns and cold calling automation',
                            'Project management and delivery tracking',
                            'Revenue optimization and analytics'
                        ]}
                    />
                );
            case 'marketplace':
                return (
                    <ComingSoon
                        title="Cooper Marketplace"
                        description="Connect with the resources you need to grow"
                        icon="fas fa-store"
                        features={[
                            'Manufacturing partners and suppliers',
                            'Influencer network for marketing campaigns',
                            'Talent pool (designers, developers, editors)',
                            'Cooper user business/startup marketplace',
                            'Investment opportunities for VCs and angels',
                            'Service providers and consultants'
                        ]}
                    />
                );
            case 'settings':
                return (
                    <ComingSoon
                        title="Settings"
                        description="Customize your Cooper workspace"
                        icon="fas fa-cog"
                        features={[
                            'Autopilot mode configuration',
                            'AI agent management and preferences',
                            'Integration with Slack, Zoom, Airtable',
                            'Subscription and credit management',
                            'Custom UI themes and layouts',
                            'Team collaboration settings'
                        ]}
                    />
                );
            default:
                return null;
        }
    };

    const getWindowConfig = () => {
        const configs = {
            'desktop': { title: 'All Apps', icon: 'fas fa-th', gradient: 'from-surface-light to-border' },
            'dashboard': { title: 'Dashboard', icon: 'fas fa-home', gradient: 'from-primary to-primary-dark' },
            'saas-builder': { title: 'SaaS Builder', icon: 'fas fa-layer-group', gradient: 'from-primary to-secondary' },
            'ecommerce': { title: 'E-commerce Builder', icon: 'fas fa-shopping-cart', gradient: 'from-secondary to-secondary-dark' },
            'influencer': { title: 'Influencer Studio', icon: 'fas fa-star', gradient: 'from-accent-purple to-accent-pink' },
            'agency': { title: 'Agency Hub', icon: 'fas fa-briefcase', gradient: 'from-accent-orange to-accent-pink' },
            'marketplace': { title: 'Marketplace', icon: 'fas fa-store', gradient: 'from-accent-pink to-primary' },
            'settings': { title: 'Settings', icon: 'fas fa-cog', gradient: 'from-surface-light to-border' },
        };
        return configs[activeApp];
    };

    const windowConfig = getWindowConfig();

    return (
        <div className="h-screen w-screen flex flex-col bg-gradient-radial overflow-hidden">
            <MenuBar />
            
            <div className="flex-1 overflow-hidden flex items-center justify-center p-4 pb-20 md:pb-4">
                <Window
                    title={windowConfig.title}
                    icon={windowConfig.icon}
                    gradient={windowConfig.gradient}
                    onClose={handleClose}
                    onMinimize={() => setActiveApp('dashboard')}
                    onMaximize={() => setIsMaximized(!isMaximized)}
                    isMaximized={isMaximized}
                >
                    {renderAppContent()}
                </Window>
            </div>

            <Dock apps={dockApps} onAppClick={handleAppClick} />
            <MobileNav apps={dockApps} onAppClick={handleAppClick} />
        </div>
    );
};

export default OSShell;
