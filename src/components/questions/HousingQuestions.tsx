import React from 'react';
import { Home, Users, Maximize, Flame, Shield } from 'lucide-react';
import { UserProfile } from '../../types';
import { QuestionCard } from '../QuestionCard';

interface HousingQuestionsProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export function HousingQuestions({ profile, updateProfile }: HousingQuestionsProps) {
  const heatingOptions = [
    { value: 'electricite', label: 'Électricité', emoji: '⚡', impact: 'Moyen', color: 'from-yellow-500 to-orange-500' },
    { value: 'gaz', label: 'Gaz', emoji: '🔥', impact: 'Élevé', color: 'from-orange-500 to-red-500' },
    { value: 'fioul', label: 'Fioul', emoji: '🛢️', impact: 'Très élevé', color: 'from-red-500 to-red-600' },
    { value: 'bois', label: 'Bois', emoji: '🪵', impact: 'Faible', color: 'from-green-500 to-emerald-500' },
    { value: 'pompe-chaleur', label: 'Pompe à chaleur', emoji: '🌡️', impact: 'Très faible', color: 'from-emerald-500 to-green-600' },
    { value: 'aucun', label: 'Aucun chauffage', emoji: '❄️', impact: 'Nul', color: 'from-blue-500 to-cyan-500' }
  ];

  const insulationOptions = [
    { value: 'oui', label: 'Oui', emoji: '🏠', description: 'Bien isolé', color: 'from-emerald-500 to-green-600' },
    { value: 'non', label: 'Non', emoji: '🌬️', description: 'Peu isolé', color: 'from-red-500 to-pink-500' },
    { value: 'ne-sais-pas', label: 'Je ne sais pas', emoji: '🤔', description: 'Incertain', color: 'from-slate-500 to-slate-600' }
  ];

  return (
    <QuestionCard title="Votre logement" icon={Home}>
      <div className="space-y-8">
        {/* Household Size */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-3 text-slate-400" />
            Combien de personnes vivent dans votre logement ?
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="10"
              value={profile.householdSize || ''}
              onChange={(e) => updateProfile({ householdSize: parseInt(e.target.value) || null })}
              className="w-full px-6 py-4 text-lg bg-slate-800/50 border-2 border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-white placeholder-slate-400"
              placeholder="Nombre de personnes"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">
              👥
            </div>
          </div>
          {profile.householdSize && (
            <div className="mt-2 text-sm text-blue-400 flex items-center">
              <span className="mr-1">💡</span>
              {profile.householdSize === 1 ? "Vivre seul augmente l'empreinte par personne" : 
               profile.householdSize <= 3 ? "Taille idéale pour partager les ressources" : 
               "Grande famille = partage optimisé"}
            </div>
          )}
        </div>

        {/* Home Area */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Maximize className="w-5 h-5 mr-3 text-slate-400" />
            Surface de votre logement (m²) :
          </label>
          <div className="relative">
            <input
              type="number"
              min="10"
              max="1000"
              value={profile.homeArea || ''}
              onChange={(e) => updateProfile({ homeArea: parseInt(e.target.value) || null })}
              className="w-full px-6 py-4 text-lg bg-slate-800/50 border-2 border-slate-700/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 text-white placeholder-slate-400"
              placeholder="Surface en m²"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">
              📐
            </div>
          </div>
          {profile.homeArea && profile.householdSize && (
            <div className="mt-2 text-sm text-purple-400 flex items-center">
              <span className="mr-1">📊</span>
              {Math.round(profile.homeArea / profile.householdSize)}m² par personne
              {profile.homeArea / profile.householdSize < 30 ? " (compact)" : 
               profile.homeArea / profile.householdSize > 50 ? " (spacieux)" : " (équilibré)"}
            </div>
          )}
        </div>

        {/* Heating Type */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Flame className="w-5 h-5 mr-3 text-slate-400" />
            Type de chauffage principal :
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {heatingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ heatingType: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.heatingType === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-sm">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.heatingType === option.value ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    Impact: {option.impact}
                  </div>
                </div>
                {profile.heatingType === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Home Insulation */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-3 text-slate-400" />
            Votre logement est-il bien isolé ?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {insulationOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ homeInsulation: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.homeInsulation === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-sm">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.homeInsulation === option.value ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
                {profile.homeInsulation === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Conseil personnalisé */}
        {profile.heatingType && profile.homeInsulation && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="font-semibold text-emerald-400 mb-2">Conseil personnalisé</h4>
                <p className="text-emerald-300 text-sm">
                  {profile.heatingType === 'fioul' && "Le fioul émet 3x plus de CO₂ que l'électricité ! Pensez à la transition énergétique."}
                  {profile.heatingType === 'pompe-chaleur' && "Excellent choix ! Les pompes à chaleur sont très efficaces."}
                  {profile.heatingType === 'bois' && "Le bois est neutre en carbone, mais attention à la qualité de l'air."}
                  {profile.heatingType === 'electricite' && "En France, l'électricité est peu carbonée grâce au nucléaire."}
                  {profile.heatingType === 'gaz' && "Le gaz émet moins que le fioul mais plus que l'électricité française."}
                  {profile.homeInsulation === 'non' && " Une bonne isolation peut réduire votre consommation de 60% !"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </QuestionCard>
  );
}