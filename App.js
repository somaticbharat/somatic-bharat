import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [view, setView] = useState('home'); 
  const [currentVector, setCurrentVector] = useState(0);

  const VECTORS = [
    { name: "Physical", desc: "Structural integrity, alignment, and range of motion." },
    { name: "Environmental", desc: "External stressors, workspace ergonomics, and sensory load." },
    { name: "Psychological", desc: "Neuro-resilience, cognitive fatigue, and emotional regulation." },
    { name: "Personal", desc: "Lifestyle, sleep hygiene, and inflammatory markers." },
    { name: "Social", desc: "Support systems, relational safety, and community impact." },
    { name: "Somatic", desc: "Interoception, nervous system state, and trauma-informed recovery." }
  ];

  // --- VIEWS ---

  if (view === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.nav}>
          <Text style={styles.logo}>SOMATIC BHARAT</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>MISSION 2026</Text></View>
        </View>

        <ScrollView contentContainerStyle={styles.hero}>
          <Text style={styles.eyebrow}>THE SHATKONA PROTOCOL</Text>
          <Text style={styles.title}>Recalibrating Bharat’s{"\n"}Neuro-Resilience</Text>
          <Text style={styles.subtitle}>
            A 6-Vector diagnostic framework for recovery from Chronic Pain, CS, and Fibromyalgia. 
            Identify your load. Reset your system.
          </Text>

          <TouchableOpacity style={styles.mainButton} onPress={() => setView('audit')}>
            <Text style={styles.mainButtonText}>START 36-QUESTION AUDIT</Text>
          </TouchableOpacity>

          <View style={styles.grid}>
            {VECTORS.map((v, i) => (
              <View key={i} style={styles.gridItem}>
                <Text style={styles.gridNum}>0{i+1}</Text>
                <Text style={styles.gridLabel}>{v.name.toUpperCase()}</Text>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Founding Architect: Dr. MP Das PT, LLB</Text>
            <Text style={styles.footerSub}>Somatic Bharat Foundation | SIBS Academy</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.auditRoot}>
      <View style={styles.auditHeader}>
        <TouchableOpacity onPress={() => setView('home')}>
          <Text style={styles.backBtn}>← EXIT MISSION</Text>
        </TouchableOpacity>
        <Text style={styles.progressText}>VECTOR {currentVector + 1} OF 6</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((currentVector + 1) / 6) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.auditBody}>
        <Text style={styles.vectorName}>{VECTORS[currentVector].name}</Text>
        <Text style={styles.vectorDescription}>{VECTORS[currentVector].desc}</Text>

        <View style={styles.card}>
          <Text style={styles.question}>Rate your current level of persistent tension or stiffness in this vector (0-10):</Text>
          <View style={styles.scale}>
            {[0, 2, 4, 6, 8, 10].map(val => (
              <TouchableOpacity key={val} style={styles.scaleCircle}>
                <Text style={styles.scaleText}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.nextBtn} 
          onPress={() => currentVector < 5 ? setCurrentVector(currentVector + 1) : setView('home')}
        >
          <Text style={styles.nextBtnText}>
            {currentVector === 5 ? "SUBMIT FOR CLINICAL REVIEW" : "NEXT VECTOR →"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  logo: { fontSize: 16, fontWeight: '900', letterSpacing: 2, color: '#1A1A1A' },
  badge: { backgroundColor: '#000', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 2 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  hero: { padding: 24, alignItems: 'center', paddingTop: 60 },
  eyebrow: { fontSize: 12, fontWeight: 'bold', color: '#E63946', letterSpacing: 3, marginBottom: 20 },
  title: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', color: '#1A1A1A', lineHeight: 44 },
  subtitle: { fontSize: 17, color: '#666', textAlign: 'center', lineHeight: 26, marginVertical: 30, maxWidth: 500 },
  mainButton: { backgroundColor: '#1A1A1A', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 8, elevation: 5 },
  mainButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15, letterSpacing: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 50, gap: 15 },
  gridItem: { width: width * 0.28, padding: 15, backgroundColor: '#F9F9F9', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  gridNum: { fontSize: 18, fontWeight: '900', color: '#DDD' },
  gridLabel: { fontSize: 9, fontWeight: 'bold', color: '#555', marginTop: 5 },
  footer: { marginTop: 80, alignItems: 'center' },
  footerText: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A' },
  footerSub: { fontSize: 12, color: '#AAA', marginTop: 5 },
  // Audit Styles
  auditRoot: { flex: 1, backgroundColor: '#FDFDFD' },
  auditHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  backBtn: { fontSize: 11, fontWeight: 'bold', color: '#999' },
  progressText: { fontSize: 11, fontWeight: 'bold', color: '#1A1A1A' },
  progressTrack: { height: 3, backgroundColor: '#EEE', width: '100%' },
  progressFill: { height: 3, backgroundColor: '#1A1A1A' },
  auditBody: { padding: 25 },
  vectorName: { fontSize: 48, fontWeight: 'bold', color: '#1A1A1A' },
  vectorDescription: { fontSize: 16, color: '#666', marginBottom: 40, lineHeight: 24 },
  card: { backgroundColor: '#FFF', padding: 25, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, marginBottom: 30 },
  question: { fontSize: 18, fontWeight: '500', color: '#333', marginBottom: 25, lineHeight: 26 },
  scale: { flexDirection: 'row', justifyContent: 'space-between' },
  scaleCircle: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, borderColor: '#EEE', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FBFBFB' },
  scaleText: { fontSize: 14, fontWeight: 'bold', color: '#555' },
  nextBtn: { backgroundColor: '#E63946', padding: 20, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});