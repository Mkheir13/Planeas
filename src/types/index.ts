export interface UserProfile {
  // Identity
  gender: 'homme' | 'femme' | null;
  age: number | null;
  relationship: 'celibataire' | 'couple' | null;
  
  // Housing
  householdSize: number | null;
  homeArea: number | null;
  heatingType: 'electricite' | 'gaz' | 'fioul' | 'bois' | 'pompe-chaleur' | 'aucun' | null;
  homeInsulation: 'oui' | 'non' | 'ne-sais-pas' | null;
  
  // Transport
  ownsCar: boolean | null;
  carType: 'essence' | 'diesel' | 'electrique' | null;
  weeklyKm: number | null;
  flightFrequency: 'jamais' | '1-2' | '3-5' | 'plus-5' | null;
  publicTransportUsage: 'jamais' | 'parfois' | 'souvent' | 'toujours' | null;
  cruiseFrequency: 'jamais' | '1-2' | '3-5' | 'plus-5' | null;
  
  // Food
  meatMealsPerWeek: number | null;
  dailyAnimalProducts: boolean | null;
  bioLocalFrequency: 'jamais' | 'parfois' | 'souvent' | 'toujours' | null;
  foodWasteFrequency: 'jamais' | 'parfois' | 'souvent' | null;
  
  // Consumption
  clothingFrequency: 'chaque-mois' | '2-3-mois' | '1-2-an' | 'jamais' | null;
  buyNewElectronics: boolean | null;
  repairFrequency: 'jamais' | 'parfois' | 'souvent' | null;
  secondHandFrequency: 'jamais' | 'parfois' | 'souvent' | 'toujours' | null;
  
  // Waste
  sortWaste: 'oui' | 'non' | 'partiellement' | null;
  trashBagsPerWeek: number | null;
  lowPackagingFrequency: 'jamais' | 'parfois' | 'souvent' | 'toujours' | null;
}

export interface DidYouKnowFact {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: string;
}

export interface FootprintResult {
  planetsNeeded: number;
  category: 'excellent' | 'good' | 'average' | 'concerning' | 'critical';
  title: string;
  totalScore: number;
  breakdown: {
    housing: number;
    transport: number;
    food: number;
    consumption: number;
    waste: number;
  };
}