import React, { useState } from 'react';
import { SaaSIdea, ResearchData, GeneratedCode, MarketingAssets, AppStep } from '../types';
import StepIndicator from './StepIndicator';
import IdeaGenerator from './IdeaGenerator';
import ResearchDisplay from './ResearchDisplay';
import CodeGenerator from './CodeGenerator';
import MarketingSuite from './MarketingSuite';

const SaaSBuilderApp: React.FC = () => {
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
                    <div className="flex items-center justify-center min-h-full p-6">
                        <div className="text-center max-w-2xl space-y-6">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl 
                                          bg-gradient-to-br from-secondary to-secondary-dark animate-float">
                                <i className="fas fa-check text-5xl text-white"></i>
                            </div>
                            
                            <h2 className="text-3xl sm:text-4xl font-bold text-glow">
                                Congratulations! 🎉
                            </h2>
                            <p className="text-lg text-text-secondary">
                                Your SaaS is ready for launch! You've successfully gone from idea to a 
                                fully-coded application with marketing materials.
                            </p>
                            
                            <button 
                                onClick={restartProcess} 
                                className="bg-gradient-to-r from-secondary to-secondary-dark hover:opacity-90 
                                         text-white font-bold py-3 px-8 rounded-xl transition-all hover-lift"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Build Another SaaS
                            </button>
                        </div>
                    </div>
                );
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">SaaS Builder</h2>
                <p className="text-text-secondary">From Idea to MVP to Market, All with AI</p>
            </div>
            
            <StepIndicator currentStep={step} />

            <div className="mt-6">
                {renderStepContent()}
            </div>
        </div>
    );
};

export default SaaSBuilderApp;
