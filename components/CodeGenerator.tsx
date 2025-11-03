
import React, { useState, useEffect } from 'react';
import { SaaSIdea, GeneratedCode } from '../types';
import { generateCode } from '../services/geminiService';
import LoadingSpinner from './common/LoadingSpinner';
import Card from './common/Card';

interface CodeGeneratorProps {
    idea: SaaSIdea;
    onCodeGenerated: (code: GeneratedCode) => void;
}

type Tab = 'frontend' | 'backend' | 'preview';

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ idea, onCodeGenerated }) => {
    const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>('frontend');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const getCode = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const code = await generateCode(idea);
                setGeneratedCode(code);
            } catch (err) {
                setError('Failed to generate code.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idea]);

    const handleCopy = () => {
        if (!generatedCode) return;
        const codeToCopy = activeTab === 'frontend' ? generatedCode.frontend : generatedCode.backend;
        navigator.clipboard.writeText(codeToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <LoadingSpinner text="AI is coding your application..." />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-strong p-6 rounded-xl border border-red-500/50 text-red-400 text-center">
                <i className="fas fa-exclamation-circle text-3xl mb-3"></i>
                <p>{error}</p>
            </div>
        );
    }

    if (!generatedCode) return null;
    
    const TabButton = ({ tabName, label }: {tabName: Tab, label: string}) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-t-xl transition-all ${
                activeTab === tabName 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                    : 'glass hover:bg-white/10'
            }`}
        >
            {label}
        </button>
    )

    return (
        <Card>
            <h2 className="text-3xl font-bold mb-4">Generated Code for <span className="text-secondary">{idea.name}</span></h2>
            <div className="flex border-b border-border mb-4">
                <TabButton tabName="frontend" label="Frontend (React + Tailwind)" />
                <TabButton tabName="backend" label="Backend (Node.js + Express)" />
                <TabButton tabName="preview" label="Simulated Preview" />
            </div>

            <div className="relative">
                {activeTab === 'frontend' && (
                     <pre className="glass-strong p-4 rounded-b-xl overflow-x-auto text-sm scrollbar-thin border border-border/50"><code>{generatedCode.frontend}</code></pre>
                )}
                {activeTab === 'backend' && (
                     <pre className="glass-strong p-4 rounded-b-xl overflow-x-auto text-sm scrollbar-thin border border-border/50"><code>{generatedCode.backend}</code></pre>
                )}
                {activeTab === 'preview' && (
                    <div className="bg-white p-6 rounded-b-xl text-gray-800 border border-border/50">
                        <div className="border border-gray-300 p-6 rounded-xl shadow-lg">
                             <h1 className="text-2xl font-bold text-gray-900 mb-2">{idea.name}</h1>
                             <p className="text-gray-600 mb-4">{idea.description}</p>
                             <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all shadow-lg">
                                Get Started
                             </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 text-center">
                            <i className="fas fa-info-circle mr-1"></i>
                            This is a static, simulated preview of your landing page.
                        </p>
                    </div>
                )}
                {(activeTab === 'frontend' || activeTab === 'backend') && (
                     <button 
                        onClick={handleCopy} 
                        className="absolute top-2 right-2 glass-strong px-4 py-2 rounded-lg text-xs hover:bg-white/20 transition-all shadow-lg"
                     >
                        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} mr-2`}></i>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                )}
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={() => onCodeGenerated(generatedCode)}
                    className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all hover-lift w-full sm:w-auto shadow-lg"
                >
                    <i className="fas fa-bullhorn mr-2"></i>
                    Looks Good! Generate Marketing Materials
                </button>
            </div>
        </Card>
    );
};

export default CodeGenerator;
