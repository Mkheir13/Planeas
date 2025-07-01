import React from 'react';
import { Shield, ExternalLink, Clock, Zap, TrendingUp } from 'lucide-react';
import { useOfficialData } from '../services/officialDataService';

export function OfficialDataBadge() {
  const { data, loading, error } = useOfficialData();

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-blue-600/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2 shadow-lg animate-pulse z-50">
        <Clock className="w-4 h-4 animate-spin" />
        <span>Chargement données temps réel...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 bg-orange-600/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2 shadow-lg z-50">
        <Shield className="w-4 h-4" />
        <span>Données de référence utilisées</span>
      </div>
    );
  }

  const co2Intensity = data?.energyMix?.co2_intensity || 57;
  const getIntensityColor = () => {
    if (co2Intensity < 40) return 'bg-green-600/90';
    if (co2Intensity < 60) return 'bg-yellow-600/90';
    if (co2Intensity < 80) return 'bg-orange-600/90';
    return 'bg-red-600/90';
  };

  const getIntensityIcon = () => {
    if (co2Intensity < 40) return '🟢';
    if (co2Intensity < 60) return '🟡';
    if (co2Intensity < 80) return '🟠';
    return '🔴';
  };

  return (
    <div className={`fixed bottom-4 right-4 ${getIntensityColor()} backdrop-blur-md text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2 shadow-lg group cursor-pointer transition-all duration-300 hover:scale-105 z-50`}>
      <div className="flex items-center space-x-2">
        <Zap className="w-4 h-4 animate-pulse" />
        <span className="font-medium">{co2Intensity}g CO₂/kWh</span>
        <span>{getIntensityIcon()}</span>
      </div>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Tooltip avec détails temps réel - REPOSITIONNÉ */}
      <div className="absolute bottom-full right-0 mb-2 w-96 bg-gray-900/95 backdrop-blur-md text-white p-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <h4 className="font-semibold mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Mix énergétique français - Temps réel
        </h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Intensité CO₂</div>
            <div className="text-lg font-bold text-cyan-300">{co2Intensity}g/kWh</div>
            <div className="text-xs text-gray-400">
              {co2Intensity < 50 ? 'Très propre' : co2Intensity < 70 ? 'Correct' : 'Élevé'}
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Nucléaire</div>
            <div className="text-lg font-bold text-blue-300">{data?.energyMix?.nuclear_percentage || 67}%</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Renouvelable</div>
            <div className="text-lg font-bold text-green-300">{data?.energyMix?.renewable_percentage || 23}%</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Fossile</div>
            <div className="text-lg font-bold text-orange-300">{data?.energyMix?.fossil_percentage || 10}%</div>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">🏠 Taille moyenne logement :</span>
            <span className="text-white">{data?.demographics?.avg_home_area || 91}m²</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">👥 Personnes par foyer :</span>
            <span className="text-white">{data?.demographics?.households_avg_size || 2.2}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">🚗 Voitures par foyer :</span>
            <span className="text-white">{data?.demographics?.cars_per_household || 0.83}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-3 h-3" />
              <span>Sources: RTE, ADEME, INSEE</span>
            </div>
            <span className="text-gray-500">
              {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }) : 'Temps réel'}
            </span>
          </div>
          
          <div className="mt-2 text-xs text-cyan-300">
            💡 {co2Intensity < 50 
              ? 'C\'est le moment idéal pour utiliser vos appareils électriques !' 
              : 'Évitez les gros appareils électriques maintenant'}
          </div>
        </div>
      </div>
    </div>
  );
}