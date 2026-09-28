import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AuditScreen from './screens/AuditScreen';
import ResultScreen from './screens/ResultScreen';       // Step 1: Shown after audit completion
import AuthScreen from './screens/AuthScreen';         // Step 2: Saves scores & authenticates user
import DestinationScreen from './screens/DestinationScreen'; // Step 3: Final routed outcome

export default function App() {
  const [view, setView] = useState('HOME'); // 'HOME', 'AUDIT', 'RESULT', 'AUTH', 'DESTINATION'
  
  // State management for scores and routing
  const [auditResults, setAuditResults] = useState(null);
  const [userRoute, setUserRoute] = useState(null);
  
  // Language toggle state ('en' | 'as')
  const [lang, setLang] = useState('en'); 

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'as' : 'en'));

  const startAudit = () => {
    setAuditResults(null);
    setView('AUDIT');
  };

  // Step 1: Local capture after audit completion
  const handleAuditCompleteLocally = (scores) => {
    setAuditResults(scores);
    setView('RESULT');
  };

  // Step 2: Navigation to Auth screen from ResultScreen
  const handleProceedToAuth = () => {
    setView('AUTH');
  };

  // Clinical/Somatic vector routing calculation
  const determineNextDestination = (scores) => {
    if (!scores || typeof scores !== 'object') return 'APP_WAITLIST_AND_COMMUNITY';
    
    const scoreValues = Object.values(scores);
    if (scoreValues.length === 0) return 'APP_WAITLIST_AND_COMMUNITY';

    const totalScore = scoreValues.reduce((acc, val) => acc + (Number(val) || 0), 0);
    const HIGH_LOAD_THRESHOLD = 90; // Threshold out of 180

    if (totalScore >= HIGH_LOAD_THRESHOLD) {
      const highestVector = Object.keys(scores).reduce((a, b) => 
        (scores[a] || 0) > (scores[b] || 0) ? a : b
      );

      return (highestVector === 'STRUCTURAL' || highestVector === 'MECHANICAL') 
        ? 'IN_PERSON_VISIT' 
        : 'TELECONSULTATION';
    } else {
      return 'APP_WAITLIST_AND_COMMUNITY';
    }
  };

  // Step 3: Auth completion callback (Merges Firestore data & calculates route)
  const handleAuthSuccess = (scoresFromDb, uid) => {
    // Prioritize DB scores, then local state, or default to null
    const activeScores = scoresFromDb || auditResults || null;
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F8F4" />
      
      {/* HOME SCREEN */}
      {view === 'HOME' && (
        <HomeScreen 
          onStart={startAudit} 
          onLoginSuccess={handleAuthSuccess}
          lang={lang} 
          setLang={toggleLang} 
        />
      )}

      {/* AUDIT SCREEN */}
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

      {/* AUTH SCREEN */}
      {view === 'AUTH' && (
        <AuthScreen 
          pendingScores={auditResults} 
          lang={lang}
          setLang={toggleLang}
          onAuthSuccess={handleAuthSuccess}
          onBack={() => setView(auditResults ? 'RESULT' : 'HOME')} 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F4',
  },
});