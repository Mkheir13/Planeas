import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full bg-slate-700/50 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center text-slate-400 text-sm font-medium">
        {Math.round(progress)}% complété
      </div>
    </div>
  );
}