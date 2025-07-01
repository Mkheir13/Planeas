import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart3, Lightbulb, Target } from 'lucide-react';
import { UserProfile } from '../types';
import { ProgressBar } from './ProgressBar';
import { IdentityQuestions } from './questions/IdentityQuestions';
import { HousingQuestions } from './questions/HousingQuestions';
import { TransportQuestions } from './questions/TransportQuestions';
import { FoodQuestions } from './questions/FoodQuestions';
import { ConsumptionQuestions } from './questions/ConsumptionQuestions';
import { WasteQuestions } from './questions/WasteQuestions';
import { DidYouKnowCard } from './DidYouKnowCard';
import { didYouKnowFacts } from '../data/didYouKnow';

interface QuestionnaireProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  onComplete: () => void;
}

export function Questionnaire({ profile, updateProfile, onComplete }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const steps = [
    { component: IdentityQuestions, title: 'Profil personnel', category: 'identity', emoji: '👤', color: 'from-slate-600 to-slate-700' },
    { component: HousingQuestions, title: 'Logement', category: 'logement', emoji: '🏠', color: 'from-emerald-600 to-emerald-700' },
    { component: TransportQuestions, title: 'Mobilité', category: 'transport', emoji: '🚗', color: 'from-blue-600 to-blue-700' },
    { component: FoodQuestions, title: 'Alimentation', category: 'alimentation', emoji: '🍽️', color: 'from-orange-600 to-orange-700' },
    { component: ConsumptionQuestions, title: 'Consommation', category: 'consommation', emoji: '🛍️', color: 'from-purple-600 to-purple-700' },
    { component: WasteQuestions, title: 'Déchets', category: 'déchets', emoji: '♻️', color: 'from-teal-600 to-teal-700' }
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;
  const currentStepData = steps[currentStep - 1];

  const goNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const goPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRandomFact = () => {
    const currentCategory = steps[currentStep - 1].category;
    const categoryFacts = didYouKnowFacts.filter(fact => 
      fact.category === currentCategory
    );
    
    if (categoryFacts.length > 0) {
      return categoryFacts[Math.floor(Math.random() * categoryFacts.length)];
    }
    
    return didYouKnowFacts[Math.floor(Math.random() * didYouKnowFacts.length)];
  };

  const randomFact = getRandomFact();

  // Calcul du score de progression
  const getCompletionScore = () => {
    const fields = Object.values(profile);
    const completedFields = fields.filter(field => field !== null).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const completionScore = getCompletionScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Fond professionnel avec grille subtile */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grille de points subtile */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Quelques éléments géométriques discrets */}
        <div className="absolute top-1/4 left-1/4 w-16 sm:w-32 h-16 sm:h-32 border border-white/5 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 sm:w-24 h-12 sm:h-24 border border-white/5 rotate-45"></div>
        <div className="absolute top-1/2 right-1/3 w-8 sm:w-16 h-8 sm:h-16 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-7xl">
        {/* Header professionnel */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${currentStepData.color} rounded-lg flex items-center justify-center shadow-lg`}>
              <div className="text-xl sm:text-2xl">{currentStepData.emoji}</div>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{currentStepData.title}</h1>
              <p className="text-slate-400 text-sm">Évaluation de l'empreinte écologique</p>
            </div>
          </div>
          
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          {/* Navigation par étapes épurée */}
          <div className="flex justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index + 1)}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 ${
                  index + 1 === currentStep
                    ? `bg-gradient-to-r ${step.color} text-white shadow-md`
                    : index + 1 < currentStep
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
                title={step.title}
              >
                {index + 1 < currentStep ? '✓' : index + 1}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid xl:grid-cols-4 gap-6 sm:gap-8">
          {/* Colonne principale - Questions */}
          <div className="xl:col-span-3">
            <div className="mb-8 sm:mb-12">
              <CurrentStepComponent profile={profile} updateProfile={updateProfile} />
            </div>
            
            {/* Navigation simple et professionnelle */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <button
                onClick={goPrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto justify-center ${
                  currentStep === 1
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'
                }`}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Précédent</span>
              </button>
              
              <div className="text-center order-first sm:order-none">
                <div className="text-slate-400 text-sm font-medium">
                  Étape {currentStep} sur {totalSteps}
                </div>
              </div>
              
              <button
                onClick={goNext}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${currentStepData.color} text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto justify-center`}
              >
                <span className="text-sm sm:text-base">{currentStep === totalSteps ? 'Calculer mon empreinte' : 'Suivant'}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                {currentStep === totalSteps && <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
          
          {/* Sidebar informative et motivante */}
          <div className="space-y-4 sm:space-y-6">
            <div className="sticky top-4 sm:top-8 space-y-4 sm:space-y-6">
              {/* Le saviez-vous */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                  Le saviez-vous ?
                </h3>
                <DidYouKnowCard
                  question={randomFact.question}
                  answer={randomFact.answer}
                  icon={randomFact.icon}
                />
              </div>

              {/* Progression motivante */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl p-4 sm:p-6 border border-emerald-500/30">
                <h4 className="font-semibold text-emerald-100 mb-3 flex items-center text-sm sm:text-base">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Votre progression
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200 text-xs sm:text-sm">Profil complété</span>
                    <span className="text-emerald-400 font-bold text-sm sm:text-base">{completionScore}%</span>
                  </div>
                  <div className="w-full bg-emerald-900/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionScore}%` }}
                    />
                  </div>
                  <p className="text-emerald-300 text-xs">
                    Plus votre profil est complet, plus votre évaluation sera précise.
                  </p>
                </div>
              </div>

              {/* Conseils contextuels */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 sm:p-6 border border-blue-500/30">
                <h4 className="font-semibold text-blue-100 mb-3 text-sm sm:text-base">💡 Conseil</h4>
                <div className="text-blue-200 text-xs sm:text-sm">
                  {currentStep === 1 && "Soyez honnête dans vos réponses pour obtenir une évaluation précise de votre impact environnemental."}
                  {currentStep === 2 && "Le logement représente environ 25% de notre empreinte carbone. Chaque détail compte !"}
                  {currentStep === 3 && "Les transports sont souvent le poste le plus impactant. Vos choix de mobilité font la différence."}
                  {currentStep === 4 && "L'alimentation représente 25% de notre empreinte. Même de petits changements ont un impact significatif."}
                  {currentStep === 5 && "La consommation responsable peut réduire votre empreinte de 15%. Chaque achat compte."}
                  {currentStep === 6 && "La gestion des déchets, bien que représentant 5% de l'empreinte, reflète votre engagement écologique."}
                </div>
              </div>

              {/* Motivation selon l'étape */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 sm:p-6 border border-purple-500/30">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-2">
                    {currentStep <= 2 ? '🚀' : currentStep <= 4 ? '⭐' : '🏆'}
                  </div>
                  <p className="text-purple-200 text-xs sm:text-sm font-medium">
                    {currentStep <= 2 && "Excellent début ! Continuez sur cette lancée."}
                    {currentStep > 2 && currentStep <= 4 && "Vous progressez bien ! Plus que quelques étapes."}
                    {currentStep > 4 && "Presque terminé ! Votre évaluation sera bientôt prête."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}