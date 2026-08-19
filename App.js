import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AuditScreen from './screens/AuditScreen';
import ResultScreen from './screens/ResultScreen';       // Step 1: Shown right after 36 questions
import AuthScreen from './screens/AuthScreen';           // Step 2: Triggered to save scores & sign in
import DestinationScreen from './screens/DestinationScreen'; // Step 3: Final routed outcome

export default function App() {
  const [view, setView] = useState('HOME'); // 'HOME', 'AUDIT', 'RESULT', 'AUTH', 'DESTINATION'
  const [auditResults, setAuditResults] = useState(null);
  const [userRoute, setUserRoute] = useState(null);
  
  // Set Assamese ('as') as the global initial state
  const [lang, setLang] = useState('as'); 

  // Logic to toggle between English and Assamese
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'as' : 'en'));

  const startAudit = () => setView('AUDIT');
  
  // 1. Triggered when user finishes the 36th question -> Shows Result Screen immediately
  const handleAuditCompleteLocally = (scores) => {
    setAuditResults(scores);
    setView('RESULT');
  };

  // 2. Triggered when user clicks "Save Progress / Unlock Next Steps" on the Result Screen
  const handleProceedToAuth = () => {
    setView('AUTH');
  };

  // Score-based routing calculation
  const determineNextDestination = (scores) => {
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

  // 3. Triggered when authentication and score-saving succeed in AuthScreen
  const handleAuthSuccess = (scores, uid) => {
    const route = determineNextDestination(scores);
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
          lang={lang} 
          setLang={toggleLang} 
        />
      )}

      {/* AUDIT SCREEN (Handles 36 questions) */}
      {view === 'AUDIT' && (
        <AuditScreen 
          onComplete={handleAuditCompleteLocally} 
          onExit={resetApp} 
          lang={lang} 
          setLang={toggleLang} 
        />
      )}

      {/* RESULT SCREEN (Shown immediately without forcing login first) */}
      {view === 'RESULT' && (
        <ResultScreen 
          scores={auditResults} 
          onSaveTrigger={handleProceedToAuth} 
          lang={lang} 
        />
      )}

      {/* AUTH SCREEN / MODAL (Appears when user clicks to save results) */}
      {view === 'AUTH' && (
        <AuthScreen 
          pendingScores={auditResults} 
          lang={lang}
          onAuthSuccess={handleAuthSuccess} 
        />
      )}

      {/* DESTINATION SCREEN (Waitlist / WhatsApp or Clinical Booking based on score) */}
      {view === 'DESTINATION' && (
        <DestinationScreen 
          destination={userRoute} 
          scores={auditResults} 
          onReset={resetApp} 
        />
      )}

    </SafeAreaView>
  );
}