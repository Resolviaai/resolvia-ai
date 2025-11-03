
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { SaaSIdea, ResearchData, GeneratedCode } from '../types';

// FIX: Define a named interface for aistudio to resolve declaration conflicts.
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    aistudio: AIStudio;
  }
}

// Do not create the ai instance here, create it on demand.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getAiInstance = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateSaaSIdeas = async (answers: string[]): Promise<SaaSIdea[]> => {
    const ai = getAiInstance();
    const prompt = `Based on the following user answers, generate 3 diverse and viable SaaS ideas. For each idea, provide a name, a short description, and the target audience.
    Answers:
    ${answers.map((a, i) => `${i + 1}. ${a}`).join('\n')}
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        targetAudience: { type: Type.STRING },
                    },
                    required: ["name", "description", "targetAudience"],
                },
            },
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
};

export const researchIdea = async (idea: SaaSIdea): Promise<ResearchData> => {
    const ai = getAiInstance();
    const prompt = `Conduct market research for the following SaaS idea:
    Name: ${idea.name}
    Description: ${idea.description}
    Target Audience: ${idea.targetAudience}

    Provide a summary of the market, a list of potential competitors, and suggest 3 monetization strategies.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    // We can't guarantee JSON, so we'll parse it manually. This is a simplification.
    const text = response.text;
    const competitors = text.match(/Competitors:\s*\n(- .+\n)+/gm)?.[0].split('\n').filter(s => s.startsWith('- ')).map(s => s.substring(2)) || [];
    const monetization = text.match(/Monetization Strategies:\s*\n(- .+\n)+/gm)?.[0].split('\n').filter(s => s.startsWith('- ')).map(s => s.substring(2)) || [];
    const summary = text.split("Competitors:")[0];

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { summary, competitors, monetization, sources };
};

export const generateCode = async (idea: SaaSIdea): Promise<GeneratedCode> => {
    const ai = getAiInstance();
    const prompt = `Generate boilerplate code for a SaaS application called "${idea.name}".
    Description: ${idea.description}

    Generate a single-file React+Tailwind frontend component for the main landing page.
    Then, generate a simple single-file Node.js/Express backend with a placeholder '/' route that returns a welcome message.
    Provide only the code, separated by a specific delimiter '---BACKEND---'.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            temperature: 0.2
        }
    });

    const codeText = response.text;
    const parts = codeText.split('---BACKEND---');
    const frontend = parts[0]?.replace(/```(tsx|jsx|javascript)?/g, '').trim() || "// Frontend code generation failed.";
    const backend = parts[1]?.replace(/```(javascript|js)?/g, '').trim() || "// Backend code generation failed.";

    return { frontend, backend };
};

export const generateSocialPost = async (idea: SaaSIdea, platform: 'Twitter' | 'LinkedIn'): Promise<string> => {
    const ai = getAiInstance();
    const prompt = `Write a compelling ${platform} post to announce a new SaaS product.
    Name: ${idea.name}
    Description: ${idea.description}
    Target Audience: ${idea.targetAudience}
    The post should be engaging and include relevant hashtags.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
};

export const generatePoster = async (idea: SaaSIdea): Promise<string> => {
    const ai = getAiInstance();
    const prompt = `A vibrant and professional promotional poster for a new software product called "${idea.name}". It's for ${idea.targetAudience}. The poster should be modern, clean, and visually appealing, incorporating abstract shapes and a clear, readable font.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { responseModalities: [Modality.IMAGE] },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return `data:image/jpeg;base64,${part.inlineData.data}`;
        }
    }
    throw new Error("Image generation failed.");
};


export const generateVideoAd = async (idea: SaaSIdea): Promise<string> => {
    // Veo requires user-selected API key
    const hasApiKey = await window.aistudio.hasSelectedApiKey();
    if (!hasApiKey) {
        await window.aistudio.openSelectKey();
    }
    const ai = getAiInstance();

    const prompt = `A short, dynamic 5-second video ad for a new SaaS product called "${idea.name}". Show abstract representations of productivity and success. Fast-paced and modern.`;

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
        }
    });

    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed to produce a link.");

    // The API key is appended for fetching.
    return `${downloadLink}&key=${process.env.API_KEY}`;
};
