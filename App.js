import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

// Palette: Deep Mission Teal (#004D40), MSR Gold (#C5A059), Bone White (#F9F8F4)
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* PERSISTENT ACTION HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>SOMATIC <Text style={{color: '#C5A059'}}>BHARAT</Text></Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>MSR AUDIT</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO: THE SILENT EPIDEMIC */}
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>THE MANASH SHATKONA RESET (MSR)</Text>
          <Text style={styles.title}>When "Normal" Reports {"\n"}Hide Real Pain.</Text>
          <Text style={styles.heroSubtitle}>
            MRI Clear. Blood reports normal. Yet the fatigue, brain fog, and migrating pain persist. 
            You aren't imagining it—you are experiencing <Text style={{color: '#C5A059', fontWeight: 'bold'}}>Central Sensitization.</Text>
          </Text>
          <View style={styles.goldLine} />
        </View>

        {/* THE DATA: FEMALE SUFFERERS & STATISTICS */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>The Indian Crisis</Text>
          <Text style={styles.statsText}>
            Over <Text style={styles.boldTeal}>80% of Fibromyalgia sufferers are women</Text>—working mothers, homemakers, and professionals silenced by an invisible fire.
          </Text>
          <View style={styles.divider} />
          <Text style={styles.statsText}>
            CS (Central Sensitization) affects millions, turning a simple muscle knot into a systemic "NF-kB Fire" that traditional medicine cannot touch.
          </Text>
        </View>

        {/* THE DISCOVERY: DR. MP DAS PT, LLB */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>THE ARCHITECT'S DISCOVERY</Text>
          <Text style={styles.bodyText}>
            After analyzing 1,000+ cases where traditional Physio, Yoga, and Medicine failed, 
            <Text style={styles.boldTeal}> Dr. MP Das PT, LLB</Text> identified the missing link: 
            The **6 MANASH Vectors**. 
            {"\n\n"}
            He discovered how a simple muscle knot, if left unaddressed, eventually "re-wires" the brain, leading to a permanent state of <Text style={styles.boldTeal}>Neural Sensitization.</Text>
          </Text>
        </View>

        {/* THE 6 SHATKONA PILLARS (MSR PROTOCOL) */}
        <View style={styles.pillarsContainer}>
          <Text style={styles.pillarMainTitle}>The MSR Protocol</Text>
          <Text style={styles.pillarSubtitle}>From Vagal Toning to Epigenetic Flush</Text>
          
          {[
            { t: 'Quantum Breathing', d: 'Inhibiting the NF-kB inflammatory fire.' },
            { t: 'Fascia Stretching', d: 'De-densification and structural remodeling.' },
            { t: 'MFR (Myofascial Release)', d: 'Releasing the local knots at the source.' },
            { t: 'Precision Loading', d: 'Controlled load for structural resilience.' },
            { t: 'Chakra Bhedanam', d: 'Empathic shielding for energy protection.' },
            { t: 'Mahanidra', d: 'Neuroplasticity & Deleting DNA Methylation tags.' },
          ].map((item, i) => (
            <View key={i} style={styles.pillarItem}>
              <View style={styles.pillarDot} />
              <View>
                <Text style={styles.pillarTitle}>{i+1}. {item.t}</Text>
                <Text style={styles.pillarDesc}>{item.d}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* THE AIM: SYSTEMIC RESET & MISSION 2047 */}
        <View style={styles.resetSection}>
          <Text style={styles.resetLabel}>THE ULTIMATE GOAL</Text>
          <Text style={styles.resetTitle}>Total Systemic Deletion</Text>
          
          <Text style={styles.resetBody}>
            Our goal is not symptom management—it is <Text style={styles.goldBold}>BIOLOGICAL DELETION.</Text> 
            {"\n\n"}
            Through <Text style={styles.boldTeal}>PNE (Pain Neuroscience Education)</Text> and the MSR Protocol, we achieve an **Epigenetic Flush**, stripping away the DNA methylation tags left by years of chronic stress and trauma. 
            {"\n\n"}
            We aren't just healing bodies; we are building a <Text style={styles.boldTeal}>Neuro-Resilient Bharat.</Text>
          </Text>

          <View style={styles.mission2047Card}>
            <Text style={styles.missionYear}>MISSION 2047</Text>
            <Text style={styles.missionHeadline}>100 Million Neuro-Resilient Indians</Text>
            <Text style={styles.missionDesc}>
              By the centenary of our Independence, the <Text style={styles.boldWhite}>Somatic Bharat Mission</Text> aims to empower 10 crore citizens with the tools of Somatic Education and Neuro Resilience. 
              From the youth in our workforce to the elders in our homes, we are securing the neurological future of our nation.
            </Text>
            <View style={styles.progressMini}>
              <View style={[styles.progressFill, {width: '15%'}]} />
            </View>
            <Text style={styles.progressText}>Phase 1: Foundation & Digital Outreach (2026)</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>SOMATIC BHARAT FOUNDATION</Text>
          <Text style={styles.footerCredits}>Dr. MP Das PT, LLB | SIBS Academy | Guwahati</Text>
          <Text style={styles.footerMission}>Empowering Youth, Mothers & Seniors.</Text>
        </View>

      </ScrollView>

      {/* FLOATING ACTION BUTTON */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>⚕️</Text>
        <Text style={styles.fabText}>3-MIN MSR AUDIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#004D40' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#004D40' },
  logo: { fontSize: 16, fontWeight: '900', color: '#F9F8F4', letterSpacing: 2 },
  headerBtn: { backgroundColor: '#C5A059', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
  headerBtnText: { color: '#004D40', fontWeight: 'bold', fontSize: 11 },
  
  scrollContent: { backgroundColor: '#F9F8F4' },
  
  hero: { padding: 30, backgroundColor: '#004D40', paddingBottom: 50 },
  eyebrow: { color: '#C5A059', fontSize: 11, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 15 },
  title: { color: '#F9F8F4', fontSize: 32, fontWeight: '900', lineHeight: 40 },
  heroSubtitle: { color: '#A0C4C0', fontSize: 16, marginTop: 20, lineHeight: 24 },
  goldLine: { width: 50, height: 4, backgroundColor: '#C5A059', marginTop: 25 },

  statsCard: { margin: 20, marginTop: -30, backgroundColor: '#FFF', borderRadius: 15, padding: 25, elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  statsTitle: { fontSize: 12, fontWeight: 'bold', color: '#C5A059', marginBottom: 10, letterSpacing: 1 },
  statsText: { fontSize: 15, color: '#444', lineHeight: 22, marginVertical: 5 },
  boldTeal: { color: '#004D40', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },

  section: { padding: 30 },
  sectionLabel: { fontSize: 11, fontWeight: 'bold', color: '#C5A059', letterSpacing: 2, marginBottom: 15 },
  bodyText: { fontSize: 16, color: '#333', lineHeight: 26 },

  pillarsContainer: { padding: 30, backgroundColor: '#00332B' },
  pillarMainTitle: { color: '#F9F8F4', fontSize: 24, fontWeight: 'bold' },
  pillarSubtitle: { color: '#C5A059', fontSize: 14, marginBottom: 30 },
  pillarItem: { flexDirection: 'row', marginBottom: 25 },
  pillarDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#C5A059', marginTop: 8, marginRight: 15 },
  pillarTitle: { color: '#F9F8F4', fontSize: 18, fontWeight: 'bold' },
  pillarDesc: { color: '#A0C4C0', fontSize: 13, marginTop: 4 },

  resetSection: { padding: 30, backgroundColor: '#F9F8F4', alignItems: 'flex-start' },
  resetLabel: { fontSize: 10, fontWeight: 'bold', color: '#C5A059', letterSpacing: 2, marginBottom: 10 },
  resetTitle: { fontSize: 28, fontWeight: '900', color: '#004D40', marginBottom: 15 },
  resetBody: { fontSize: 16, color: '#444', lineHeight: 26, marginBottom: 30 },
  
  mission2047Card: { 
    width: '100%', 
    backgroundColor: '#004D40', 
    padding: 25, 
    borderRadius: 20, 
    borderLeftWidth: 5, 
    borderLeftColor: '#C5A059' 
  },
  missionYear: { color: '#C5A059', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 },
  missionHeadline: { color: '#F9F8F4', fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  missionDesc: { color: '#A0C4C0', fontSize: 13, lineHeight: 20 },
  boldWhite: { color: '#F9F8F4', fontWeight: 'bold' },
  
  progressMini: { height: 4, backgroundColor: '#00332B', borderRadius: 2, marginTop: 20, marginBottom: 10 },
  progressFill: { height: 4, backgroundColor: '#C5A059', borderRadius: 2 },
  progressText: { color: '#6A8E8A', fontSize: 10, fontWeight: 'bold' },

  footer: { padding: 50, backgroundColor: '#004D40', alignItems: 'center' },
  footerLogo: { color: '#F9F8F4', fontWeight: '900', letterSpacing: 2, marginBottom: 10 },
  footerCredits: { color: '#C5A059', fontSize: 12, fontWeight: 'bold' },
  footerMission: { color: '#A0C4C0', fontSize: 11, marginTop: 5 },

  fab: { 
    position: 'absolute', bottom: 30, right: 20, backgroundColor: '#C5A059', 
    flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 25, 
    borderRadius: 30, elevation: 10 
  },
  fabIcon: { fontSize: 20, marginRight: 10 },
  fabText: { color: '#004D40', fontWeight: '900', fontSize: 14 }
});