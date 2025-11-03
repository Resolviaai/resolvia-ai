
import { AppStep } from './types';

export const STEPS = [
    { id: AppStep.IDEA, name: 'Idea Generation', icon: 'fa-solid fa-lightbulb' },
    { id: AppStep.RESEARCH, name: 'Market Research', icon: 'fa-solid fa-magnifying-glass' },
    { id: AppStep.CODE, name: 'Code Generation', icon: 'fa-solid fa-code' },
    { id: AppStep.MARKETING, name: 'Marketing Suite', icon: 'fa-solid fa-bullhorn' },
    { id: AppStep.DONE, name: 'Launch!', icon: 'fa-solid fa-rocket' },
];

export const IDEA_QUESTIONS = [
    "What industries or hobbies are you passionate about?",
    "What are some repetitive tasks you do at work or in your personal life that could be automated?",
    "What's a problem you've recently faced that you wish there was a software solution for?",
    "Which existing software products do you use that you feel are too expensive, complex, or lacking in features?",
    "Are there any niche communities or groups you're a part of that have unmet needs?",
];
