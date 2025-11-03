
import React, { useState } from 'react';
import { SaaSIdea, MarketingAssets } from '../types';
import { generateSocialPost, generatePoster, generateVideoAd } from '../services/geminiService';
import LoadingSpinner from './common/LoadingSpinner';
import Card from './common/Card';

interface MarketingSuiteProps {
    idea: SaaSIdea;
    onMarketingGenerated: (assets: MarketingAssets) => void;
}

// FIX: Create a specific type for asset keys to prevent implicit symbol conversion errors.
type AssetType = 'tweet' | 'linkedin' | 'poster' | 'video';

const MarketingSuite: React.FC<MarketingSuiteProps> = ({ idea, onMarketingGenerated }) => {
    const [assets, setAssets] = useState<Partial<MarketingAssets>>({});
    const [loadingStates, setLoadingStates] = useState({
        tweet: false,
        linkedin: false,
        poster: false,
        video: false,
    });
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (assetType: AssetType) => {
        setLoadingStates(prev => ({ ...prev, [assetType]: true }));
        setError(null);
        try {
            let result: string | undefined;
            switch (assetType) {
                case 'tweet':
                    result = await generateSocialPost(idea, 'Twitter');
                    setAssets(prev => ({ ...prev, tweet: result }));
                    break;
                case 'linkedin':
                    result = await generateSocialPost(idea, 'LinkedIn');
                    setAssets(prev => ({ ...prev, linkedinPost: result }));
                    break;
                case 'poster':
                    result = await generatePoster(idea);
                    setAssets(prev => ({ ...prev, posterUrl: result }));
                    break;
                case 'video':
                    result = await generateVideoAd(idea);
                    setAssets(prev => ({ ...prev, videoAdUrl: result }));
                    break;
            }
        } catch (err: any) {
            console.error(`Error generating ${assetType}:`, err);
             if (err.message.includes("Requested entity was not found.")) {
                setError(`API Key not found or invalid. Please re-select your key. Note: Billing must be enabled for your project at ai.google.dev/gemini-api/docs/billing`);
            } else {
                setError(`Failed to generate ${assetType}. Please try again.`);
            }
        } finally {
            setLoadingStates(prev => ({ ...prev, [assetType]: false }));
        }
    };
    
    const allAssetsGenerated = assets.tweet && assets.linkedinPost && assets.posterUrl && assets.videoAdUrl;

    return (
        <Card>
            <h2 className="text-3xl font-bold mb-4">AI Marketing Suite</h2>
            <p className="text-text-secondary mb-6">Generate your launch marketing materials with a click of a button.</p>

            {error && (
                <div className="glass-strong p-4 rounded-xl border border-red-500/50 text-red-400 mb-6" role="alert">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Social Posts */}
                <div className="space-y-6">
                    <MarketingAsset title="Twitter Post" type="tweet" loading={loadingStates.tweet} onGenerate={handleGenerate}>
                        {assets.tweet && <p className="whitespace-pre-wrap text-sm text-text-secondary">{assets.tweet}</p>}
                    </MarketingAsset>
                    <MarketingAsset title="LinkedIn Post" type="linkedin" loading={loadingStates.linkedin} onGenerate={handleGenerate}>
                        {assets.linkedinPost && <p className="whitespace-pre-wrap text-sm text-text-secondary">{assets.linkedinPost}</p>}
                    </MarketingAsset>
                </div>
                {/* Visuals */}
                <div className="space-y-6">
                    <MarketingAsset title="Promotional Poster" type="poster" loading={loadingStates.poster} onGenerate={handleGenerate}>
                        {assets.posterUrl && <img src={assets.posterUrl} alt="Generated Poster" className="rounded-lg w-full h-auto" />}
                    </MarketingAsset>
                    <MarketingAsset title="Video Ad (5s)" type="video" loading={loadingStates.video} onGenerate={handleGenerate}>
                        {assets.videoAdUrl && <video src={assets.videoAdUrl} controls className="rounded-lg w-full"></video>}
                    </MarketingAsset>
                </div>
            </div>
             <div className="text-center mt-10">
                <button
                    onClick={() => onMarketingGenerated(assets as MarketingAssets)}
                    disabled={!allAssetsGenerated}
                    className="bg-gradient-to-r from-secondary to-secondary-dark text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover-lift w-full sm:w-auto shadow-lg"
                >
                    <i className="fas fa-check-circle mr-2"></i>
                    Complete & Finish
                </button>
            </div>
        </Card>
    );
};


interface MarketingAssetProps {
    title: string;
    type: AssetType;
    loading: boolean;
    onGenerate: (type: AssetType) => void;
    children: React.ReactNode;
}

const MarketingAsset: React.FC<MarketingAssetProps> = ({ title, type, loading, onGenerate, children }) => {
    return (
        <div className="glass p-4 rounded-xl border border-border/50">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">{title}</h3>
                {!children && (
                    <button 
                        onClick={() => onGenerate(type)} 
                        disabled={loading} 
                        className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
                    >
                        <i className="fas fa-magic mr-1"></i>
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                )}
            </div>
            {loading && (
                <div className="flex justify-center items-center h-24">
                    <LoadingSpinner />
                </div>
            )}
            <div>{children}</div>
        </div>
    );
};

export default MarketingSuite;
