import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';
const BG_CREAM = '#F9F8F4';

// --- WHATSAPP COMMUNITY LINK ---
const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/KmsMlhwZDrE69Hcr98pEy7?s=hd&p=i&mlu=4';

export default function DestinationScreen({ destination, scores, onReset }) {
  // Calculate total score just for display reference
  const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);

  const handleWhatsAppJoin = () => {
    Linking.openURL(WHATSAPP_COMMUNITY_URL).catch(() => {
      alert("Unable to open WhatsApp link.");
    });
  };

  const handleBookingRedirect = (type) => {
    if (type === 'IN_PERSON') {
      // Directs to Shatkona Center / Tanman Physiotherapy Clinic, Bhetapara
      Linking.openURL('https://shatkonalife.com/book-in-person');
    } else {
      // Directs to Teleconsultation booking
      Linking.openURL('https://shatkonalife.com/teleconsult');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <Text style={styles.brandTitle}>SOMATIC BHARAT</Text>
          <View style={styles.goldDivider} />
        </View>

        {destination === 'APP_WAITLIST_AND_COMMUNITY' ? (
          /* --- PATH A: LOW TO MODERATE LOAD (WAITLIST & COMMUNITY) --- */
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="account-group" size={40} color={MATTE_GOLD} />
            </View>
            <Text style={styles.cardTitle}>You're on the Waitlist!</Text>
            <Text style={styles.cardSubtitle}>
              Your audit indicates a mild-to-moderate foundational strain. You are a perfect candidate for our upcoming guided protocols on the ShatkonaLife app.
            </Text>

            <View style={styles.scoreSummaryBox}>
              <Text style={styles.scoreSummaryLabel}>Your Systemic Load Score: {totalScore} / 180</Text>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleWhatsAppJoin}>
              <MaterialCommunityIcons name="whatsapp" size={22} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.primaryBtnText}>Join WhatsApp Community</Text>
            </TouchableOpacity>
            
            <Text style={styles.communityHint}>
              Get direct somatic tips, early beta access, and connect with fellow practitioners in Assam.
            </Text>
          </View>
        ) : (
          /* --- PATH B: HIGH SYSTEM LOAD (CLINICAL INTERVENTION) --- */
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="stethoscope" size={40} color="#D32F2F" />
            </View>
            <Text style={styles.cardTitle}>Clinical Attention Recommended</Text>
            <Text style={styles.cardSubtitle}>
              Your audit reveals a high systemic load across your vectors. Specialized professional guidance is recommended to help restore your nervous system baseline.
            </Text>

            <View style={styles.scoreSummaryBox}>
              <Text style={styles.scoreSummaryLabel}>Your Systemic Load Score: {totalScore} / 180</Text>
            </View>

            {destination === 'IN_PERSON_VISIT' ? (
              <TouchableOpacity style={styles.clinicalBtn} onPress={() => handleBookingRedirect('IN_PERSON')}>
                <MaterialCommunityIcons name="map-marker-radius" size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.primaryBtnText}>Book In-Person Visit (Bhetapara Center)</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.clinicalBtn} onPress={() => handleBookingRedirect('TELECON')}>
                <MaterialCommunityIcons name="video-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.primaryBtnText}>Book Expert Teleconsultation</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.communityHint}>
              Shatkona Center / Tanman Physiotherapy Clinic, Bhetapara, Guwahati.
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetText}>Retake Audit</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_CREAM },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  brandHeader: { alignItems: 'center', marginBottom: 30 },
  brandTitle: { fontSize: 13, fontWeight: '900', color: MATTE_GOLD, letterSpacing: 3 },
  goldDivider: { width: 50, height: 2, backgroundColor: MATTE_GOLD, marginTop: 6 },
  card: { 
    width: '100%', maxWidth: 450, backgroundColor: '#FFF', 
    borderRadius: 16, padding: 30, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10,
    elevation: 6, borderWidth: 1, borderColor: '#E6DFD5'
  },
  iconContainer: { 
    width: 70, height: 70, borderRadius: 35, backgroundColor: '#F4F1EA', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 20 
  },
  cardTitle: { fontSize: 22, fontWeight: '800', color: DEEP_BLUE, textAlign: 'center', marginBottom: 12 },
  cardSubtitle: { fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  scoreSummaryBox: { backgroundColor: '#F9F8F4', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginBottom: 25, width: '100%', alignItems: 'center' },
  scoreSummaryLabel: { color: DEEP_BLUE, fontWeight: '700', fontSize: 13 },
  primaryBtn: { 
    flexDirection: 'row', backgroundColor: '#25D366', paddingVertical: 14, paddingHorizontal: 20, 
    borderRadius: 10, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 12 
  },
  clinicalBtn: { 
    flexDirection: 'row', backgroundColor: DEEP_BLUE, paddingVertical: 14, paddingHorizontal: 20, 
    borderRadius: 10, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 12 
  },
  primaryBtnText: { color: '#FFF', fontWeight: '800', fontSize: 14 },
  communityHint: { fontSize: 11, color: '#777', textAlign: 'center', marginTop: 8, lineHeight: 16 },
  resetBtn: { marginTop: 25, padding: 10 },
  resetText: { color: DEEP_BLUE, fontWeight: '700', fontSize: 13, textDecorationLine: 'underline' }
});