import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MATTE_GOLD = '#C5A059';
const DEEP_BLUE = '#002147';

export default function VectorBar({ label, score, max = 30 }) {
  const percentage = (score / max) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.score}>{score} / {max}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15, width: '100%' },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { fontSize: 10, fontWeight: '900', color: DEEP_BLUE, letterSpacing: 1 },
  score: { fontSize: 10, color: '#666', fontWeight: '700' },
  track: { height: 8, backgroundColor: '#EEE', borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: MATTE_GOLD, borderRadius: 4 },
});