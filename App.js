import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [view, setView] = useState('home'); // 'home' or 'audit'
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({});

  const VECTORS = ["Physical", "Environmental", "Psychological", "Personal", "Social", "Somatic"];

  // Homepage View
  if (view === 'home') {
    return (  
      <SafeAreaView style={styles.homeContainer}>
        <View style={styles.nav}>
          <Text style={styles.logo}>SOMATIC BHARAT</Text>
          <Text style={styles.tagline}>MISSION 2026</Text>
        </View>

        <ScrollView contentContainerStyle={styles.heroContent}>
          <Text style={styles.eyebrow}>THE SHATKONA PROTOCOL</Text>
          <Text style={styles.heroTitle}>Recalibrating Bharat’s Neuro-Resilience</Text>
          <Text style={styles.heroDesc}>
            Chronic pain is a systemic signal. Identify your 6-Vector Somatic Load 
            and begin your journey toward recovery from CS and Fibromyalgia.
          </Text>
          
          <TouchableOpacity style={styles.mainCta} onPress={() => setView('audit')}>
            <Text style={styles.mainCtaText}>START THE 36-QUESTION AUDIT</Text>
          </TouchableOpacity>

          <View style={styles.statRow}>
            <View style={styles.statBox}><Text style={styles.statNum}>06</Text><Text style={styles.statLabel}>VECTORS</Text></View>
            <View style={styles.statBox}><Text style={styles.statNum}>36</Text><Text style={styles.statLabel}>METRICS</Text></View>
            <View style={styles.statBox}><Text style={styles.statNum}>100%</Text><Text style={styles.statLabel}>CLINICAL</Text></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Audit View
  return (
    <SafeAreaView style={styles.auditRoot}>
      <View style={styles.auditHeader}>
        <TouchableOpacity onPress={() => setView('home')}>
          <Text style={styles.backLink}>← MISSION HOME</Text>
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>Vector {currentStep + 1} of 6</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentStep + 1) / 6) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.auditScroll}>
        <Text style={styles.vectorTitle}>{VECTORS[currentStep]}</Text>
        <Text style={styles.vectorDesc}>Analyzing your {VECTORS[currentStep].toLowerCase()} neuro-load and structural integrity.</Text>

        {/* Question Cards go here - Loop through your 6 questions */}
        <View style={styles.placeholderCard}>
          <Text style={styles.questionText}>Is your range of motion restricted when turning your head left or right?</Text>
          <View style={styles.optionRow}>
            {[0, 1, 2, 3].map(val => (
              <TouchableOpacity key={val} style={styles.optionCircle}><Text>{val}</Text></TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.nextBtn} 
          onPress={() => currentStep < 5 ? setCurrentStep(currentStep + 1) : setView('home')}
        >
          <Text style={styles.nextBtnText}>{currentStep === 5 ? "VIEW RESULTS" : "NEXT VECTOR →"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Home Styles
  homeContainer: { flex: 1, backgroundColor: '#FFF' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', padding: 25, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  logo: { fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  tagline: { fontSize: 12, color: '#888', fontWeight: 'bold' },
  heroContent: { padding: 30, alignItems: 'center', paddingTop: 60 },
  eyebrow: { color: '#E63946', fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 15 },
  heroTitle: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', color: '#1A1A1A', lineHeight: 56 },
  heroDesc: { fontSize: 18, textAlign: 'center', color: '#666', lineHeight: 28, marginVertical: 30, maxWidth: 600 },
  mainCta: { backgroundColor: '#1A1A1A', paddingVertical: 22, paddingHorizontal: 45, borderRadius: 4 },
  mainCtaText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  statRow: { flexDirection: 'row', marginTop: 60, width: '100%', justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '900' },
  statLabel: { fontSize: 10, color: '#AAA', marginTop: 5 },

  // Audit Styles
  auditRoot: { flex: 1, backgroundColor: '#FAFAFA' },
  auditHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  backLink: { fontSize: 12, fontWeight: 'bold', color: '#888' },
  stepIndicator: { fontSize: 12, color: '#1A1A1A', fontWeight: 'bold' },
  progressBar: { height: 4, backgroundColor: '#EEE', width: '100%' },
  progressFill: { height: 4, backgroundColor: '#1A1A1A' },
  auditScroll: { padding: 30 },
  vectorTitle: { fontSize: 42, fontWeight: 'bold', color: '#1A1A1A' },
  vectorDesc: { fontSize: 16, color: '#666', marginBottom: 40 },
  placeholderCard: { backgroundColor: '#FFF', padding: 25, borderRadius: 8, borderWidth: 1, borderColor: '#EEE', marginBottom: 20 },
  questionText: { fontSize: 18, color: '#1A1A1A', marginBottom: 20, lineHeight: 26 },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  optionCircle: { width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
  nextBtn: { backgroundColor: '#1A1A1A', padding: 20, borderRadius: 4, marginTop: 20, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});