import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AuditScreen from './screens/AuditScreen';
import ResultScreen from './screens/ResultScreen';

export default function App() {
  const [view, setView] = useState('HOME');
  const [auditResults, setAuditResults] = useState(null);
  
  // 1. SET ASSAMESE ('as') AS THE GLOBAL INITIAL STATE
  const [lang, setLang] = useState('as'); 

  // 2. Logic to toggle between English and Assamese
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'as' : 'en'));

  const startAudit = () => setView('AUDIT');
  
  const finishAudit = (scores) => {
    setAuditResults(scores);
    setView('RESULT');
  };

  const resetApp = () => {
    setAuditResults(null);
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

      {/* AUDIT SCREEN */}
      {view === 'AUDIT' && (
        <AuditScreen 
          onComplete={finishAudit} 
          onExit={resetApp} 
          lang={lang} 
          setLang={toggleLang} 
        />
      )}

      {/* RESULT SCREEN */}
      {view === 'RESULT' && (
        <ResultScreen 
          scores={auditResults} 
          onReset={resetApp} 
          lang={lang} 
        />
      )}

    </SafeAreaView>
  );
}