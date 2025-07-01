import React, { useState } from 'react';
import { RotateCcw, Share2, TrendingDown, Star, Sparkles, Car, Plane, Beef, Zap, ExternalLink, Info, Database, Trophy, ChevronDown, ChevronUp, Brain } from 'lucide-react';
import { FootprintResult } from '../types';
import { getCO2Equivalent, REFERENCE_DATA } from '../utils/footprintCalculator';
import { DataSourcesModal } from './DataSourcesModal';
import { MLInsightsModal } from './MLInsightsModal';
import { GamificationPanel } from './GamificationPanel';
import { AIInsights } from './AIInsights';
import { ChallengeSystem } from './ChallengeSystem';
import { SocialComparison } from './SocialComparison';
import { DataSciencePanel } from './DataSciencePanel';
import { useGamifiedData } from '../services/officialDataService';
import { UserProfile } from '../types';

interface ResultsProps {
  result: FootprintResult;
  profile: UserProfile;
  onRestart: () => void;
}

export function Results({ result, profile, onRestart }: ResultsProps) {
  const [showDataSources, setShowDataSources] = useState(false);
  const [showMLInsights, setShowMLInsights] = useState(false);
  const [showGamification, setShowGamification] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>('score');
  
  // Récupération des données gamifiées (simulées pour la démo)
  const { data: gamifiedData, loading } = useGamifiedData();

  const getCategoryColor = (category: FootprintResult['category']) => {
    switch (category) {
      case 'excellent': return 'from-green-400 to-emerald-500';
      case 'good': return 'from-lime-400 to-green-500';
      case 'average': return 'from-yellow-400 to-orange-500';
      case 'concerning': return 'from-orange-500 to-red-500';
      case 'critical': return 'from-red-500 to-pink-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getCategoryMessage = (category: FootprintResult['category']) => {
    switch (category) {
      case 'excellent': return 'Incroyable ! Vous êtes un véritable gardien de notre planète !';
      case 'good': return 'Bravo ! Vous montrez l\'exemple avec un mode de vie responsable !';
      case 'average': return 'Pas mal ! Quelques ajustements pourraient faire la différence !';
      case 'concerning': return 'Attention ! Il est temps de repenser certaines habitudes !';
      case 'critical': return 'Alerte rouge ! Des changements majeurs s\'imposent !';
      default: return '';
    }
  };

  const getBreakdownLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      housing: 'Logement',
      transport: 'Transport',
      food: 'Alimentation',
      consumption: 'Consommation',
      waste: 'Déchets'
    };
    return labels[key] || key;
  };

  const getBreakdownIcon = (key: string) => {
    const icons: { [key: string]: string } = {
      housing: '🏠',
      transport: '🚗',
      food: '🍽️',
      consumption: '🛍️',
      waste: '♻️'
    };
    return icons[key] || '📊';
  };

  const getRealLifeEquivalent = () => {
    const totalCO2PerYear = getCO2Equivalent(result.totalScore);
    
    // Utilisation des données temps réel si disponibles
    const currentCO2Intensity = gamifiedData?.energyMix?.co2_intensity || 57;
    
    const equivalents = [
      {
        icon: <Car className="w-4 h-4 sm:w-5 sm:h-5" />,
        text: `${Math.round(totalCO2PerYear / 120 / 365)} km/jour en voiture`,
        description: '(120g CO2/km - ADEME)',
        source: 'ADEME',
        isRealTime: false
      },
      {
        icon: <Plane className="w-4 h-4 sm:w-5 sm:h-5" />,
        text: `${Math.round(totalCO2PerYear / 2300)} vol(s) Paris-NY/an`,
        description: '(2,3t CO2/vol - GIEC)',
        source: 'GIEC',
        isRealTime: false
      },
      {
        icon: <Beef className="w-4 h-4 sm:w-5 sm:h-5" />,
        text: `${Math.round(totalCO2PerYear / 35 / 52)} steaks/semaine`,
        description: '(35kg CO2/kg - ADEME)',
        source: 'ADEME',
        isRealTime: false
      },
      {
        icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
        text: `${Math.round(totalCO2PerYear / currentCO2Intensity)} kWh/an`,
        description: `(${currentCO2Intensity}g CO2/kWh - RTE)`,
        source: 'RTE',
        isRealTime: true
      }
    ];

    return equivalents;
  };

  const shareResults = () => {
    const gamificationText = gamifiedData?.gamification ? 
      ` Je suis ${gamifiedData.gamification.rank} ${gamifiedData.gamification.badge} et j'économise ${gamifiedData.gamification.co2SavedToday}kg de CO₂ par jour !` : '';
    
    const text = `Je suis ${result.title} ! Si tout le monde vivait comme moi, il faudrait ${result.planetsNeeded} planète${result.planetsNeeded !== 1 ? 's' : ''} !${gamificationText} 🌍 Et vous ? Faites le test : `;
    
    if (navigator.share) {
      navigator.share({
        title: 'Mon empreinte écologique',
        text,
        url: window.location.origin
      });
    } else {
      navigator.clipboard?.writeText(text + window.location.origin);
    }
  };

  const getUniverseStyle = () => {
    if (result.category === 'excellent') {
      return 'from-slate-900 via-emerald-900 to-slate-900';
    } else if (result.category === 'good') {
      return 'from-slate-900 via-blue-900 to-slate-900';
    } else if (result.category === 'average') {
      return 'from-slate-900 via-orange-900 to-slate-900';
    } else if (result.category === 'concerning') {
      return 'from-slate-900 via-red-900 to-slate-900';
    } else {
      return 'from-slate-900 via-red-800 to-slate-900';
    }
  };

  const getStarCount = () => {
    switch (result.category) {
      case 'excellent': return 30;
      case 'good': return 20;
      case 'average': return 15;
      case 'concerning': return 10;
      case 'critical': return 5;
      default: return 15;
    }
  };

  const realLifeEquivalents = getRealLifeEquivalent();
  const co2Equivalent = getCO2Equivalent(result.totalScore);

  const sections = [
    {
      id: 'score',
      title: 'Votre score',
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="relative mb-6 sm:mb-8">
            <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
              {/* Planet visualization avec votre nouvelle image SANS carré */}
              <div className="relative">
                {[...Array(Math.min(Math.ceil(result.planetsNeeded), 5))].map((_, i) => (
                  <div
                    key={i}
                    className="inline-block mx-0.5 sm:mx-1 relative"
                    style={{
                      opacity: i < result.planetsNeeded ? 1 : 0.3
                    }}
                  >
                    <img 
                      src="/planet-new.png" 
                      alt="Planète" 
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-cover rounded-full"
                      style={{ 
                        filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(result.category)} opacity-50 rounded-full`}></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className={`inline-block text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${getCategoryColor(result.category)} bg-clip-text text-transparent mb-2 sm:mb-4`}>
                {result.planetsNeeded}
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-white font-semibold mb-2">
                planète{result.planetsNeeded !== 1 ? 's' : ''}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mb-1 sm:mb-2">
                Score : {result.totalScore}/10 points
              </p>
              <p className="text-xs text-cyan-300">
                ≈ {(co2Equivalent / 1000).toFixed(1)} tonnes CO₂/an
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'breakdown',
      title: 'Détail par catégorie',
      icon: <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3">
          {Object.entries(result.breakdown).map(([key, value]) => {
            const maxScores = { housing: 2.5, transport: 4.5, food: 2.5, consumption: 1.5, waste: 1.0 };
            const maxScore = maxScores[key as keyof typeof maxScores];
            const percentage = Math.min((value / maxScore) * 100, 100);
            
            return (
              <div key={key} className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-base sm:text-lg">{getBreakdownIcon(key)}</span>
                    <span className="text-white font-medium text-sm">{getBreakdownLabel(key)}</span>
                  </div>
                  <span className="text-white font-bold text-sm">
                    {value.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(result.category)} transition-all duration-1000`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}

          {/* Comparison with averages */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
            <h3 className="text-white font-semibold mb-2 flex items-center text-sm">
              <Info className="w-4 h-4 mr-2" />
              Comparaison officielle
            </h3>
            <div className="text-xs text-blue-200 space-y-1">
              <p>🇫🇷 Moyenne française : {REFERENCE_DATA.averages.france} planètes</p>
              <p>🌍 Moyenne mondiale : {REFERENCE_DATA.averages.world} planètes</p>
              <p>🎯 Objectif Accord de Paris : {REFERENCE_DATA.averages.target} planète</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'equivalents',
      title: 'Équivalences concrètes',
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3">
          {realLifeEquivalents.map((equiv, index) => (
            <div key={index} className={`bg-slate-800/50 rounded-lg p-3 flex items-start space-x-3 ${equiv.isRealTime ? 'ring-1 ring-cyan-400/50' : ''}`}>
              <div className={`${equiv.isRealTime ? 'text-cyan-400' : 'text-cyan-400'} mt-1 flex-shrink-0`}>
                {equiv.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{equiv.text}</p>
                <p className="text-slate-400 text-xs">{equiv.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="inline-block px-2 py-0.5 bg-blue-600/30 text-blue-200 text-xs rounded-full">
                    {equiv.source}
                  </span>
                  {equiv.isRealTime && (
                    <span className="inline-block px-2 py-0.5 bg-cyan-600/30 text-cyan-200 text-xs rounded-full">
                      ⚡ Live
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-200 text-xs mb-2">
              💡 <strong>Calcul basé sur :</strong> {(co2Equivalent / 1000).toFixed(1)} tonnes CO₂/an
            </p>
            <div className="space-y-1">
              <h4 className="text-cyan-100 font-medium text-xs">Sources officielles :</h4>
              {REFERENCE_DATA.sources.slice(0, 2).map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-xs text-cyan-300 hover:text-cyan-100 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {source.name}
                </a>
              ))}
              <button
                onClick={() => setShowDataSources(true)}
                className="flex items-center text-xs text-cyan-300 hover:text-cyan-100 transition-colors mt-1"
              >
                <Database className="w-3 h-3 mr-1" />
                Voir toutes les sources
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br ${getUniverseStyle()} relative overflow-hidden`}>
        {/* Animated stars background */}
        <div className="absolute inset-0">
          {[...Array(getStarCount())].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <Sparkles className="w-1 h-1 text-white opacity-60" />
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 min-h-screen">
          <div className="w-full max-w-7xl mx-auto">
            {/* Toggle Gamification */}
            <div className="text-center mb-4 sm:mb-6">
              <button
                onClick={() => setShowGamification(!showGamification)}
                className="flex items-center space-x-2 mx-auto px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-md text-white font-medium rounded-full transition-all duration-300 hover:from-purple-500/50 hover:to-pink-500/50 border border-purple-500/30 text-xs sm:text-sm"
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">{showGamification ? 'Masquer' : 'Afficher'} les fonctionnalités avancées</span>
                <span className="sm:hidden">{showGamification ? 'Masquer' : 'Afficher'} avancé</span>
              </button>
            </div>

            <div className={`grid gap-4 sm:gap-6 ${showGamification ? 'xl:grid-cols-3' : 'grid-cols-1'}`}>
              {/* Colonne principale - Résultats */}
              <div className={`${showGamification ? 'xl:col-span-2' : 'col-span-1'} relative z-20`}>
                {/* Title and Category - TITRE CORRIGÉ RESPONSIVE */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="mb-4 sm:mb-6">
                    <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto text-yellow-400 mb-3 sm:mb-4" />
                    <div className="px-2">
                      <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r ${getCategoryColor(result.category)} bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight break-words hyphens-auto`}>
                        {result.title}
                      </h1>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto px-2">
                      {getCategoryMessage(result.category)}
                    </p>
                  </div>
                </div>

                {/* Sections scrollables */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {sections.map((section) => (
                    <div key={section.id} className="bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50">
                      <button
                        onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                        className="w-full p-3 sm:p-4 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors rounded-xl"
                      >
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="text-cyan-400">
                            {section.icon}
                          </div>
                          <h2 className="text-base sm:text-lg font-bold text-white">{section.title}</h2>
                        </div>
                        <div className="text-slate-400">
                          {expandedSection === section.id ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>
                      </button>
                      
                      {expandedSection === section.id && (
                        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                          <div className="border-t border-slate-700/50 pt-3 sm:pt-4">
                            {section.content}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions - AVEC PADDING BOTTOM POUR ÉVITER LE BADGE */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 pb-20 sm:pb-16">
                  <button
                    onClick={onRestart}
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-700/50 backdrop-blur-md text-white font-semibold rounded-full transition-all duration-300 hover:bg-slate-600/50 hover:scale-105 shadow-lg text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Refaire le test</span>
                  </button>
                  
                  <button
                    onClick={shareResults}
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full transition-all duration-300 hover:from-cyan-400 hover:to-purple-400 hover:scale-105 shadow-lg hover:shadow-xl text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Partager</span>
                  </button>
                  
                  <button
                    onClick={() => setShowDataSources(true)}
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-700/50 backdrop-blur-md text-white font-semibold rounded-full transition-all duration-300 hover:bg-slate-600/50 hover:scale-105 shadow-lg text-sm"
                  >
                    <Database className="w-4 h-4" />
                    <span>Sources</span>
                  </button>

                  <button
                    onClick={() => setShowMLInsights(true)}
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full transition-all duration-300 hover:from-blue-400 hover:to-indigo-400 hover:scale-105 shadow-lg text-sm"
                  >
                    <Brain className="w-4 h-4" />
                    <span>ML Insights</span>
                  </button>
                </div>
              </div>

              {/* Sidebar fonctionnalités avancées avec z-index corrigé ET PADDING BOTTOM */}
              {showGamification && gamifiedData && (
                <div className="xl:col-span-1 relative z-10">
                  <div className="space-y-3 sm:space-y-4 xl:sticky xl:top-4 xl:max-h-screen xl:overflow-y-auto xl:custom-scrollbar xl:pr-2 pb-20 sm:pb-16">
                    {/* Data Science Panel */}
                    <DataSciencePanel profile={profile} result={result} />
                    
                    {/* IA Insights */}
                    <AIInsights profile={profile} result={result} />
                    
                    {/* Système de défis */}
                    <ChallengeSystem profile={profile} />
                    
                    {/* Comparaison sociale */}
                    <SocialComparison result={result} />
                    
                    {/* Gamification classique */}
                    <GamificationPanel 
                      gamificationData={{
                        rank: 'Gardien Vert',
                        badge: '🌱',
                        achievements: ['🚲 Mobilité Douce', '♻️ Maître du Tri'],
                        challenges: ['Essayez 1 jour sans voiture cette semaine', 'Tentez 2 repas végétariens cette semaine'],
                        co2SavedToday: Math.round((11000 - co2Equivalent) / 365),
                        planetsSavedVsAverage: Math.max(0, 2.9 - result.planetsNeeded)
                      }}
                      realTimeContext={{
                        currentCO2Intensity: gamifiedData.energyMix?.co2_intensity || 57,
                        bestTimeToUseElectricity: gamifiedData.energyMix?.co2_intensity < 50 ? 'Maintenant ! Le mix électrique est très propre' : 'La nuit (plus de nucléaire, moins de CO2)',
                        todaysEcoTip: `Avec ${gamifiedData.energyMix?.co2_intensity || 57}g CO2/kWh actuellement, c'est ${(gamifiedData.energyMix?.co2_intensity || 57) < 50 ? 'le bon moment' : 'pas idéal'} pour utiliser vos appareils électriques`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DataSourcesModal 
        isOpen={showDataSources} 
        onClose={() => setShowDataSources(false)} 
      />

      <MLInsightsModal 
        isOpen={showMLInsights} 
        onClose={() => setShowMLInsights(false)} 
      />
    </>
  );
}