import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AuditScreen from './screens/AuditScreen';
import ResultScreen from './screens/ResultScreen';       // Step 1: Shown right after 36 questions
import AuthScreen from './screens/AuthScreen';         // Step 2: Triggered to save scores & sign in
import DestinationScreen from './screens/DestinationScreen'; // Step 3: Final routed outcome

export default function App() {
  const [view, setView] = useState('HOME'); // 'HOME', 'AUDIT', 'RESULT', 'AUTH', 'DESTINATION'
  
  // STEP 1: Hold audit scores in top-level state so they persist across screen changes
  const [auditResults, setAuditResults] = useState(null);
  const [userRoute, setUserRoute] = useState(null);
  
  // Set initial language state
  const [lang, setLang] = useState('en'); 

  // Logic to toggle between English and Assamese
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'as' : 'en'));

  const startAudit = () => setView('AUDIT');

  // STEP 1 HANDLER: Captures completed scores from AuditScreen into App.js state
  const handleAuditCompleteLocally = (scores) => {
    setAuditResults(scores); // Saves scores to App state
    setView('RESULT');       // Swapping screen view won't lose auditResults
  };

  // 2. Triggered when user clicks "Save Progress / Unlock Next Steps" on ResultScreen
  const handleProceedToAuth = () => {
    setView('AUTH');
  };

  // Score-based routing calculation
  const determineNextDestination = (scores) => {
    if (!scores) return 'APP_WAITLIST_AND_COMMUNITY';
    
    const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
    const HIGH_LOAD_THRESHOLD = 90; // Threshold out of 180

    if (totalScore >= HIGH_LOAD_THRESHOLD) {
      const highestVector = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
      return (highestVector === 'STRUCTURAL' || highestVector === 'MECHANICAL') 
        ? 'IN_PERSON_VISIT' 
        : 'TELECONSULTATION';
    } else {
      return 'APP_WAITLIST_AND_COMMUNITY';
    }
  };

  // STEP 2 & 3 HANDLER: Merges/passes state upon successful auth
  const handleAuthSuccess = (scoresFromDb, uid) => {
    // Prioritize DB scores, fall back to locally captured auditResults state
    const activeScores = scoresFromDb || auditResults;
    const route = determineNextDestination(activeScores);
    
    setAuditResults(activeScores);
    setUserRoute(route);
    setView('DESTINATION');
  };

  const resetApp = () => {
    setAuditResults(null);
    setUserRoute(null);
    setView('HOME');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      
      {/* HOME SCREEN */}
      {view === 'HOME' && (
        <HomeScreen 
          onStart={startAudit} 
          onLoginSuccess={handleAuthSuccess}
          lang={lang} 
          setLang={toggleLang} 
        />
      )}

      {/* AUDIT SCREEN (Passes completed scores up to App.js via onComplete) */}
      {view === 'AUDIT' && (
        <AuditScreen 
          onComplete={handleAuditCompleteLocally} 
          onExit={resetApp} 
          lang={lang} 
          setLang={toggleLang} 
        />
      )}

      {/* RESULT SCREEN */}
      {view === 'RESULT' && (
        <ResultScreen 
          scores={auditResults} 
          onSaveTrigger={handleProceedToAuth} 
          lang={lang} 
          setLang={toggleLang} 
        />
      )}

      {/* AUTH SCREEN (Passes pendingScores stored in App.js state) */}
      {view === 'AUTH' && (
        <AuthScreen 
          pendingScores={auditResults} 
          lang={lang}
          setLang={toggleLang}
          onAuthSuccess={handleAuthSuccess} 
        />
      )}

      {/* DESTINATION SCREEN */}
      {view === 'DESTINATION' && (
        <DestinationScreen 
          destination={userRoute} 
          scores={auditResults} 
          lang={lang}
          setLang={toggleLang}
          onReset={resetApp} 
        />
      )}

    </SafeAreaView>
  );
}