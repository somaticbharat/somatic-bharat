import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const VECTORS = [
  "Physical", "Environmental", "Psychological", "Personal", "Social", "Somatic"
];

// Add your 36 questions here in groups of 6
const QUESTIONS = [
  { vector: 0, text: "Do you experience persistent neck/back stiffness?" },
  { vector: 0, text: "Is your range of motion restricted when turning your head?" },
  // ... add all 36 questions mapping to their vector index 0-5
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({});

  const handleScore = (qIndex, value) => {
    setScores({ ...scores, [qIndex]: value });
  };

  const nextStep = () => {
    if (currentStep < VECTORS.length - 1) setCurrentStep(currentStep + 1);
    else calculateResult();
  };

  const calculateResult = () => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    alert(`Your Somatic Resilience Score: ${total}/108. Redirecting to SomaticBharat.org...`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>SOMATIC BHARAT</Text>
        <View style={styles.progressBar}>
           <View style={[styles.progressInner, { width: `${((currentStep + 1) / 6) * 100}%` }]} />
        </View>
      </View>

      <Text style={styles.vectorTitle}>{VECTORS[currentStep]} Vector</Text>

      {/* Render 6 questions for current vector */}
      {QUESTIONS.filter(q => q.vector === currentStep).map((q, idx) => (
        <View key={idx} style={styles.questionCard}>
          <Text style={styles.questionText}>{q.text}</Text>
          <View style={styles.options}>
            {[0, 1, 2, 3].map(val => (
              <TouchableOpacity 
                key={val} 
                style={[styles.optCircle, scores[QUESTIONS.indexOf(q)] === val && styles.activeOpt]}
                onPress={() => handleScore(QUESTIONS.indexOf(q), val)}
              >
                <Text style={scores[QUESTIONS.indexOf(q)] === val ? {color:'#fff'} : {}}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
        <Text style={styles.nextBtnText}>{currentStep === 5 ? "GET MY AUDIT" : "NEXT VECTOR"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FAFAFA', alignItems: 'center' },
  header: { width: '100%', marginBottom: 30, marginTop: 40 },
  brand: { fontSize: 24, fontWeight: '900', textAlign: 'center', letterSpacing: 2 },
  progressBar: { height: 4, backgroundColor: '#E0E0E0', marginTop: 10, borderRadius: 2 },
  progressInner: { height: 4, backgroundColor: '#000', borderRadius: 2 },
  vectorTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, alignSelf: 'flex-start' },
  questionCard: { width: '100%', backgroundColor: '#FFF', padding: 20, borderRadius: 12, marginBottom: 15, elevation: 2 },
  questionText: { fontSize: 16, marginBottom: 15, lineHeight: 22 },
  options: { flexDirection: 'row', justifyContent: 'space-between' },
  optCircle: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 1, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
  activeOpt: { backgroundColor: '#000', borderColor: '#000' },
  nextBtn: { backgroundColor: '#000', width: '100%', padding: 20, borderRadius: 30, marginTop: 20 },
  nextBtnText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }
});