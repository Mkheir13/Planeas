import React, { useState } from 'react';
import { Users, TrendingUp, Award, MapPin, Share2 } from 'lucide-react';
import { FootprintResult } from '../types';

interface SocialComparisonProps {
  result: FootprintResult;
}

export function SocialComparison({ result }: SocialComparisonProps) {
  const [selectedRegion, setSelectedRegion] = useState('france');

  // Données simulées de comparaison sociale
  const socialData = {
    france: {
      average: 2.9,
      percentileBetter: Math.round((1 - result.planetsNeeded / 2.9) * 100),
      topPerformers: 1.2,
      userCount: '2.3M'
    },
    europe: {
      average: 2.4,
      percentileBetter: Math.round((1 - result.planetsNeeded / 2.4) * 100),
      topPerformers: 1.1,
      userCount: '8.7M'
    },
    world: {
      average: 1.75,
      percentileBetter: Math.round((1 - result.planetsNeeded / 1.75) * 100),
      topPerformers: 0.9,
      userCount: '45M'
    }
  };

  const currentData = socialData[selectedRegion as keyof typeof socialData];
  const isAboveAverage = result.planetsNeeded > currentData.average;

  return (
    <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Comparaison Sociale</h3>
      </div>

      {/* Sélecteur de région */}
      <div className="flex space-x-2 mb-6">
        {[
          { key: 'france', label: '🇫🇷 France' },
          { key: 'europe', label: '🇪🇺 Europe' },
          { key: 'world', label: '🌍 Monde' }
        ].map((region) => (
          <button
            key={region.key}
            onClick={() => setSelectedRegion(region.key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedRegion === region.key
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-blue-200 hover:bg-white/20'
            }`}
          >
            {region.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* Position relative */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-200 text-sm">Votre position</span>
            <div className="flex items-center space-x-2">
              <TrendingUp className={`w-4 h-4 ${isAboveAverage ? 'text-red-400' : 'text-green-400'}`} />
              <span className={`font-bold ${isAboveAverage ? 'text-red-400' : 'text-green-400'}`}>
                {isAboveAverage ? 'Au-dessus' : 'En-dessous'} de la moyenne
              </span>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-red-500 h-4 rounded-full relative"
                style={{ width: '100%' }}
              >
                <div 
                  className="absolute top-0 w-1 h-4 bg-white rounded-full shadow-lg"
                  style={{ left: `${Math.min((result.planetsNeeded / 5) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              <span>Moyenne: {currentData.average}</span>
              <span>5 planètes</span>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {currentData.percentileBetter > 0 ? currentData.percentileBetter : 0}%
            </div>
            <div className="text-xs text-blue-200">
              {currentData.percentileBetter > 0 ? 'Mieux que' : 'À améliorer'}
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-cyan-400">{currentData.userCount}</div>
            <div className="text-xs text-cyan-200">Utilisateurs</div>
          </div>
        </div>

        {/* Top performers */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-200 text-sm font-medium">Top 10% des utilisateurs</span>
          </div>
          <div className="text-white">
            <span className="text-2xl font-bold">{currentData.topPerformers}</span>
            <span className="text-sm ml-1">planètes en moyenne</span>
          </div>
          {result.planetsNeeded <= currentData.topPerformers && (
            <div className="mt-2 text-yellow-300 text-xs">
              🎉 Félicitations ! Vous faites partie du top 10% !
            </div>
          )}
        </div>

        {/* Partage social */}
        <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2 hover:from-blue-400 hover:to-cyan-400 transition-all">
          <Share2 className="w-4 h-4" />
          <span>Défier mes amis</span>
        </button>
      </div>
    </div>
  );
}