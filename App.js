import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

// IMPORT YOUR THREE SCREENS
import HomeScreen from './screens/HomeScreen';
import AuditScreen from './screens/AuditScreen';
import ResultScreen from './screens/ResultScreen';

export default function App() {
  const [view, setView] = useState('HOME'); // HOME, AUDIT, RESULT
  const [auditResults, setAuditResults] = useState(null);

  // 1. Logic to start Audit from Home
  const startAudit = () => setView('AUDIT');

  // 2. Logic to handle results coming from AuditScreen
  const finishAudit = (scores) => {
    setAuditResults(scores);
    setView('RESULT');
  };

  // 3. Logic to restart from ResultScreen
  const resetApp = () => {
    setAuditResults(null);
    setView('HOME');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      
      {/* NAVIGATION LOGIC */}
      {view === 'HOME' && (
        <HomeScreen onStart={startAudit} />
      )}

      {view === 'AUDIT' && (
        <AuditScreen onComplete={finishAudit} />
      )}

      {view === 'RESULT' && (
        <ResultScreen scores={auditResults} onReset={resetApp} />
      )}

    </SafeAreaView>
  );
}