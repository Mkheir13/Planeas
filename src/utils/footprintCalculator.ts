import { UserProfile, FootprintResult } from '../types';

// Barème basé sur des données réelles d'empreinte carbone
const SCORING_SYSTEM = {
  logement: [
    {
      question: "surface",
      responses: {
        "<50": 0.5,
        "50-100": 0.8,
        ">100": 1.2
      }
    },
    {
      question: "chauffage",
      responses: {
        "aucun": 0.2,
        "pompe-chaleur": 0.4,
        "bois": 0.6,
        "electricite": 0.8,
        "gaz": 0.9,
        "fioul": 1.2
      }
    },
    {
      question: "isolation",
      responses: {
        "oui": 0,
        "ne-sais-pas": 0.2,
        "non": 0.5
      }
    }
  ],
  transport: [
    {
      question: "voiture",
      responses: {
        "non": 0,
        "oui": 0.8
      }
    },
    {
      question: "type-voiture",
      responses: {
        "electrique": 0.3,
        "essence": 0.6,
        "diesel": 0.7
      }
    },
    {
      question: "km-semaine",
      responses: {
        "<200": 0.4,
        "200-500": 0.8,
        ">500": 1.2
      }
    },
    {
      question: "avion",
      responses: {
        "jamais": 0,
        "1-2": 0.6,
        "3-5": 1.2,
        "plus-5": 2.0
      }
    },
    {
      question: "transports-doux",
      responses: {
        "jamais": 0,
        "parfois": -0.1,
        "souvent": -0.2,
        "toujours": -0.4
      }
    },
    {
      question: "croisiere",
      responses: {
        "jamais": 0,
        "1-2": 0.7,
        "3-5": 1.5,
        "plus-5": 2.5
      }
    }
  ],
  alimentation: [
    {
      question: "viande-semaine",
      responses: {
        "0": 0.2,
        "1-5": 0.6,
        "5-10": 1.0,
        ">10": 1.5
      }
    },
    {
      question: "produits-animaux",
      responses: {
        "non": 0.2,
        "oui": 0.6
      }
    },
    {
      question: "bio-local",
      responses: {
        "toujours": 0,
        "souvent": 0.1,
        "parfois": 0.3,
        "jamais": 0.5
      }
    },
    {
      question: "gaspillage",
      responses: {
        "jamais": 0,
        "parfois": 0.2,
        "souvent": 0.4
      }
    }
  ],
  consommation: [
    {
      question: "vetements",
      responses: {
        "jamais": 0.1,
        "1-2-an": 0.2,
        "2-3-mois": 0.5,
        "chaque-mois": 0.8
      }
    },
    {
      question: "electronique",
      responses: {
        "non": 0.2,
        "oui": 0.6
      }
    },
    {
      question: "reparations",
      responses: {
        "souvent": 0,
        "parfois": 0.2,
        "jamais": 0.4
      }
    },
    {
      question: "occasion",
      responses: {
        "toujours": 0,
        "souvent": 0.1,
        "parfois": 0.2,
        "jamais": 0.4
      }
    }
  ],
  dechets: [
    {
      question: "tri",
      responses: {
        "oui": 0,
        "partiellement": 0.2,
        "non": 0.4
      }
    },
    {
      question: "sacs-poubelle",
      responses: {
        "0-1": 0.1,
        "1-2": 0.2,
        "2-4": 0.3,
        ">4": 0.4
      }
    },
    {
      question: "emballages",
      responses: {
        "toujours": 0,
        "souvent": 0.1,
        "parfois": 0.2,
        "jamais": 0.3
      }
    }
  ]
};

export function calculateFootprint(profile: UserProfile): FootprintResult {
  const breakdown = {
    housing: 0,
    transport: 0,
    food: 0,
    consumption: 0,
    waste: 0
  };

  // 🏠 Logement
  let housingScore = 0;
  
  // Surface par personne
  if (profile.householdSize && profile.homeArea) {
    const areaPerPerson = profile.homeArea / profile.householdSize;
    if (areaPerPerson < 50) {
      housingScore += 0.5;
    } else if (areaPerPerson <= 100) {
      housingScore += 0.8;
    } else {
      housingScore += 1.2;
    }
  }
  
  // Type de chauffage
  const heatingScores = {
    'aucun': 0.2,
    'pompe-chaleur': 0.4,
    'bois': 0.6,
    'electricite': 0.8,
    'gaz': 0.9,
    'fioul': 1.2
  };
  if (profile.heatingType && heatingScores[profile.heatingType]) {
    housingScore += heatingScores[profile.heatingType];
  }
  
  // Isolation
  const insulationScores = {
    'oui': 0,
    'ne-sais-pas': 0.2,
    'non': 0.5
  };
  if (profile.homeInsulation && insulationScores[profile.homeInsulation]) {
    housingScore += insulationScores[profile.homeInsulation];
  }
  
  breakdown.housing = housingScore;

  // 🚗 Transport
  let transportScore = 0;
  
  // Possession voiture
  if (profile.ownsCar) {
    transportScore += 0.8;
    
    // Type de voiture
    const carScores = {
      'electrique': 0.3,
      'essence': 0.6,
      'diesel': 0.7
    };
    if (profile.carType && carScores[profile.carType]) {
      transportScore += carScores[profile.carType];
    }
  }
  
  // Kilomètres par semaine
  if (profile.weeklyKm) {
    if (profile.weeklyKm < 200) {
      transportScore += 0.4;
    } else if (profile.weeklyKm <= 500) {
      transportScore += 0.8;
    } else {
      transportScore += 1.2;
    }
  }
  
  // Avion
  const flightScores = {
    'jamais': 0,
    '1-2': 0.6,
    '3-5': 1.2,
    'plus-5': 2.0
  };
  if (profile.flightFrequency && flightScores[profile.flightFrequency]) {
    transportScore += flightScores[profile.flightFrequency];
  }
  
  // Transports doux (bonus négatif)
  const publicTransportScores = {
    'jamais': 0,
    'parfois': -0.1,
    'souvent': -0.2,
    'toujours': -0.4
  };
  if (profile.publicTransportUsage && publicTransportScores[profile.publicTransportUsage]) {
    transportScore += publicTransportScores[profile.publicTransportUsage];
  }
  
  // Croisière
  const cruiseScores = {
    'jamais': 0,
    '1-2': 0.7,
    '3-5': 1.5,
    'plus-5': 2.5
  };
  if (profile.cruiseFrequency && cruiseScores[profile.cruiseFrequency]) {
    transportScore += cruiseScores[profile.cruiseFrequency];
  }
  
  breakdown.transport = Math.max(transportScore, 0);

  // 🍽️ Alimentation
  let foodScore = 0;
  
  // Repas avec viande par semaine
  if (profile.meatMealsPerWeek !== null) {
    if (profile.meatMealsPerWeek === 0) {
      foodScore += 0.2;
    } else if (profile.meatMealsPerWeek <= 5) {
      foodScore += 0.6;
    } else if (profile.meatMealsPerWeek <= 10) {
      foodScore += 1.0;
    } else {
      foodScore += 1.5;
    }
  }
  
  // Produits d'origine animale quotidiens
  if (profile.dailyAnimalProducts === false) {
    foodScore += 0.2;
  } else if (profile.dailyAnimalProducts === true) {
    foodScore += 0.6;
  }
  
  // Bio/local
  const bioLocalScores = {
    'toujours': 0,
    'souvent': 0.1,
    'parfois': 0.3,
    'jamais': 0.5
  };
  if (profile.bioLocalFrequency && bioLocalScores[profile.bioLocalFrequency]) {
    foodScore += bioLocalScores[profile.bioLocalFrequency];
  }
  
  // Gaspillage alimentaire
  const wasteScores = {
    'jamais': 0,
    'parfois': 0.2,
    'souvent': 0.4
  };
  if (profile.foodWasteFrequency && wasteScores[profile.foodWasteFrequency]) {
    foodScore += wasteScores[profile.foodWasteFrequency];
  }
  
  breakdown.food = foodScore;

  // 🛍️ Consommation
  let consumptionScore = 0;
  
  // Fréquence d'achat de vêtements
  const clothingScores = {
    'jamais': 0.1,
    '1-2-an': 0.2,
    '2-3-mois': 0.5,
    'chaque-mois': 0.8
  };
  if (profile.clothingFrequency && clothingScores[profile.clothingFrequency]) {
    consumptionScore += clothingScores[profile.clothingFrequency];
  }
  
  // Appareils électroniques
  if (profile.buyNewElectronics === false) {
    consumptionScore += 0.2;
  } else if (profile.buyNewElectronics === true) {
    consumptionScore += 0.6;
  }
  
  // Réparations
  const repairScores = {
    'souvent': 0,
    'parfois': 0.2,
    'jamais': 0.4
  };
  if (profile.repairFrequency && repairScores[profile.repairFrequency]) {
    consumptionScore += repairScores[profile.repairFrequency];
  }
  
  // Achat d'occasion
  const secondHandScores = {
    'toujours': 0,
    'souvent': 0.1,
    'parfois': 0.2,
    'jamais': 0.4
  };
  if (profile.secondHandFrequency && secondHandScores[profile.secondHandFrequency]) {
    consumptionScore += secondHandScores[profile.secondHandFrequency];
  }
  
  breakdown.consumption = consumptionScore;

  // ♻️ Déchets
  let wasteScore = 0;
  
  // Tri des déchets
  const sortScores = {
    'oui': 0,
    'partiellement': 0.2,
    'non': 0.4
  };
  if (profile.sortWaste && sortScores[profile.sortWaste]) {
    wasteScore += sortScores[profile.sortWaste];
  }
  
  // Nombre de sacs poubelle par semaine
  if (profile.trashBagsPerWeek !== null) {
    if (profile.trashBagsPerWeek <= 1) {
      wasteScore += 0.1;
    } else if (profile.trashBagsPerWeek <= 2) {
      wasteScore += 0.2;
    } else if (profile.trashBagsPerWeek <= 4) {
      wasteScore += 0.3;
    } else {
      wasteScore += 0.4;
    }
  }
  
  // Produits avec peu d'emballages
  const packagingScores = {
    'toujours': 0,
    'souvent': 0.1,
    'parfois': 0.2,
    'jamais': 0.3
  };
  if (profile.lowPackagingFrequency && packagingScores[profile.lowPackagingFrequency]) {
    wasteScore += packagingScores[profile.lowPackagingFrequency];
  }
  
  breakdown.waste = wasteScore;

  const totalScore = breakdown.housing + breakdown.transport + breakdown.food + breakdown.consumption + breakdown.waste;
  
  // Conversion en planètes basée sur l'empreinte carbone réelle
  // Moyenne mondiale : 1,75 planète par personne
  // France : 2,9 planètes par personne
  let planetsNeeded: number;
  let category: FootprintResult['category'];
  let title: string;
  
  // Calcul plus réaliste basé sur les données du Global Footprint Network
  if (totalScore <= 2) {
    planetsNeeded = 1.2;
    category = 'excellent';
    title = 'Éco-héros galactique';
  } else if (totalScore <= 3.5) {
    planetsNeeded = 1.8;
    category = 'good';
    title = 'Gardien des étoiles';
  } else if (totalScore <= 5) {
    planetsNeeded = 2.5;
    category = 'average';
    title = 'Explorateur modéré';
  } else if (totalScore <= 7) {
    planetsNeeded = 3.2;
    category = 'concerning';
    title = 'Colonisateur interstellaire';
  } else {
    planetsNeeded = Math.min(4.5, 3.5 + (totalScore - 7) * 0.3);
    category = 'critical';
    title = 'Tyran cosmique du CO₂';
  }

  return {
    planetsNeeded: Math.round(planetsNeeded * 10) / 10,
    category,
    title,
    totalScore: Math.round(totalScore * 10) / 10,
    breakdown
  };
}

// Fonction pour obtenir l'équivalent CO2 réel (basé sur des données ADEME/GIEC)
export function getCO2Equivalent(totalScore: number): number {
  // Estimation basée sur l'empreinte carbone moyenne française (11 tonnes CO2/an)
  // et la corrélation avec notre système de points
  return Math.round(totalScore * 1.8 * 1000); // en kg CO2/an
}

// Données de référence pour validation
export const REFERENCE_DATA = {
  // Sources officielles pour validation
  sources: [
    {
      name: "Global Footprint Network",
      url: "https://www.footprintnetwork.org/",
      description: "Données officielles sur l'empreinte écologique mondiale"
    },
    {
      name: "ADEME - Agence de l'environnement",
      url: "https://www.ademe.fr/",
      description: "Données françaises sur l'empreinte carbone"
    },
    {
      name: "Base Carbone ADEME",
      url: "https://www.bilans-ges.ademe.fr/",
      description: "Facteurs d'émission officiels français"
    },
    {
      name: "GIEC - Groupe d'experts intergouvernemental",
      url: "https://www.ipcc.ch/",
      description: "Données scientifiques internationales sur le climat"
    }
  ],
  
  // Moyennes de référence
  averages: {
    world: 1.75, // planètes
    france: 2.9, // planètes
    target: 1.0, // objectif pour 2030
    co2_france: 11000, // kg CO2/an/personne
    co2_world: 4800 // kg CO2/an/personne
  }
};