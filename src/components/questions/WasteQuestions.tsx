import React from 'react';
import { Trash2, Recycle, Package, Leaf } from 'lucide-react';
import { UserProfile } from '../../types';
import { QuestionCard } from '../QuestionCard';

interface WasteQuestionsProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export function WasteQuestions({ profile, updateProfile }: WasteQuestionsProps) {
  const sortOptions = [
    { value: 'oui', label: 'Oui', emoji: '♻️', description: 'Tri complet', color: 'from-emerald-500 to-green-600' },
    { value: 'non', label: 'Non', emoji: '🗑️', description: 'Aucun tri', color: 'from-red-500 to-red-600' },
    { value: 'partiellement', label: 'Partiellement', emoji: '🤔', description: 'Tri partiel', color: 'from-yellow-500 to-orange-500' }
  ];

  const frequencyOptions = [
    { value: 'jamais', label: 'Jamais', emoji: '🚫', description: 'Aucun achat', color: 'from-red-500 to-red-600' },
    { value: 'parfois', label: 'Parfois', emoji: '🤔', description: 'Occasionnellement', color: 'from-orange-500 to-yellow-500' },
    { value: 'souvent', label: 'Souvent', emoji: '👍', description: 'Régulièrement', color: 'from-yellow-500 to-green-500' },
    { value: 'toujours', label: 'Toujours', emoji: '🌟', description: 'Systématiquement', color: 'from-emerald-500 to-green-600' }
  ];

  const getTrashImpact = (bags: number) => {
    if (bags <= 1) return { message: "🌟 Minimal ! Vous êtes un champion du zéro déchet", color: "text-green-400" };
    if (bags <= 2) return { message: "👍 Correct ! Impact modéré", color: "text-yellow-400" };
    if (bags <= 4) return { message: "⚠️ Élevé ! Pensez à réduire", color: "text-orange-400" };
    return { message: "🚨 Très élevé ! Action urgente nécessaire", color: "text-red-400" };
  };

  return (
    <QuestionCard title="Vos déchets" icon={Trash2}>
      <div className="space-y-8">
        {/* Waste Sorting */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Recycle className="w-5 h-5 mr-3 text-slate-400" />
            Triez-vous vos déchets ?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ sortWaste: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.sortWaste === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-sm">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.sortWaste === option.value ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
                {profile.sortWaste === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {profile.sortWaste === 'oui' && (
            <div className="mt-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 text-sm">
                ♻️ Excellent ! Le tri permet de recycler 70% des déchets et évite 1,5 tonnes CO₂/an
              </p>
            </div>
          )}
        </div>

        {/* Trash Bags Per Week */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Trash2 className="w-5 h-5 mr-3 text-slate-400" />
            Sacs poubelles par semaine (hors tri) :
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="20"
              value={profile.trashBagsPerWeek || ''}
              onChange={(e) => updateProfile({ trashBagsPerWeek: parseInt(e.target.value) || null })}
              className="w-full px-6 py-4 text-lg bg-slate-800/50 border-2 border-slate-700/50 rounded-lg focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 text-white placeholder-slate-400"
              placeholder="Nombre de sacs par semaine"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">
              🗑️
            </div>
          </div>
          {profile.trashBagsPerWeek !== null && (
            <div className="mt-2 text-sm flex items-center">
              <span className="mr-1">📊</span>
              <span className={`font-medium ${getTrashImpact(profile.trashBagsPerWeek).color}`}>
                {getTrashImpact(profile.trashBagsPerWeek).message}
              </span>
            </div>
          )}
          
          {/* Visualisation impact déchets */}
          {profile.trashBagsPerWeek !== null && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>🌟 Zéro déchet</span>
                <span>👍 Modéré</span>
                <span>🚨 Excessif</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    profile.trashBagsPerWeek <= 1 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    profile.trashBagsPerWeek <= 3 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}
                  style={{ width: `${Math.min((profile.trashBagsPerWeek / 10) * 100, 100)}%` }}
                />
              </div>
              <div className="text-xs text-slate-400 mt-2">
                💡 1 sac/semaine = 100kg CO₂/an économisés vs moyenne française
              </div>
            </div>
          )}
        </div>

        {/* Low Packaging Frequency */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Package className="w-5 h-5 mr-3 text-slate-400" />
            Achetez-vous sans emballages ?
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ lowPackagingFrequency: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.lowPackagingFrequency === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-xs">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.lowPackagingFrequency === option.value ? 'text-white/70' : 'text-slate-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
                {profile.lowPackagingFrequency === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {profile.lowPackagingFrequency === 'toujours' && (
            <div className="mt-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 text-sm">
                📦 Parfait ! Les emballages représentent 30% de nos déchets
              </p>
            </div>
          )}
        </div>

        {/* Bilan déchets */}
        {(profile.sortWaste || profile.trashBagsPerWeek !== null || profile.lowPackagingFrequency) && (
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">♻️</div>
              <div>
                <h4 className="font-semibold text-teal-400 mb-2">Votre profil déchets</h4>
                <div className="space-y-1 text-teal-300 text-sm">
                  {profile.sortWaste === 'oui' && 
                    <p>♻️ Excellent ! Vous triez correctement vos déchets</p>}
                  {profile.trashBagsPerWeek !== null && profile.trashBagsPerWeek <= 1 && 
                    <p>🌟 Bravo ! Vous produisez très peu de déchets</p>}
                  {profile.lowPackagingFrequency === 'toujours' && 
                    <p>📦 Super ! Vous évitez les emballages inutiles</p>}
                </div>
                <div className="mt-3 text-xs text-teal-500">
                  💡 Les déchets représentent 5% de notre empreinte carbone
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </QuestionCard>
  );
}