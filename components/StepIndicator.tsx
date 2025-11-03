
import React from 'react';
import { AppStep } from '../types';
import { STEPS } from '../constants';

interface StepIndicatorProps {
    currentStep: AppStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
    const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);

    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {STEPS.map((step, stepIdx) => (
                    <li key={step.name} className={`relative ${stepIdx !== STEPS.length - 1 ? 'flex-1' : ''}`}>
                        {stepIdx <= currentStepIndex ? (
                            <div className="flex items-center font-semibold">
                                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-indigo-800">
                                    <i className={`${step.icon} text-white`}></i>
                                </span>
                                <span className="ml-4 hidden sm:block text-sm font-medium text-text-primary">{step.name}</span>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-border">
                                    <i className={`${step.icon} text-text-secondary`}></i>
                                </span>
                                <span className="ml-4 hidden sm:block text-sm font-medium text-text-secondary">{step.name}</span>
                            </div>
                        )}

                        {stepIdx < STEPS.length - 1 && (
                            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-full ${stepIdx < currentStepIndex ? 'bg-primary' : 'bg-border'}`} aria-hidden="true" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default StepIndicator;
