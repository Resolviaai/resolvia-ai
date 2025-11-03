
import React, { useState } from 'react';
import { IDEA_QUESTIONS } from '../constants';
import { SaaSIdea } from '../types';
import { generateSaaSIdeas } from '../services/geminiService';
import LoadingSpinner from './common/LoadingSpinner';

interface IdeaGeneratorProps {
    onIdeaSelected: (idea: SaaSIdea) => void;
}

const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ onIdeaSelected }) => {
    const [answers, setAnswers] = useState<string[]>(Array(IDEA_QUESTIONS.length).fill(''));
    const [generatedIdeas, setGeneratedIdeas] = useState<SaaSIdea[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setGeneratedIdeas([]);
        try {
            const ideas = await generateSaaSIdeas(answers.filter(a => a.trim() !== ''));
            setGeneratedIdeas(ideas);
        } catch (err) {
            setError('Failed to generate ideas. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="glass p-6 sm:p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-2">Let's Find Your Big Idea</h2>
                <p className="text-text-secondary mb-6">Answer a few questions to help our AI brainstorm some SaaS concepts for you.</p>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {IDEA_QUESTIONS.map((question, index) => (
                        <div key={index}>
                            <label htmlFor={`question-${index}`} className="block text-sm font-medium text-text-primary mb-1">
                                {question}
                            </label>
                            <textarea
                                id={`question-${index}`}
                                rows={2}
                                value={answers[index]}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                className="w-full glass border border-border/50 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-primary placeholder-text-secondary"
                                placeholder="Your thoughts..."
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all hover-lift w-full sm:w-auto shadow-lg"
                    >
                        {isLoading ? <LoadingSpinner text="Generating Ideas..." /> : (
                            <>
                                <i className="fas fa-lightbulb mr-2"></i>
                                Generate Ideas
                            </>
                        )}
                    </button>
                </div>
            </form>

            {error && (
                <div className="glass-strong p-4 rounded-xl border border-red-500/50 text-red-400 text-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {error}
                </div>
            )}
            </div>

            {generatedIdeas.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-center">Here are some ideas for you:</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {generatedIdeas.map((idea, index) => (
                            <div key={index} className="glass p-6 rounded-xl border border-border/50 flex flex-col hover-lift">
                                <h4 className="text-lg font-bold text-secondary">{idea.name}</h4>
                                <p className="text-text-secondary mt-2 flex-grow text-sm">{idea.description}</p>
                                <p className="text-xs text-text-secondary mt-4">
                                    <strong className="text-text-primary">Target:</strong> {idea.targetAudience}
                                </p>
                                <button
                                    onClick={() => onIdeaSelected(idea)}
                                    className="mt-6 bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold py-2 px-4 rounded-xl hover:opacity-90 transition-all w-full shadow-lg"
                                >
                                    <i className="fas fa-search mr-2"></i>
                                    Select & Research This Idea
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdeaGenerator;
