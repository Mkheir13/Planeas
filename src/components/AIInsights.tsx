import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, Lightbulb, ChevronRight } from 'lucide-react';
import { UserProfile, FootprintResult } from '../types';

interface AIInsightsProps {
  profile: UserProfile;
  result: FootprintResult;
}

export function AIInsights({ profile, result }: AIInsightsProps) {
  const [currentInsight, setCurrentInsight] = useState(0);
  
  const generatePersonalizedInsights = () => {
    const insights = [];
    
    // Analyse intelligente basée sur le profil
    if (profile.ownsCar && profile.weeklyKm && profile.weeklyKm > 200) {
      insights.push({
        type: 'transport',
        title: 'Optimisation transport',
        message: `Avec ${profile.weeklyKm}km/semaine, le télétravail 2 jours pourrait réduire votre empreinte de 0.8 planète`,
        impact: 'Élevé',
        actionable: true,
        icon: '🚗'
      });
    }
    
    if (profile.meatMealsPerWeek && profile.meatMealsPerWeek > 7) {
      insights.push({
        type: 'food',
        title: 'Transition alimentaire',
        message: `Remplacer 3 repas carnés par semaine par du végétarien = -0.4 planète`,
        impact: 'Moyen',
        actionable: true,
        icon: '🌱'
      });
    }
    
    if (profile.heatingType === 'fioul') {
      insights.push({
        type: 'housing',
        title: 'Transition énergétique',
        message: `Passer du fioul à une pompe à chaleur = -0.6 planète immédiatement`,
        impact: 'Très élevé',
        actionable: true,
        icon: '🏠'
      });
    }
    
    // Insights positifs
    if (profile.ownsCar === false) {
      insights.push({
        type: 'positive',
        title: 'Champion mobilité',
        message: `Votre choix sans voiture vous fait économiser 2 tonnes CO₂/an !`,
        impact: 'Excellent',
        actionable: false,
        icon: '🏆'
      });
    }
    
    return insights;
  };

  const insights = generatePersonalizedInsights();

  useEffect(() => {
    if (insights.length > 1) {
      const interval = setInterval(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [insights.length]);

  if (insights.length === 0) return null;

  const currentInsightData = insights[currentInsight];

  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="w-6 h-6 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">IA Personnalisée</h3>
        <div className="ml-auto text-xs text-purple-300">
          {insights.length > 1 && `${currentInsight + 1}/${insights.length}`}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{currentInsightData.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-purple-100 mb-2">{currentInsightData.title}</h4>
              <p className="text-purple-200 text-sm mb-3">{currentInsightData.message}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentInsightData.impact === 'Très élevé' ? 'bg-red-500/30 text-red-200' :
                  currentInsightData.impact === 'Élevé' ? 'bg-orange-500/30 text-orange-200' :
                  currentInsightData.impact === 'Moyen' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-green-500/30 text-green-200'
                }`}>
                  Impact: {currentInsightData.impact}
                </span>
                
                {currentInsightData.actionable && (
                  <button className="flex items-center space-x-1 text-purple-300 hover:text-purple-100 text-xs">
                    <span>Plan d'action</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {insights.length > 1 && (
          <div className="flex justify-center space-x-2">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentInsight(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentInsight ? 'bg-purple-400' : 'bg-purple-600/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}