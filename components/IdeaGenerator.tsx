
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
        <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-lg">
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
                                className="w-full bg-background border border-border rounded-md p-2 focus:ring-primary focus:border-primary transition"
                                placeholder="Your thoughts..."
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 disabled:bg-gray-500 transition-colors duration-300 w-full sm:w-auto"
                    >
                        {isLoading ? <LoadingSpinner text="Generating Ideas..." /> : 'Generate Ideas'}
                    </button>
                </div>
            </form>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            {generatedIdeas.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-xl font-bold text-center mb-6">Here are some ideas for you:</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {generatedIdeas.map((idea, index) => (
                            <div key={index} className="bg-background p-6 rounded-lg border border-border flex flex-col">
                                <h4 className="text-lg font-bold text-secondary">{idea.name}</h4>
                                <p className="text-text-secondary mt-2 flex-grow">{idea.description}</p>
                                <p className="text-sm text-gray-400 mt-4"><strong className="text-text-primary">Target:</strong> {idea.targetAudience}</p>
                                <button
                                    onClick={() => onIdeaSelected(idea)}
                                    className="mt-6 bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors duration-300 w-full"
                                >
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
