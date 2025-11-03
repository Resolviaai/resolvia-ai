
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
        return <div className="text-center p-10"><LoadingSpinner text="AI is coding your application..." /></div>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (!generatedCode) return null;
    
    const TabButton = ({ tabName, label }: {tabName: Tab, label: string}) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tabName ? 'bg-primary text-white' : 'bg-surface hover:bg-gray-700'}`}
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
                     <pre className="bg-background p-4 rounded-b-lg overflow-x-auto text-sm"><code>{generatedCode.frontend}</code></pre>
                )}
                {activeTab === 'backend' && (
                     <pre className="bg-background p-4 rounded-b-lg overflow-x-auto text-sm"><code>{generatedCode.backend}</code></pre>
                )}
                {activeTab === 'preview' && (
                    <div className="bg-white p-6 rounded-b-lg text-gray-800">
                        <div className="border border-gray-300 p-4 rounded-lg">
                             <h1 className="text-2xl font-bold text-gray-900 mb-2">{idea.name}</h1>
                             <p className="text-gray-600 mb-4">{idea.description}</p>
                             <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Get Started</button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">This is a static, simulated preview of your landing page.</p>
                    </div>
                )}
                {(activeTab === 'frontend' || activeTab === 'backend') && (
                     <button onClick={handleCopy} className="absolute top-2 right-2 bg-gray-600 text-white px-3 py-1 rounded-md text-xs hover:bg-gray-500">
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                )}
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={() => onCodeGenerated(generatedCode)}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 transition-colors duration-300 w-full sm:w-auto"
                >
                   Looks Good! Generate Marketing Materials
                </button>
            </div>
        </Card>
    );
};

export default CodeGenerator;
