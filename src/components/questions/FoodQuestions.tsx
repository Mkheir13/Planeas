import React from 'react';
import { Utensils, Beef, Carrot, Leaf, Trash2 } from 'lucide-react';
import { UserProfile } from '../../types';
import { QuestionCard } from '../QuestionCard';

interface FoodQuestionsProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export function FoodQuestions({ profile, updateProfile }: FoodQuestionsProps) {
  const frequencyOptions = [
    { value: 'jamais', label: 'Jamais', emoji: '🚫', description: 'Aucun achat', color: 'from-red-500 to-red-600' },
    { value: 'parfois', label: 'Parfois', emoji: '🤔', description: 'Occasionnellement', color: 'from-orange-500 to-yellow-500' },
    { value: 'souvent', label: 'Souvent', emoji: '👍', description: 'Régulièrement', color: 'from-yellow-500 to-green-500' },
    { value: 'toujours', label: 'Toujours', emoji: '🌟', description: 'Systématiquement', color: 'from-emerald-500 to-green-600' }
  ];

  const wasteOptions = [
    { value: 'jamais', label: 'Jamais', emoji: '🌟', description: 'Zéro gaspillage', color: 'from-emerald-500 to-green-600' },
    { value: 'parfois', label: 'Parfois', emoji: '😐', description: 'Occasionnellement', color: 'from-yellow-500 to-orange-500' },
    { value: 'souvent', label: 'Souvent', emoji: '😔', description: 'Fréquemment', color: 'from-orange-500 to-red-500' }
  ];

  const getMeatImpactMessage = (meals: number) => {
    if (meals === 0) return "🌱 Végétarien ! -1,5 tonnes CO₂/an";
    if (meals <= 3) return "🥗 Flexitarien ! Impact modéré";
    if (meals <= 7) return "🥩 Consommation moyenne";
    if (meals <= 14) return "🍖 Consommation élevée";
    return "🥩 Très gros consommateur";
  };

  return (
    <QuestionCard title="Votre alimentation" icon={Utensils}>
      <div className="space-y-8">
        {/* Meat Meals Per Week */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Beef className="w-5 h-5 mr-3 text-slate-400" />
            Nombre de repas avec viande par semaine :
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="21"
              value={profile.meatMealsPerWeek || ''}
              onChange={(e) => updateProfile({ meatMealsPerWeek: parseInt(e.target.value) || null })}
              className="w-full px-6 py-4 text-lg bg-slate-800/50 border-2 border-slate-700/50 rounded-lg focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 text-white placeholder-slate-400"
              placeholder="Nombre de repas avec viande par semaine"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">
              🥩
            </div>
          </div>
          {profile.meatMealsPerWeek !== null && (
            <div className="mt-2 text-sm flex items-center">
              <span className="mr-1">📊</span>
              <span className={`font-medium ${
                profile.meatMealsPerWeek <= 3 ? 'text-green-400' : 
                profile.meatMealsPerWeek <= 7 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {getMeatImpactMessage(profile.meatMealsPerWeek)}
              </span>
            </div>
          )}
          
          {/* Slider visuel pour la viande */}
          {profile.meatMealsPerWeek !== null && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>🌱 Végétarien</span>
                <span>🥗 Flexitarien</span>
                <span>🥩 Omnivore</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    profile.meatMealsPerWeek <= 3 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    profile.meatMealsPerWeek <= 7 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}
                  style={{ width: `${Math.min((profile.meatMealsPerWeek / 21) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Daily Animal Products */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Carrot className="w-5 h-5 mr-3 text-slate-400" />
            Produits d'origine animale tous les jours ?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updateProfile({ dailyAnimalProducts: true })}
              className={`group relative px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                profile.dailyAnimalProducts === true
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg border-2 border-white/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🥛</div>
                <div>Oui</div>
                <div className="text-xs opacity-80 mt-1">Lait, œufs, fromage...</div>
              </div>
              {profile.dailyAnimalProducts === true && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
            <button
              onClick={() => updateProfile({ dailyAnimalProducts: false })}
              className={`group relative px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                profile.dailyAnimalProducts === false
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg border-2 border-white/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🌱</div>
                <div>Non</div>
                <div className="text-xs opacity-80 mt-1">Alimentation végétale</div>
              </div>
              {profile.dailyAnimalProducts === false && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Bio/Local Frequency */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Leaf className="w-5 h-5 mr-3 text-slate-400" />
            Achetez-vous bio ou local ?
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ bioLocalFrequency: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.bioLocalFrequency === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-xs">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.bioLocalFrequency === option.value ? 'text-white/70' : 'text-slate-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
                {profile.bioLocalFrequency === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Food Waste */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Trash2 className="w-5 h-5 mr-3 text-slate-400" />
            Jetez-vous de la nourriture ?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {wasteOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ foodWasteFrequency: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.foodWasteFrequency === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-sm">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.foodWasteFrequency === option.value ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
                {profile.foodWasteFrequency === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {profile.foodWasteFrequency === 'jamais' && (
            <div className="mt-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 text-sm">
                🌟 Excellent ! Le gaspillage alimentaire représente 8% des émissions mondiales de GES.
              </p>
            </div>
          )}
        </div>

        {/* Bilan alimentaire */}
        {(profile.meatMealsPerWeek !== null || profile.bioLocalFrequency || profile.foodWasteFrequency) && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🍽️</div>
              <div>
                <h4 className="font-semibold text-emerald-400 mb-2">Votre profil alimentaire</h4>
                <div className="space-y-1 text-emerald-300 text-sm">
                  {profile.meatMealsPerWeek !== null && profile.meatMealsPerWeek <= 3 && 
                    <p>🌱 Bravo ! Votre consommation de viande est très raisonnable</p>}
                  {profile.bioLocalFrequency === 'toujours' && 
                    <p>🌿 Excellent ! Bio et local réduisent l'impact de 30%</p>}
                  {profile.foodWasteFrequency === 'jamais' && 
                    <p>♻️ Parfait ! Zéro gaspillage = -500kg CO₂/an</p>}
                  {profile.dailyAnimalProducts === false && 
                    <p>🥗 Super ! L'alimentation végétale divise l'impact par 2</p>}
                </div>
                <div className="mt-3 text-xs text-emerald-500">
                  💡 L'alimentation représente 25% de notre empreinte carbone
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </QuestionCard>
  );
}