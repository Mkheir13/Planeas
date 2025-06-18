import React, { useState } from 'react';
import { Target, Calendar, Trophy, CheckCircle, Clock, Flame } from 'lucide-react';
import { UserProfile } from '../types';

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  impact: string;
  category: string;
  icon: string;
  completed?: boolean;
}

interface ChallengeSystemProps {
  profile: UserProfile;
}

export function ChallengeSystem({ profile }: ChallengeSystemProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const generatePersonalizedChallenges = (): Challenge[] => {
    const challenges: Challenge[] = [];

    // Défis basés sur le profil utilisateur
    if (profile.ownsCar && profile.weeklyKm && profile.weeklyKm > 100) {
      challenges.push({
        id: 'car-free-day',
        title: 'Journée sans voiture',
        description: 'Essayez les transports en commun, vélo ou marche pendant une journée complète',
        duration: '1 jour',
        difficulty: 'Facile',
        impact: '-2kg CO₂',
        category: 'Transport',
        icon: '🚲'
      });
    }

    if (profile.meatMealsPerWeek && profile.meatMealsPerWeek > 5) {
      challenges.push({
        id: 'veggie-week',
        title: 'Semaine végétarienne',
        description: 'Remplacez tous vos repas carnés par des alternatives végétales',
        duration: '7 jours',
        difficulty: 'Moyen',
        impact: '-8kg CO₂',
        category: 'Alimentation',
        icon: '🌱'
      });
    }

    if (profile.clothingFrequency === 'chaque-mois') {
      challenges.push({
        id: 'no-buy-month',
        title: 'Mois sans achat',
        description: 'Un mois complet sans acheter de vêtements neufs',
        duration: '30 jours',
        difficulty: 'Difficile',
        impact: '-15kg CO₂',
        category: 'Consommation',
        icon: '👕'
      });
    }

    // Défis universels
    challenges.push(
      {
        id: 'energy-saver',
        title: 'Économiseur d\'énergie',
        description: 'Réduisez votre consommation électrique de 20% cette semaine',
        duration: '7 jours',
        difficulty: 'Facile',
        impact: '-3kg CO₂',
        category: 'Logement',
        icon: '⚡'
      },
      {
        id: 'zero-waste',
        title: 'Zéro déchet',
        description: 'Une semaine sans produire de déchets non recyclables',
        duration: '7 jours',
        difficulty: 'Difficile',
        impact: '-5kg CO₂',
        category: 'Déchets',
        icon: '♻️'
      }
    );

    return challenges;
  };

  const challenges = generatePersonalizedChallenges();

  const acceptChallenge = (challengeId: string) => {
    setSelectedChallenge(challengeId);
    // Ici on pourrait envoyer une notification ou démarrer un timer
  };

  const completeChallenge = (challengeId: string) => {
    setCompletedChallenges(prev => [...prev, challengeId]);
    setSelectedChallenge(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'text-green-400 bg-green-500/20';
      case 'Moyen': return 'text-yellow-400 bg-yellow-500/20';
      case 'Difficile': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-orange-400" />
        <h3 className="text-lg font-semibold text-white">Défis Personnalisés</h3>
        <div className="ml-auto flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 text-sm font-medium">{completedChallenges.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(challenge.id);
          const isSelected = selectedChallenge === challenge.id;

          return (
            <div
              key={challenge.id}
              className={`bg-white/10 rounded-lg p-4 transition-all duration-300 ${
                isCompleted ? 'opacity-60' : 'hover:bg-white/20'
              } ${isSelected ? 'ring-2 ring-orange-400' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{challenge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-white">{challenge.title}</h4>
                    {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-400 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{challenge.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-400 text-xs">
                        <Flame className="w-3 h-3" />
                        <span>{challenge.impact}</span>
                      </div>
                    </div>
                    
                    {!isCompleted && !isSelected && (
                      <button
                        onClick={() => acceptChallenge(challenge.id)}
                        className="px-3 py-1 bg-orange-500 hover:bg-orange-400 text-white text-xs rounded-full transition-colors"
                      >
                        Accepter
                      </button>
                    )}
                    
                    {isSelected && (
                      <button
                        onClick={() => completeChallenge(challenge.id)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-400 text-white text-xs rounded-full transition-colors"
                      >
                        Terminé !
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedChallenge && (
        <div className="mt-4 p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
          <div className="flex items-center space-x-2 text-orange-200 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Défi en cours ! Vous recevrez un rappel quotidien.</span>
          </div>
        </div>
      )}
    </div>
  );
}