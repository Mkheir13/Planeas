import React, { useState, useEffect } from 'react';
import { Rocket, Sparkles, Zap, TrendingUp, Users } from 'lucide-react';
import { useOfficialData } from '../services/officialDataService';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const { data } = useOfficialData();
  const [currentStat, setCurrentStat] = useState(0);

  // Rotation des statistiques temps réel
  const realTimeStats = [
    {
      icon: <Zap className="w-4 h-4 sm:w-6 sm:h-6" />,
      label: 'Mix électrique français',
      value: `${data?.energyMix?.co2_intensity || 57}g CO₂/kWh`,
      color: 'text-cyan-400'
    },
    {
      icon: <div className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center">🌍</div>,
      label: 'Nucléaire en France',
      value: `${data?.energyMix?.nuclear_percentage || 67}%`,
      color: 'text-blue-400'
    },
    {
      icon: <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6" />,
      label: 'Énergies renouvelables',
      value: `${data?.energyMix?.renewable_percentage || 23}%`,
      color: 'text-green-400'
    },
    {
      icon: <Users className="w-4 h-4 sm:w-6 sm:h-6" />,
      label: 'Moyenne française',
      value: '2.9 planètes',
      color: 'text-orange-400'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % realTimeStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [realTimeStats.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Et si tout le monde vivait
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 block sm:inline">
                  {' '}comme moi ?
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Découvrez combien de planètes seraient nécessaires si tous les habitants de la Terre adoptaient votre mode de vie.
              </p>
              
              <div className="space-y-3 sm:space-y-4 text-gray-400 text-sm sm:text-base">
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                  <span>Questionnaire interactif et ludique</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                  <span>Calcul basé sur des données officielles temps réel</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0"></div>
                  <span>Système de badges et défis personnalisés</span>
                </div>
              </div>

              {/* Statistique temps réel rotative */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={`${realTimeStats[currentStat].color} transition-colors duration-500 flex-shrink-0`}>
                    {realTimeStats[currentStat].icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm text-gray-300 truncate">{realTimeStats[currentStat].label}</div>
                    <div className={`text-lg sm:text-2xl font-bold ${realTimeStats[currentStat].color} transition-colors duration-500`}>
                      {realTimeStats[currentStat].value}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="text-xs text-green-400 mt-1">LIVE</div>
                  </div>
                </div>
                
                {/* Indicateurs de progression */}
                <div className="flex space-x-2 mt-4 justify-center">
                  {realTimeStats.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStat ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onStart}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full text-base sm:text-lg transition-all duration-300 hover:from-cyan-400 hover:to-purple-400 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center space-x-3">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                <span>Commencer l'exploration</span>
              </span>
              
              {/* Effet de particules au hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 1000}ms`,
                      animationDuration: '1500ms'
                    }}
                  />
                ))}
              </div>
            </button>

            {/* Teaser gamification */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <span>🏆 Débloquez des badges</span>
              <span className="hidden sm:inline">•</span>
              <span>🎯 Relevez des défis</span>
              <span className="hidden sm:inline">•</span>
              <span>📊 Données temps réel</span>
            </div>
          </div>

          {/* Right side - Visual avec votre nouvelle planète */}
          <div className="relative order-first lg:order-last">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              {/* Central Planet - Votre nouvelle image SANS carré */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto animate-float">
                <img 
                  src="/planet-new.png" 
                  alt="Planète personnalisée" 
                  className="w-full h-full object-cover animate-spin-slow rounded-full"
                  style={{ 
                    animationDuration: '30s',
                    filter: 'drop-shadow(0 25px 50px rgba(59, 130, 246, 0.3))'
                  }}
                />
                
                {/* Données temps réel autour de la planète */}
                <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-cyan-500/20 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 text-xs text-cyan-300 animate-pulse">
                  {data?.energyMix?.co2_intensity || 57}g CO₂/kWh
                </div>
              </div>
              
              {/* Orbiting smaller planets AVEC COULEURS restaurées */}
              <div className="absolute top-1/2 left-1/2 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 -translate-x-1/2 -translate-y-1/2">
                {[
                  { delay: 0, color: 'from-orange-400 to-red-400', label: '2.9' },
                  { delay: 2, color: 'from-green-400 to-emerald-400', label: '1.0' },
                  { delay: 4, color: 'from-yellow-400 to-orange-400', label: '1.75' }
                ].map((planet, i) => (
                  <div
                    key={i}
                    className="absolute animate-orbit"
                    style={{
                      animationDelay: `${planet.delay}s`,
                      animationDuration: '8s',
                      transformOrigin: '144px 144px'
                    }}
                  >
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${planet.color} rounded-full shadow-lg relative`}>
                      <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                        {planet.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Légende des planètes */}
              <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 sm:p-3 text-xs text-gray-300">
                  <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
                    <span>🟠 France: 2.9</span>
                    <span>🟢 Objectif: 1.0</span>
                    <span>🟡 Monde: 1.75</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}