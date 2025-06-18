import React from 'react';
import { User, Heart, Calendar } from 'lucide-react';
import { UserProfile } from '../../types';
import { QuestionCard } from '../QuestionCard';

interface IdentityQuestionsProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export function IdentityQuestions({ profile, updateProfile }: IdentityQuestionsProps) {
  return (
    <QuestionCard title="Informations personnelles" icon={User}>
      <div className="space-y-8">
        {/* Gender */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-3 text-slate-400" />
            Vous êtes :
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'homme', label: 'Homme', emoji: '👨' },
              { value: 'femme', label: 'Femme', emoji: '👩' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ gender: option.value as 'homme' | 'femme' })}
                className={`group relative px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                  profile.gender === option.value
                    ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg border-2 border-slate-500'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-xl">{option.emoji}</span>
                  <span>{option.label}</span>
                </div>
                {profile.gender === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-3 text-slate-400" />
            Votre âge :
          </label>
          <div className="relative">
            <input
              type="number"
              min="16"
              max="100"
              value={profile.age || ''}
              onChange={(e) => updateProfile({ age: parseInt(e.target.value) || null })}
              className="w-full px-6 py-4 text-lg bg-slate-800/50 border-2 border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-white placeholder-slate-400"
              placeholder="Votre âge"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">
              🎂
            </div>
          </div>
          {profile.age && (
            <div className="mt-2 text-sm text-emerald-400 flex items-center">
              <span className="mr-1">✓</span>
              Information enregistrée
            </div>
          )}
        </div>

        {/* Relationship Status */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-3 text-slate-400" />
            Situation familiale :
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'celibataire', label: 'Célibataire', emoji: '🙋‍♀️', description: 'Vie indépendante' },
              { value: 'couple', label: 'En couple', emoji: '💑', description: 'Partage des ressources' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ relationship: option.value as 'celibataire' | 'couple' })}
                className={`group relative px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                  profile.relationship === option.value
                    ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg border-2 border-slate-500'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs opacity-80 mt-1">{option.description}</div>
                </div>
                {profile.relationship === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Confirmation */}
        {(profile.gender || profile.age || profile.relationship) && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✓</div>
              <div>
                <h4 className="font-semibold text-emerald-400">Informations enregistrées</h4>
                <p className="text-emerald-300 text-sm">
                  Ces données nous permettent de personnaliser votre évaluation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </QuestionCard>
  );
}