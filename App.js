import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

// Color Palette: Deep Teal (#004D40), Gold (#C5A059), Bone White (#F9F8F4)
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Navigation */}
      <View style={styles.nav}>
        <Text style={styles.logo}>SOMATIC <Text style={{color: '#C5A059'}}>BHARAT</Text></Text>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navBtnText}>MISSION 2026</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.goldLine} />
          <Text style={styles.eyebrow}>FOUNDATION ARCHIVE</Text>
          <Text style={styles.title}>Recalibrating Bharat’s{"\n"}Neuro-Resilience</Text>
          <Text style={styles.subtitle}>
            A 6-Vector diagnostic framework for recovery from Chronic Pain, CS, and Fibromyalgia. 
            Rooted in the Shatkona Protocol.
          </Text>
        </View>

        {/* --- MAJOR CALL TO ACTION SECTION --- */}
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Somatic Health Assessment</Text>
          <Text style={styles.ctaDesc}>
            Identify your neurological load across 36 clinical indicators. 
            Receive your Vector Profile instantly.
          </Text>
          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => console.log("Navigate to /audit/Assessment.js")}
          >
            <Text style={styles.mainButtonText}>BEGIN CLINICAL AUDIT</Text>
          </TouchableOpacity>
          <Text style={styles.secureNote}>🔒 HIPAA Compliant & Secure</Text>
        </View>

        {/* The 6 Pillars Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>The Shatkona Pillars</Text>
          <View style={styles.smallGoldLine} />
        </View>

        <View style={styles.grid}>
          {['Physical', 'Environmental', 'Psychological', 'Personal', 'Social', 'Somatic'].map((item, index) => (
            <View key={index} style={styles.gridItem}>
              <Text style={styles.gridNum}>0{index + 1}</Text>
              <Text style={styles.gridLabel}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Professional Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerCred}>Dr. MP Das PT, LLB</Text>
          <Text style={styles.footerOrg}>Founder, Somatic Bharat Foundation</Text>
          <Text style={styles.footerAffil}>SIBS Academy | TISRI Research</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#004D40' }, // Deep Teal Base
  nav: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingVertical: 20,
    backgroundColor: '#004D40' 
  },
  logo: { fontSize: 18, fontWeight: '900', letterSpacing: 2, color: '#F9F8F4' },
  navBtn: { borderWidth: 1, borderColor: '#C5A059', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 4 },
  navBtnText: { color: '#C5A059', fontSize: 10, fontWeight: 'bold' },
  
  scrollContent: { backgroundColor: '#F9F8F4', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 10, paddingBottom: 50 },
  
  hero: { padding: 30, paddingTop: 50, alignItems: 'flex-start' },
  goldLine: { width: 50, height: 4, backgroundColor: '#C5A059', marginBottom: 20 },
  eyebrow: { fontSize: 12, fontWeight: 'bold', color: '#004D40', letterSpacing: 3, marginBottom: 15 },
  title: { fontSize: 32, fontWeight: '900', color: '#1A1A1A', lineHeight: 40, marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#555', lineHeight: 26, maxWidth: 350 },

  // CTA SECTION
  ctaCard: { 
    margin: 25, 
    padding: 30, 
    backgroundColor: '#004D40', 
    borderRadius: 20, 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15
  },
  ctaTitle: { color: '#F9F8F4', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  ctaDesc: { color: '#A0C4C0', textAlign: 'center', lineHeight: 22, marginBottom: 25, fontSize: 14 },
  mainButton: { 
    backgroundColor: '#C5A059', 
    paddingVertical: 18, 
    paddingHorizontal: 35, 
    borderRadius: 10,
    width: '100%',
    alignItems: 'center'
  },
  mainButtonText: { color: '#F9F8F4', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  secureNote: { color: '#6A8E8A', fontSize: 10, marginTop: 15, letterSpacing: 1 },

  sectionHeader: { paddingHorizontal: 30, marginTop: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  smallGoldLine: { width: 30, height: 2, backgroundColor: '#C5A059', marginTop: 8 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 20, justifyContent: 'space-between' },
  gridItem: { 
    width: (width - 70) / 2, 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  gridNum: { fontSize: 24, fontWeight: '900', color: '#F2F0E9' },
  gridLabel: { fontSize: 13, fontWeight: 'bold', color: '#004D40', marginTop: 5 },

  footer: { marginTop: 40, padding: 40, borderTopWidth: 1, borderTopColor: '#EEE', alignItems: 'center' },
  footerCred: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  footerOrg: { fontSize: 13, color: '#C5A059', fontWeight: '600', marginTop: 4 },
  footerAffil: { fontSize: 11, color: '#AAA', marginTop: 4, letterSpacing: 1 }
});