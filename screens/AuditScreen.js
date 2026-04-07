import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';

const QUESTIONS = [
  // MECHANICAL VECTOR
  { v: 'MECHANICAL', q: "Do you feel a 'locking' sensation in your joints during routine movement?" },
  { v: 'MECHANICAL', q: "Is your pain localized to specific tendons or ligaments rather than broad areas?" },
  { v: 'MECHANICAL', q: "Do you experience sharp, needle-like pain when lifting even light objects?" },
  { v: 'MECHANICAL', q: "Does your posture feel 'collapsed' or heavy by the end of the day?" },
  { v: 'MECHANICAL', q: "Have you noticed a visible loss of range of motion in your neck or hips?" },
  { v: 'MECHANICAL', q: "Does physical rest fail to resolve the stiffness you feel in the morning?" },
  // ANCESTRAL VECTOR
  { v: 'ANCESTRAL', q: "Do you suffer from health patterns similar to those of your parents or grandparents?" },
  { v: 'ANCESTRAL', q: "Do you experience 'unearned' anxiety—anxiety without a direct current trigger?" },
  { v: 'ANCESTRAL', q: "Do you feel a deep-seated 'survivalist' urge even when you are secure?" },
  { v: 'ANCESTRAL', q: "Are there recurring 'anniversary' symptoms (getting sick same time every year)?" },
  { v: 'ANCESTRAL', q: "Do you feel a heavy emotional burden that doesn't seem to belong to your life events?" },
  { v: 'ANCESTRAL', q: "Have you been told you have a 'family temperament' involving high stress?" },
  // NEURAL VECTOR
  { v: 'NEURAL', q: "Does your pain 'migrate' or travel from one part of the body to another?" },
  { v: 'NEURAL', q: "Are you hypersensitive to bright lights, loud noises, or strong smells?" },
  { v: 'NEURAL', q: "Do you startle easily or feel constantly 'on edge' (The Beta State)?" },
  { v: 'NEURAL', q: "Does your skin feel painful or tender to even a very light touch?" },
  { v: 'NEURAL', q: "Do you experience 'Brain Fog' or difficulty finding words under mild stress?" },
  { v: 'NEURAL', q: "Is your sleep frequently interrupted by a mind that won't stop racing?" },
  // ATMOSPHERIC VECTOR
  { v: 'ATMOSPHERIC', q: "Does your pain increase significantly with changes in weather or pressure?" },
  { v: 'ATMOSPHERIC', q: "Do you feel physically drained after being in crowded or high-EMF environments?" },
  { v: 'ATMOSPHERIC', q: "Are you prone to 'sensory overwhelm' in shopping malls or busy offices?" },
  { v: 'ATMOSPHERIC', q: "Do you feel significantly better when you are away from your primary city?" },
  { v: 'ATMOSPHERIC', q: "Does 'blue light' from screens trigger immediate headaches or eye strain?" },
  { v: 'ATMOSPHERIC', q: "Are you highly sensitive to synthetic fragrances or cleaning chemicals?" },
  // STRUCTURAL VECTOR
  { v: 'STRUCTURAL', q: "Do you feel like your body is 'wrapped in tight plastic' or restricted?" },
  { v: 'STRUCTURAL', q: "Have you noticed your height decreasing or your shoulders rounding forward?" },
  { v: 'STRUCTURAL', q: "Do you have 'trigger points' (knots) that feel like hard marbles under the skin?" },
  { v: 'STRUCTURAL', q: "Does your breathing feel shallow, as if your ribcage is 'stiff'?" },
  { v: 'STRUCTURAL', q: "Do you experience 'clicking' or 'popping' in your jaw (TMJ)?" },
  { v: 'STRUCTURAL', q: "Is there a noticeable difference in the length of your legs or hip levels?" },
  // HUMORAL VECTOR
  { v: 'HUMORAL', q: "Do you experience unexplained puffiness or swelling in your hands or face?" },
  { v: 'HUMORAL', q: "Is your digestion inconsistent (bloating/acidity) regardless of what you eat?" },
  { v: 'HUMORAL', q: "Do you feel a sense of 'internal heat' or low-grade feverishness?" },
  { v: 'HUMORAL', q: "Do you struggle with skin breakouts or rashes when your stress levels rise?" },
  { v: 'HUMORAL', q: "Is your recovery from a simple cold or flu unusually slow?" },
  { v: 'HUMORAL', q: "Do you feel 'tired but wired'—exhausted but unable to achieve deep sleep?" }
];

export default function AuditScreen({ onComplete }) { // Changed from {navigation}
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ 
    MECHANICAL: 0, ANCESTRAL: 0, NEURAL: 0, 
    ATMOSPHERIC: 0, STRUCTURAL: 0, HUMORAL: 0 
  });

  const handleAnswer = (val) => {
    const vector = QUESTIONS[current].v;
    const newScores = { ...scores, [vector]: scores[vector] + val };
    
    if (current < QUESTIONS.length - 1) {
      setScores(newScores);
      setCurrent(current + 1);
    } else {
      // Send the results back to App.js
      onComplete(newScores); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>VECTOR: {QUESTIONS[current].v}</Text>
        <Text style={styles.stepText}>STEP {current + 1} / 36</Text>
        <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((current + 1) / 36) * 100}%` }]} />
        </View>
      </View>

      <View style={styles.qBox}>
        <Text style={styles.qText}>{QUESTIONS[current].q}</Text>
        <View style={styles.options}>
          {[
            {l:'NEVER', v:0}, {l:'RARELY', v:1}, {l:'OFTEN', v:3}, {l:'CHRONIC', v:5}
          ].map((opt) => (
            <TouchableOpacity key={opt.l} style={styles.optBtn} onPress={() => handleAnswer(opt.v)}>
              <Text style={styles.optLabel}>{opt.l}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8F4' },
  header: { padding: 20, borderBottomWidth: 1, borderColor: '#EEE', alignItems: 'center' },
  progressText: { color: MATTE_GOLD, fontWeight: '900', fontSize: 11, letterSpacing: 1.5 },
  stepText: { color: '#999', fontSize: 10, marginTop: 4, fontWeight: '600' },
  progressBar: { height: 4, width: '100%', backgroundColor: '#EEE', marginTop: 15, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#004D40' },
  qBox: { flex: 1, justifyContent: 'center', padding: 30 },
  qText: { fontSize: 22, fontWeight: '800', color: DEEP_BLUE, marginBottom: 40, textAlign: 'center', lineHeight: 32 },
  options: { width: '100%' },
  optBtn: { backgroundColor: '#FFF', padding: 18, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#E0E0E0' },
  optLabel: { textAlign: 'center', fontWeight: '900', color: DEEP_BLUE, fontSize: 13 }
});