
import React, { useState } from 'react';
import { SaaSIdea, ResearchData, GeneratedCode, MarketingAssets, AppStep } from './types';
import StepIndicator from './components/StepIndicator';
import IdeaGenerator from './components/IdeaGenerator';
import ResearchDisplay from './components/ResearchDisplay';
import CodeGenerator from './components/CodeGenerator';
import MarketingSuite from './components/MarketingSuite';

const App: React.FC = () => {
    const [step, setStep] = useState<AppStep>(AppStep.IDEA);
    const [saasIdea, setSaaSidea] = useState<SaaSIdea | null>(null);
    const [researchData, setResearchData] = useState<ResearchData | null>(null);
    const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
    const [marketingAssets, setMarketingAssets] = useState<MarketingAssets | null>(null);

    const handleIdeaSelected = (idea: SaaSIdea) => {
        setSaaSidea(idea);
        setStep(AppStep.RESEARCH);
    };

    const handleResearchComplete = (data: ResearchData) => {
        setResearchData(data);
        setStep(AppStep.CODE);
    };

    const handleCodeGenerated = (code: GeneratedCode) => {
        setGeneratedCode(code);
        setStep(AppStep.MARKETING);
    };
    
    const handleMarketingGenerated = (assets: MarketingAssets) => {
        setMarketingAssets(assets);
        setStep(AppStep.DONE);
    };

    const restartProcess = () => {
        setStep(AppStep.IDEA);
        setSaaSidea(null);
        setResearchData(null);
        setGeneratedCode(null);
        setMarketingAssets(null);
    };

    const renderStepContent = () => {
        switch (step) {
            case AppStep.IDEA:
                return <IdeaGenerator onIdeaSelected={handleIdeaSelected} />;
            case AppStep.RESEARCH:
                if (!saasIdea) return null;
                return <ResearchDisplay idea={saasIdea} onResearchComplete={handleResearchComplete} />;
            case AppStep.CODE:
                if (!saasIdea || !researchData) return null;
                return <CodeGenerator idea={saasIdea} onCodeGenerated={handleCodeGenerated} />;
            case AppStep.MARKETING:
                if (!saasIdea || !generatedCode) return null;
                return <MarketingSuite idea={saasIdea} onMarketingGenerated={handleMarketingGenerated} />;
            case AppStep.DONE:
                 return (
                    <div className="text-center p-8 bg-surface rounded-lg shadow-xl">
                        <h2 className="text-3xl font-bold text-secondary mb-4">Congratulations! Your SaaS is ready for launch!</h2>
                        <p className="text-text-secondary mb-6">You've successfully gone from idea to a fully-coded application with marketing materials.</p>
                        <button 
                            onClick={restartProcess} 
                            className="bg-primary hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Build Another SaaS
                        </button>
                    </div>
                );
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        Resolvia AI SaaS Builder
                    </h1>
                    <p className="mt-2 text-lg text-text-secondary">From Idea to MVP to Market, All with AI.</p>
                </header>
                
                <StepIndicator currentStep={step} />

                <main className="mt-10">
                    {renderStepContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
