import React from 'react';
import { Trophy, Star, Target, Zap, TrendingUp, Award, Gift, Clock } from 'lucide-react';

interface GamificationPanelProps {
  gamificationData: {
    rank: string;
    badge: string;
    achievements: string[];
    challenges: string[];
    co2SavedToday: number;
    planetsSavedVsAverage: number;
  };
  realTimeContext: {
    currentCO2Intensity: number;
    bestTimeToUseElectricity: string;
    todaysEcoTip: string;
  };
}

export function GamificationPanel({ gamificationData, realTimeContext }: GamificationPanelProps) {
  const getRankColor = (rank: string) => {
    if (rank.includes('Légende')) return 'from-yellow-400 to-orange-500';
    if (rank.includes('Gardien')) return 'from-green-400 to-emerald-500';
    if (rank.includes('Apprenti')) return 'from-blue-400 to-cyan-500';
    if (rank.includes('Citoyen')) return 'from-purple-400 to-pink-500';
    return 'from-gray-400 to-gray-600';
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity < 40) return 'text-green-400';
    if (intensity < 60) return 'text-yellow-400';
    if (intensity < 80) return 'text-orange-400';
    return 'text-red-400';
  };

  // Correction du bug d'affichage des nombres
  const formatNumber = (num: number) => {
    if (num > 1000) return (num / 1000).toFixed(1) + 'k';
    return Math.round(num * 100) / 100;
  };

  return (
    <div className="space-y-6">
      {/* Rang et Badge */}
      <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-md rounded-2xl p-6 border border-indigo-500/30">
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{gamificationData.badge}</div>
          <h3 className={`text-2xl font-bold bg-gradient-to-r ${getRankColor(gamificationData.rank)} bg-clip-text text-transparent`}>
            {gamificationData.rank}
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-400">
              {formatNumber(gamificationData.co2SavedToday)}kg
            </div>
            <div className="text-xs text-gray-300">CO₂ économisé/jour</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-400">
              {formatNumber(gamificationData.planetsSavedVsAverage)}
            </div>
            <div className="text-xs text-gray-300">planètes économisées</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      {gamificationData.achievements.length > 0 && (
        <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md rounded-2xl p-6 border border-green-500/30">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-400" />
            Vos exploits
          </h4>
          <div className="space-y-2">
            {gamificationData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Défis */}
      {gamificationData.challenges.length > 0 && (
        <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-orange-400" />
            Défis personnalisés
          </h4>
          <div className="space-y-3">
            {gamificationData.challenges.map((challenge, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">{challenge}</span>
                  <Gift className="w-4 h-4 text-orange-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contexte Temps Réel */}
      <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-cyan-400" />
          Données temps réel
        </h4>
        
        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Intensité CO₂ électricité</span>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <div className={`text-2xl font-bold ${getIntensityColor(realTimeContext.currentCO2Intensity)}`}>
              {realTimeContext.currentCO2Intensity}g CO₂/kWh
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {realTimeContext.currentCO2Intensity < 50 ? '🟢 Très propre' : 
               realTimeContext.currentCO2Intensity < 70 ? '🟡 Correct' : '🔴 Élevé'}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-sm text-gray-300 mb-2">⚡ Meilleur moment :</div>
            <div className="text-white font-medium text-sm">{realTimeContext.bestTimeToUseElectricity}</div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
            <div className="text-sm text-purple-200 mb-2">💡 Conseil du jour :</div>
            <div className="text-white text-sm leading-relaxed">{realTimeContext.todaysEcoTip}</div>
          </div>
        </div>
      </div>

      {/* Progression */}
      <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
          Votre impact
        </h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">vs Moyenne française</span>
            <span className="text-green-400 font-bold">
              -{Math.round((gamificationData.planetsSavedVsAverage / 2.9) * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (gamificationData.planetsSavedVsAverage / 2.9) * 100)}%` }}
            />
          </div>
          
          <div className="text-xs text-gray-400 text-center">
            Vous économisez {formatNumber(gamificationData.planetsSavedVsAverage)} planète(s) par rapport à la moyenne !
          </div>
        </div>
      </div>
    </div>
  );
}