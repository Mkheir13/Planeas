import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Questionnaire } from './components/Questionnaire';
import { Results } from './components/Results';
import { AdminPanel } from './components/AdminPanel';
import { OfficialDataBadge } from './components/OfficialDataBadge';
import { UserProfile } from './types';
import { calculateFootprint } from './utils/footprintCalculator';

type AppState = 'landing' | 'questionnaire' | 'results' | 'admin';

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

  const openAdmin = () => {
    setCurrentState('admin');
  };

  const backToApp = () => {
    setCurrentState('landing');
  };

  const footprintResult = calculateFootprint(userProfile);

  // Raccourci clavier pour accéder au panneau admin (Ctrl+Shift+A)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setCurrentState('admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

      {currentState === 'admin' && (
        <AdminPanel onBackToApp={backToApp} />
      )}

      {/* Badge des données officielles - masqué en mode admin */}
      {currentState !== 'admin' && <OfficialDataBadge />}

      {/* Bouton d'accès admin discret (coin bas gauche) */}
      {currentState !== 'admin' && (
        <button
          onClick={openAdmin}
          className="fixed bottom-4 left-4 w-8 h-8 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-md text-slate-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 z-40 opacity-30 hover:opacity-100"
          title="Panneau Admin (Ctrl+Shift+A)"
        >
          <div className="w-2 h-2 bg-current rounded-full"></div>
        </button>
      )}
    </div>
  );
}

export default App;