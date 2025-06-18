import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

interface DidYouKnowCardProps {
  question: string;
  answer: string;
  icon: string;
}

export function DidYouKnowCard({ question, answer, icon }: DidYouKnowCardProps) {
  const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;

  return (
    <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-indigo-500/30">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-indigo-100">{question}</h3>
          <p className="text-indigo-200 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}