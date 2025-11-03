
export enum AppStep {
    IDEA = 'IDEA',
    RESEARCH = 'RESEARCH',
    CODE = 'CODE',
    MARKETING = 'MARKETING',
    DONE = 'DONE',
}

export interface SaaSIdea {
    name: string;
    description: string;
    targetAudience: string;
}

export interface GroundingChunk {
    web?: {
        uri?: string;
        title?: string;
    };
}

export interface ResearchData {
    summary: string;
    competitors: string[];
    monetization: string[];
    sources: GroundingChunk[];
}

export interface GeneratedCode {
    frontend: string;
    backend: string;
}

export interface MarketingAssets {
    tweet: string;
    linkedinPost: string;
    posterUrl: string;
    videoAdUrl: string;
}
