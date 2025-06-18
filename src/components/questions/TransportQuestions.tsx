import React from 'react';
import { Car, Plane, Train, Bike, Ship } from 'lucide-react';
import { UserProfile } from '../../types';
import { QuestionCard } from '../QuestionCard';

interface TransportQuestionsProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export function TransportQuestions({ profile, updateProfile }: TransportQuestionsProps) {
  const carTypes = [
    { value: 'essence', label: 'Essence', emoji: '⛽', impact: '120g CO₂/km', color: 'from-orange-500 to-red-500' },
    { value: 'diesel', label: 'Diesel', emoji: '🚗', impact: '130g CO₂/km', color: 'from-red-500 to-red-600' },
    { value: 'electrique', label: 'Électrique', emoji: '🔋', impact: '25g CO₂/km', color: 'from-emerald-500 to-green-600' }
  ];

  const frequencyOptions = [
    { value: 'jamais', label: 'Jamais', emoji: '🚫', color: 'from-emerald-500 to-green-600' },
    { value: '1-2', label: '1 à 2 fois', emoji: '✈️', color: 'from-yellow-500 to-orange-500' },
    { value: '3-5', label: '3 à 5 fois', emoji: '🌍', color: 'from-orange-500 to-red-500' },
    { value: 'plus-5', label: 'Plus de 5 fois', emoji: '🚀', color: 'from-red-500 to-red-600' }
  ];

  const usageOptions = [
    { value: 'jamais', label: 'Jamais', emoji: '🚫', description: 'Tout en voiture', color: 'from-red-500 to-red-600' },
    { value: 'parfois', label: 'Parfois', emoji: '🚌', description: 'Occasionnellement', color: 'from-orange-500 to-yellow-500' },
    { value: 'souvent', label: 'Souvent', emoji: '🚊', description: 'Régulièrement', color: 'from-yellow-500 to-green-500' },
    { value: 'toujours', label: 'Toujours', emoji: '🚲', description: 'Priorité aux transports doux', color: 'from-emerald-500 to-green-600' }
  ];

  return (
    <QuestionCard title="Vos déplacements" icon={Car}>
      <div className="space-y-8">
        {/* Car Ownership */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Car className="w-5 h-5 mr-3 text-slate-400" />
            Possédez-vous une voiture personnelle ?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updateProfile({ ownsCar: true })}
              className={`group relative px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                profile.ownsCar === true
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg border-2 border-white/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🚗</div>
                <div>Oui</div>
                <div className="text-xs opacity-80 mt-1">J'ai une voiture</div>
              </div>
              {profile.ownsCar === true && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
            <button
              onClick={() => updateProfile({ ownsCar: false, carType: null })}
              className={`group relative px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                profile.ownsCar === false
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg border-2 border-white/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🚲</div>
                <div>Non</div>
                <div className="text-xs opacity-80 mt-1">Mobilité alternative</div>
              </div>
              {profile.ownsCar === false && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Car Type */}
        {profile.ownsCar && (
          <div className="group">
            <label className="block text-lg font-semibold text-white mb-4 flex items-center">
              <Car className="w-5 h-5 mr-3 text-slate-400" />
              Quel type de voiture ?
            </label>
            <div className="grid grid-cols-3 gap-4">
              {carTypes.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateProfile({ carType: option.value as any })}
                  className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    profile.carType === option.value
                      ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{option.emoji}</div>
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className={`text-xs mt-1 ${
                      profile.carType === option.value ? 'text-white/80' : 'text-slate-500'
                    }`}>
                      {option.impact}
                    </div>
                  </div>
                  {profile.carType === option.value && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Kilometers */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Car className="w-5 h-5 mr-3 text-slate-400" />
            Kilomètres en voiture par semaine :
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="2000"
              value={profile.weeklyKm || ''}
              onChange={(e) => updateProfile({ weeklyKm: parseInt(e.target.value) || null })}
              className="w-full px-6 py-4 text-lg bg-slate-800/50 border-2 border-slate-700/50 rounded-lg focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 text-white placeholder-slate-400"
              placeholder="Kilomètres par semaine"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">
              🛣️
            </div>
          </div>
          {profile.weeklyKm && (
            <div className="mt-2 text-sm text-green-400 flex items-center">
              <span className="mr-1">📊</span>
              {profile.weeklyKm * 52} km/an = {Math.round(profile.weeklyKm * 52 * 0.12)} kg CO₂/an
              {profile.weeklyKm < 100 ? " (Faible usage)" : 
               profile.weeklyKm > 300 ? " (Usage intensif)" : " (Usage modéré)"}
            </div>
          )}
        </div>

        {/* Flight Frequency */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Plane className="w-5 h-5 mr-3 text-slate-400" />
            Avez-vous pris l'avion ces 12 derniers mois ?
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ flightFrequency: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.flightFrequency === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-xs">{option.label}</div>
                </div>
                {profile.flightFrequency === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {profile.flightFrequency && profile.flightFrequency !== 'jamais' && (
            <div className="mt-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
              <p className="text-orange-300 text-sm">
                ✈️ Un vol Paris-New York = 2,3 tonnes de CO₂ (autant qu'une voiture pendant 1 an)
              </p>
            </div>
          )}
        </div>

        {/* Public Transport Usage */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Train className="w-5 h-5 mr-3 text-slate-400" />
            Transports en commun / mobilités douces :
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {usageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ publicTransportUsage: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.publicTransportUsage === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-xs">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    profile.publicTransportUsage === option.value ? 'text-white/70' : 'text-slate-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
                {profile.publicTransportUsage === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cruise Frequency */}
        <div className="group">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center">
            <Ship className="w-5 h-5 mr-3 text-slate-400" />
            Êtes-vous parti en croisière cette année ?
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile({ cruiseFrequency: option.value as any })}
                className={`group relative px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  profile.cruiseFrequency === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/20`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border-2 border-slate-700/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">{option.emoji}</div>
                  <div className="font-semibold text-xs">{option.label}</div>
                </div>
                {profile.cruiseFrequency === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {profile.cruiseFrequency && profile.cruiseFrequency !== 'jamais' && (
            <div className="mt-3 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <p className="text-red-300 text-sm">
                🚢 Une semaine de croisière = 1,8 tonnes de CO₂ (3x plus qu'un vol transatlantique)
              </p>
            </div>
          )}
        </div>

        {/* Bilan transport */}
        {(profile.ownsCar !== null || profile.flightFrequency || profile.publicTransportUsage) && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🌍</div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Votre profil transport</h4>
                <div className="space-y-1 text-blue-300 text-sm">
                  {profile.ownsCar === false && <p>✅ Bravo ! Pas de voiture = -2 tonnes CO₂/an</p>}
                  {profile.carType === 'electrique' && <p>⚡ Excellent choix avec l'électrique</p>}
                  {profile.publicTransportUsage === 'toujours' && <p>🚊 Champion des transports doux</p>}
                  {profile.flightFrequency === 'jamais' && <p>🌱 Aucun vol = impact minimal</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </QuestionCard>
  );
}