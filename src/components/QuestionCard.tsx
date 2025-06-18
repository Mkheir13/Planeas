import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface QuestionCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function QuestionCard({ title, icon: Icon, children, className = '' }: QuestionCardProps) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 shadow-xl ${className}`}>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
}