import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Questionnaire } from './components/Questionnaire';
import { Results } from './components/Results';
import { OfficialDataBadge } from './components/OfficialDataBadge';
import { UserProfile } from './types';
import { calculateFootprint } from './utils/footprintCalculator';

type AppState = 'landing' | 'questionnaire' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    gender: null,
    age: null,
    relationship: null,
    householdSize: null,
    homeArea: null,
    heatingType: null,
    homeInsulation: null,
    ownsCar: null,
    carType: null,
    weeklyKm: null,
    flightFrequency: null,
    publicTransportUsage: null,
    cruiseFrequency: null,
    meatMealsPerWeek: null,
    dailyAnimalProducts: null,
    bioLocalFrequency: null,
    foodWasteFrequency: null,
    clothingFrequency: null,
    buyNewElectronics: null,
    repairFrequency: null,
    secondHandFrequency: null,
    sortWaste: null,
    trashBagsPerWeek: null,
    lowPackagingFrequency: null
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const startQuestionnaire = () => {
    setCurrentState('questionnaire');
  };

  const completeQuestionnaire = () => {
    setCurrentState('results');
  };

  const restart = () => {
    setUserProfile({
      gender: null,
      age: null,
      relationship: null,
      householdSize: null,
      homeArea: null,
      heatingType: null,
      homeInsulation: null,
      ownsCar: null,
      carType: null,
      weeklyKm: null,
      flightFrequency: null,
      publicTransportUsage: null,
      cruiseFrequency: null,
      meatMealsPerWeek: null,
      dailyAnimalProducts: null,
      bioLocalFrequency: null,
      foodWasteFrequency: null,
      clothingFrequency: null,
      buyNewElectronics: null,
      repairFrequency: null,
      secondHandFrequency: null,
      sortWaste: null,
      trashBagsPerWeek: null,
      lowPackagingFrequency: null
    });
    setCurrentState('landing');
  };

  const footprintResult = calculateFootprint(userProfile);

  return (
    <div className="App">
      {currentState === 'landing' && (
        <LandingPage onStart={startQuestionnaire} />
      )}
      
      {currentState === 'questionnaire' && (
        <Questionnaire
          profile={userProfile}
          updateProfile={updateProfile}
          onComplete={completeQuestionnaire}
        />
      )}
      
      {currentState === 'results' && (
        <Results
          result={footprintResult}
          profile={userProfile}
          onRestart={restart}
        />
      )}

      {/* Badge des données officielles */}
      <OfficialDataBadge />
    </div>
  );
}

export default App;