
import React, { useState, useEffect } from 'react';
import { SaaSIdea, ResearchData } from '../types';
import { researchIdea } from '../services/geminiService';
import LoadingSpinner from './common/LoadingSpinner';
import Card from './common/Card';

interface ResearchDisplayProps {
    idea: SaaSIdea;
    onResearchComplete: (data: ResearchData) => void;
}

const ResearchDisplay: React.FC<ResearchDisplayProps> = ({ idea, onResearchComplete }) => {
    const [researchData, setResearchData] = useState<ResearchData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const performResearch = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await researchIdea(idea);
                setResearchData(data);
            } catch (err) {
                setError('Failed to perform market research. Please try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        performResearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idea]);

    const handleProceed = () => {
        if (researchData) {
            onResearchComplete(researchData);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <LoadingSpinner text="Conducting AI Market Research..." />
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

    if (!researchData) return null;

    return (
        <div className="space-y-8">
            <Card>
                <h2 className="text-3xl font-bold mb-4">Market Research: <span className="text-secondary">{idea.name}</span></h2>
                <p className="text-text-secondary">{researchData.summary}</p>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-bold mb-4">Potential Competitors</h3>
                    {researchData.competitors.length > 0 ? (
                        <ul className="list-disc list-inside space-y-2 text-text-secondary">
                            {researchData.competitors.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    ) : <p className="text-text-secondary">No direct competitors found. This could be a great opportunity!</p>}
                </Card>
                <Card>
                    <h3 className="text-xl font-bold mb-4">Monetization Strategies</h3>
                     {researchData.monetization.length > 0 ? (
                        <ul className="list-disc list-inside space-y-2 text-text-secondary">
                            {researchData.monetization.map((m, i) => <li key={i}>{m}</li>)}
                        </ul>
                    ) : <p className="text-text-secondary">Monetization strategies could not be determined.</p>}
                    </Card>
                    </div>

            {researchData.sources.length > 0 && (
                <Card>
                    <h3 className="text-xl font-bold mb-4">Research Sources</h3>
                    <div className="space-y-2">
                        {researchData.sources.map((source, index) => source.web && (
                            <a href={source.web.uri} target="_blank" rel="noopener noreferrer" key={index} className="block text-sm text-blue-400 hover:text-blue-300 truncate">
                                <i className="fa-solid fa-link mr-2"></i>{source.web.title}
                            </a>
                        ))}
                    </div>
                </Card>
            )}

            <div className="text-center mt-8">
                <button 
                    onClick={handleProceed}
                    className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all hover-lift w-full sm:w-auto shadow-lg"
                >
                    <i className="fas fa-code mr-2"></i>
                    Proceed to Code Generation
                </button>
            </div>
        </div>
    );
};

export default ResearchDisplay;
