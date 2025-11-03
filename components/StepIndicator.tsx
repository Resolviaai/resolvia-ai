
import React from 'react';
import { AppStep } from '../types';
import { STEPS } from '../constants';

interface StepIndicatorProps {
    currentStep: AppStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
    const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);

    return (
        <nav aria-label="Progress" className="glass p-4 rounded-xl">
            <ol role="list" className="flex items-center justify-between">
                {STEPS.map((step, stepIdx) => (
                    <li key={step.name} className={`relative ${stepIdx !== STEPS.length - 1 ? 'flex-1' : ''}`}>
                        <div className="flex flex-col items-center">
                            {stepIdx <= currentStepIndex ? (
                                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg transition-all hover:scale-110">
                                    <i className={`${step.icon} text-white`}></i>
                                </span>
                            ) : (
                                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl glass border border-border/50">
                                    <i className={`${step.icon} text-text-secondary`}></i>
                                </span>
                            )}
                            <span className={`mt-2 text-xs font-medium text-center ${stepIdx <= currentStepIndex ? 'text-primary' : 'text-text-secondary'}`}>
                                {step.name}
                            </span>
                        </div>

                        {stepIdx < STEPS.length - 1 && (
                            <div className="absolute left-[60%] right-[-40%] top-6 h-0.5">
                                <div className={`h-full transition-all duration-500 ${stepIdx < currentStepIndex ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-border/50'}`} />
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default StepIndicator;
