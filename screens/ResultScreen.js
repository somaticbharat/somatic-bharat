import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// LIVEN VITALITY PALETTE
const EARTH_DARK = '#001D21';   // Deep Grounding Cyan/Black
const VITAL_TEAL = '#0be1f5';   // Prana / Fluidity
const MOSS_GLOW = '#83C5BE';    // Growth / Vagal Tone
const COPPER_SUN = '#78e2ad';   // Heat / Healing / Shatkona
const MIST_SILVER = '#EDF6F9';  // Clarity

export default function ResultScreen({ scores, onReset }) {
  
  // --- SAFETY GUARD: PREVENTS BLANK SCREEN IF DATA IS MISSING ---
  if (!scores || Object.keys(scores).length === 0) {
    return (
      <View style={[styles.fullContainer, { justifyContent: 'center', alignItems: 'center', backgroundColor: EARTH_DARK }]}>
        <Text style={{ color: MOSS_GLOW, letterSpacing: 2 }}>CALCULATING SOMATIC LOAD...</Text>
      </View>
    );
  }

  // 1. CALCULATE TOTAL LOAD
  const scoreValues = Object.values(scores);
  const totalScore = scoreValues.reduce((a, b) => a + b, 0);
  const maxPossible = 180;
  const loadPercentage = Math.round((totalScore / maxPossible) * 100);

  // 2. EXTERNAL LINKS
  const openWhatsApp = () => {
    Linking.openURL("https://chat.whatsapp.com/JldO7J7jOuEJUX93dwAikD?mode=gi_t");
  };

  const openMaps = () => {
    const addr = "FasciaMax Studio, H No. 43, Rudrapur Bylane, Bhetapara, Guwahati, Assam 781028";
    const url = Platform.select({
      ios: `maps:0?q=${encodeURIComponent(addr)}`,
      android: `geo:0,0?q=${encodeURIComponent(addr)}`
    });
    Linking.openURL(url);
  };

  return (
    <LinearGradient colors={[EARTH_DARK, '#002F35']} style={styles.fullContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.headerText}>SOMATIC VITALITY AUDIT</Text>

        {/* LIVEN GLOW SCORE RING */}
        <View style={styles.scoreContainer}>
          <View style={styles.outerRing}>
            <Text style={styles.percentageText}>{loadPercentage}%</Text>
            <Text style={styles.loadLabel}>SYSTEMIC LOAD</Text>
          </View>
        </View>

        {/* SOMATIC PRESCRIPTION BOX */}
        <View style={styles.prescriptionBox}>
          <Text style={styles.prescriptionTitle}>VITALITY PRESCRIPTION</Text>
          <Text style={styles.prescriptionBody}>
            {loadPercentage > 60 
              ? "High systemic load detected. Your 'NF-kB Fire' requires a clinical reset. We recommend a focused 1-on-1 session to restore your neural baseline."
              : "Moderate tension patterns identified. Recalibration through Vagal Toning and guided fascia release will optimize your recovery."}
          </Text>
        </View>

        {/* CONSULTATION OPTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RESTORE YOUR PRANA</Text>
          
          {/* IN-PERSON AT BHETAPARA */}
          <TouchableOpacity style={styles.optionCard} onPress={openMaps}>
            <View style={styles.optionInfo}>
              <Text style={styles.optionType}>FASCIAMAX STUDIO (IN-PERSON)</Text>
              <Text style={styles.addressText}>#43, Rudrapur Bylane, Bhetapara, Guwahati</Text>
            </View>
            <View style={styles.iconCircle}><Text>📍</Text></View>
          </TouchableOpacity>

          {/* ONLINE VIA CALENDLY */}
          <TouchableOpacity 
            style={styles.optionCard} 
            onPress={() => Linking.openURL('https://calendly.com/shatvayu/fasciamax-consult')}
          >
            <View style={styles.optionInfo}>
              <Text style={styles.optionType}>ONLINE CLINICAL RESET</Text>
              <Text style={styles.addressText}>Global Tele-Somatic Session</Text>
            </View>
            <View style={styles.iconCircle}><Text>🌐</Text></View>
          </TouchableOpacity>
        </View>

        {/* COMMUNITY ACCESS (COPPER GRADIENT) */}
        <TouchableOpacity style={styles.communityBtn} onPress={openWhatsApp}>
          <LinearGradient 
            colors={[COPPER_SUN, '#D17B5D']} 
            start={{x:0, y:0}} end={{x:1, y:0}} 
            style={styles.gradientBtn}
          >
            <Text style={styles.communityBtnText}>JOIN MASTERCLASS COMMUNITY</Text>
            <Text style={styles.communitySubText}>Priority Access to Somatic Bharat App</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
          <Text style={styles.resetText}>RETAKE AUDIT</Text>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullContainer: { flex: 1 },
  scrollContent: { padding: 25, alignItems: 'center', paddingTop: 60 },
  headerText: { color: MOSS_GLOW, fontSize: 13, fontWeight: '900', letterSpacing: 3, marginBottom: 40 },
  
  scoreContainer: { marginBottom: 40 },
  outerRing: { 
    width: 150, height: 150, borderRadius: 75, 
    borderWidth: 2, borderColor: VITAL_TEAL, 
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(131, 197, 190, 0.05)'
  },
  percentageText: { color: MIST_SILVER, fontSize: 38, fontWeight: '200' },
  loadLabel: { color: MOSS_GLOW, fontSize: 9, letterSpacing: 1, marginTop: 5, fontWeight: '700' },

  prescriptionBox: { 
    width: '100%', padding: 25, borderRadius: 15, 
    backgroundColor: 'rgba(131, 197, 190, 0.08)', 
    borderWidth: 1, borderColor: 'rgba(131, 197, 190, 0.2)',
    marginBottom: 40 
  },
  prescriptionTitle: { color: COPPER_SUN, fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 12 },
  prescriptionBody: { color: MIST_SILVER, fontSize: 14, lineHeight: 24, opacity: 0.85 },

  section: { width: '100%', marginBottom: 30 },
  sectionTitle: { color: VITAL_TEAL, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 15 },
  optionCard: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 109, 119, 0.15)', padding: 20, borderRadius: 16, marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(0, 109, 119, 0.3)'
  },
  optionInfo: { flex: 1 },
  optionType: { color: '#FFF', fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  addressText: { color: MOSS_GLOW, fontSize: 10, marginTop: 4, opacity: 0.7 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },

  communityBtn: { width: '100%', marginTop: 10, borderRadius: 16, overflow: 'hidden' },
  gradientBtn: { padding: 20, alignItems: 'center' },
  communityBtnText: { color: '#FFF', fontWeight: '900', fontSize: 13, letterSpacing: 1 },
  communitySubText: { color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 5, fontWeight: '600' },

  resetBtn: { marginTop: 40, paddingBottom: 50 },
  resetText: { color: VITAL_TEAL, fontSize: 11, fontWeight: '800', letterSpacing: 1 }
});