import React from 'react';
import { ShoppingBag, Shirt, Smartphone, Wrench, RefreshCw } from 'lucide-react';
import { UserProfile } from '../../types';
import { QuestionCard } from '../QuestionCard';

interface ConsumptionQuestionsProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export function ConsumptionQuestions({ profile, updateProfile }: ConsumptionQuestionsProps) {
  const clothingFrequencyOptions = [
    { value: 'chaque-mois', label: 'Chaque mois', emoji: '🛍️', impact: 'Très élevé', color: 'from-red-500 to-red-600' },
    { value: '2-3-mois', label: 'Tous les 2-3 mois', emoji: '👕', impact: 'Élevé', color: 'from-orange-500 to-red-500' },
    { value: '1-2-an', label: '1 à 2 fois/an', emoji: '👔', impact: 'Modéré', color: 'from-yellow-500 to-orange-500' },
    { value: 'jamais', label: 'Jamais', emoji: '♻️', impact: 'Minimal', color: 'from-emerald-500 to-green-600' }
  ];

  const frequencyOptions = [
    { value: 'jamais', label: 'Jamais', emoji: '🚫', description: 'Aucune réparation', color: 'from-red-500 to-red-600' },
    { value: 'parfois', label: 'Parfois', emoji: '🤔', description: 'Occasionnellement', color: 'from-orange-500 to-yellow-500' },
    { value: 'souvent', label: 'Souvent', emoji: '🔧', description: 'Régulièrement', color: 'from-green-500 to-emerald-500' },
    { value: 'toujours', label: 'Toujours', emoji: '🌟', description: 'Systématiquement', color: 'from-emerald-500 to-green-600' }
  ];

  return (
    <QuestionCard title="Votre consommation" icon={ShoppingBag}>
      <div className="space-y-8">
        {/* Clothing Frequency */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Shirt className="w-5 h-5 mr-3 text-slate-400" />
            Fréquence d'achat de vêtements neufs :
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {clothingFrequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ clothingFrequency: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.clothingFrequency === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-xs">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.clothingFrequency === option.value ? 'text-white/70' : 'text-slate-500'
                  }`}>
                    Impact: {option.impact}
                  </div>
                </div>
                {profile.clothingFrequency === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {profile.clothingFrequency === 'chaque-mois' && (
            <div className="mt-3 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <p className="text-red-300 text-sm">
                👕 La fast fashion représente 10% des émissions mondiales ! Un jean = 25kg CO₂
              </p>
            </div>
          )}
          {profile.clothingFrequency === 'jamais' && (
            <div className="mt-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 text-sm">
                ♻️ Excellent ! Vous privilégiez la seconde main ou gardez vos vêtements longtemps
              </p>
            </div>
          )}
        </div>

        {/* Electronics Purchase */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Smartphone className="w-5 h-5 mr-3 text-slate-400" />
            Achetez-vous des appareils électroniques neufs chaque année ?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updateProfile({ buyNewElectronics: true })}
              className={`group relative px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                profile.buyNewElectronics === true
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg border-2 border-white/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <div>Oui</div>
                <div className="text-xs opacity-80 mt-1">Renouvellement fréquent</div>
              </div>
              {profile.buyNewElectronics === true && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
            <button
              onClick={() => updateProfile({ buyNewElectronics: false })}
              className={`group relative px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                profile.buyNewElectronics === false
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg border-2 border-white/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">♻️</div>
                <div>Non</div>
                <div className="text-xs opacity-80 mt-1">Usage prolongé</div>
              </div>
              {profile.buyNewElectronics === false && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          </div>
          {profile.buyNewElectronics === false && (
            <div className="mt-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 text-sm">
                📱 Parfait ! Garder son smartphone 4 ans au lieu de 2 divise son impact par 2
              </p>
            </div>
          )}
        </div>

        {/* Repair Frequency */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-3 text-slate-400" />
            Réparez-vous vos objets cassés ?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {frequencyOptions.slice(0, 3).map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ repairFrequency: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.repairFrequency === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-sm">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.repairFrequency === option.value ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
                {profile.repairFrequency === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {profile.repairFrequency === 'souvent' && (
            <div className="mt-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 text-sm">
                🔧 Bravo ! Réparer évite 70kg CO₂ par smartphone sauvé de la poubelle
              </p>
            </div>
          )}
        </div>

        {/* Second Hand Frequency */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <RefreshCw className="w-5 h-5 mr-3 text-slate-400" />
            Achetez-vous des produits d'occasion ?
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ secondHandFrequency: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.secondHandFrequency === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-xs">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.secondHandFrequency === option.value ? 'text-white/70' : 'text-slate-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
                {profile.secondHandFrequency === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {profile.secondHandFrequency === 'toujours' && (
            <div className="mt-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 text-sm">
                ♻️ Champion ! L'occasion divise l'impact environnemental par 10
              </p>
            </div>
          )}
        </div>

        {/* Bilan consommation */}
        {(profile.clothingFrequency || profile.buyNewElectronics !== null || profile.repairFrequency || profile.secondHandFrequency) && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🛍️</div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Votre profil consommation</h4>
                <div className="space-y-1 text-purple-300 text-sm">
                  {profile.clothingFrequency === 'jamais' && 
                    <p>👕 Excellent ! Vous évitez la fast fashion</p>}
                  {profile.buyNewElectronics === false && 
                    <p>📱 Bravo ! Vous gardez vos appareils longtemps</p>}
                  {profile.repairFrequency === 'souvent' && 
                    <p>🔧 Super ! Vous êtes un(e) réparateur/trice</p>}
                  {profile.secondHandFrequency === 'toujours' && 
                    <p>♻️ Parfait ! Champion de la seconde main</p>}
                </div>
                <div className="mt-3 text-xs text-purple-500">
                  💡 La consommation représente 15% de notre empreinte carbone
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </QuestionCard>
  );
}