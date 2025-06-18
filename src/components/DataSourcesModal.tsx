import React, { useState } from 'react';
import { X, ExternalLink, Database, Zap, BarChart3, Globe } from 'lucide-react';

interface DataSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataSourcesModal({ isOpen, onClose }: DataSourcesModalProps) {
  if (!isOpen) return null;

  const dataSources = [
    {
      name: "ADEME - Base Carbone",
      url: "https://www.bilans-ges.ademe.fr/",
      description: "Facteurs d'émission officiels français pour tous les secteurs d'activité",
      icon: <Database className="w-6 h-6" />,
      data: [
        "Émissions par type de chauffage",
        "Facteurs transport (voiture, avion, train)",
        "Empreinte carbone alimentaire",
        "Données de consommation électronique"
      ]
    },
    {
      name: "RTE - eCO2mix",
      url: "https://www.rte-france.com/eco2mix",
      description: "Données temps réel sur le mix énergétique français et l'intensité carbone",
      icon: <Zap className="w-6 h-6" />,
      data: [
        "Intensité carbone électricité (g CO₂/kWh)",
        "Part nucléaire, renouvelable, fossile",
        "Consommation nationale en temps réel",
        "Prévisions de production"
      ]
    },
    {
      name: "INSEE",
      url: "https://www.insee.fr/",
      description: "Données démographiques et socio-économiques françaises",
      icon: <BarChart3 className="w-6 h-6" />,
      data: [
        "Taille moyenne des ménages",
        "Surface moyenne des logements",
        "Taux d'équipement automobile",
        "Données de consommation"
      ]
    },
    {
      name: "Global Footprint Network",
      url: "https://www.footprintnetwork.org/",
      description: "Données mondiales sur l'empreinte écologique et la biocapacité",
      icon: <Globe className="w-6 h-6" />,
      data: [
        "Empreinte écologique par pays",
        "Jour du dépassement mondial",
        "Biocapacité des écosystèmes",
        "Comparaisons internationales"
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Sources de données officielles</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-8">
            Notre calculateur utilise exclusivement des données officielles et scientifiques 
            pour garantir la précision et la crédibilité de vos résultats.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {dataSources.map((source, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-blue-600">
                    {source.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{source.name}</h3>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{source.description}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Données utilisées :</h4>
                  <ul className="space-y-1">
                    {source.data.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">🔄 Mise à jour en temps réel</h3>
            <p className="text-gray-700 text-sm mb-3">
              Certaines données sont actualisées automatiquement pour refléter les conditions actuelles :
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Mix électrique :</strong> Intensité carbone mise à jour quotidiennement</li>
              <li>• <strong>Facteurs d'émission :</strong> Révision annuelle par l'ADEME</li>
              <li>• <strong>Données démographiques :</strong> Actualisation INSEE</li>
              <li>• <strong>Moyennes internationales :</strong> Rapport annuel Global Footprint Network</li>
            </ul>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Dernière vérification des sources : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}