import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

// Palette: National Saffron (#FF9933), Ashoka Green (#138808), Pure White (#FFFFFF), Deep Blue (#000080)
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* PERSISTENT NATIONAL ACTION HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>SOMATIC <Text style={{color: '#138808'}}>BHARAT</Text></Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>MSR AUDIT</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO: FOUNDER & MISSION VISION */}
        <View style={styles.hero}>
          <View style={styles.founderFrame}>
            <Image 
              source={{uri: 'https://i.ibb.co/3WqP4S3/dr-mp-das-pt-llb.png'}} // ← Paste the final direct image link here
              style={styles.founderImage} 
              resizeMode="cover"
            />
            <View style={styles.founderLabelFrame}>
              <Text style={styles.eyebrow}>FOUNDING ARCHITECT</Text>
              <Text style={styles.title}>Dr. MP Das PT, LLB</Text>
              <Text style={styles.founderSub}>Physiotherapist & Legal Consultant</Text>
            </View>
          </View>
          <Text style={styles.heroSubtitle}>
            Recalibrating Bharat’s Neuro-Resilience for the <Text style={{color: '#FF9933', fontWeight: 'bold'}}>centenary of our Independence.</Text>
          </Text>
        </View>

        {/* THE DATA: FEMALE SUFFERERS & THE SILENT EPIDEMIC */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>A National Somatic Crisis</Text>
          <Text style={styles.statsText}>
            MRI Clear. Blood reports normal. Yet, <Text style={styles.boldGreen}>80% of sufferers are women.</Text>
          </Text>
          <View style={styles.divider} />
          <Text style={styles.statsText}>
            Central Sensitization (CS) is the "NF-kB Fire" turning local muscle knots into systemic invisible pain—the silent epidemic affecting crores.
          </Text>
        </View>

        {/* --- THE DISCOVERY: THE 6 MANASH VECTORS --- */}
        <View style={styles.vectorsSection}>
          <Text style={styles.vectorSectionLabel}>THE MSR DISCOVERY</Text>
          <Text style={styles.vectorSectionTitle}>The 6 MANASH Vectors</Text>
          <Text style={styles.vectorSectionSubtitle}>
            Dr. MP Das analyzed 1,000+ cases where traditional treatments failed, identifying the systemic missing link: local knots left unaddressed propagate through six distinct, interlocking somatic channels.
          </Text>
          
          <View style={styles.vectorList}>
            {[
              { t: 'MEC (Mechanical)', d: 'Local tissue integrity, knot formation, and load-transfer efficiency.' },
              { t: 'ANC (Ancestral)', d: 'Epigenetic trauma tags and learned neuroplastic patterns.' },
              { t: 'NEU (Neural)', d: 'Vagal tone, brain fog, and Central/Neural Sensitization status.' },
              { t: 'ATM (Atmospheric)', d: 'Sensory load, environmental stressors, and workspace ergonomics.' },
              { t: 'STR (Structural)', d: 'Fascial de-densification and whole-body alignment.' },
              { t: 'HUM (Humoral)', d: 'Systemic inflammation markers, including the NF-kB Fire.' }
            ].map((vector, i) => (
              <View key={i} style={styles.vectorItem}>
                <View style={styles.vectorInitialFrame}>
                  <Text style={styles.vectorInitial}>{vector.t}</Text>
                
                </View>
                <View style={styles.vectorTextFrame}>
                  <Text style={styles.vectorTitle}>{vector.t.split(' ')[0]} Vector</Text>
                  <Text style={styles.vectorDesc}>{vector.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* THE PILLARS OF MSR */}
        <View style={styles.pillarsSection}>
          <Text style={styles.pillarSectionLabel}>MSR PROTOCOL PILLARS</Text>
          {[
            { t: 'Quantum Breathing', d: 'Inhibiting the NF-kB fire.' },
            { t: 'Fascia Stretching', d: 'Fascial de-densification.' },
            { t: 'Mahanidra', d: 'Neuroplasticity & Epigenetic Flush.' },
          ].map((pillar, i) => (
            <View key={i} style={styles.pillarItem}>
              <View style={styles.pillarDot} />
              <View>
                <Text style={styles.pillarTitle}>{i+1}. {pillar.t}</Text>
                <Text style={styles.pillarDesc}>{pillar.d}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* THE AIM: MISSION 2047 */}
        <View style={styles.missionSection}>
          <Text style={styles.missionHeadline}>100 Million Indians by 2047</Text>
          <Text style={styles.missionDesc}>
            Through Pain Neuroscience Education (PNE), vagal toning, and empathic shielding, the <Text style={styles.boldWhite}>Somatic Bharat Mission</Text> secures the neurological future of our nation—deleting biological stress tags for lifelong complete maintenance.
          </Text>
        </View>

        {/* NATIONAL FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>SOMATIC BHARAT FOUNDATION</Text>
          <Text style={styles.footerAffil}>SIBS Academy | TISRI | SvasthyaMantra</Text>
          <Text style={styles.footerMission}>Section 8 | Advancing National NeuroResilience</Text>
        </View>

      </ScrollView>

      {/* NATIONAL FAB */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>⚕️</Text>
        <Text style={styles.fabText}>3-MIN MSR AUDIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
  logo: { fontSize: 16, fontWeight: '900', color: '#000080', letterSpacing: 2 },
  headerBtn: { backgroundColor: '#FF9933', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
  headerBtnText: { color: '#000080', fontWeight: 'bold', fontSize: 11 },
  
  scrollContent: { backgroundColor: '#F9F8F4' },
  
  hero: { padding: 30, backgroundColor: '#FFFFFF', alignItems: 'center' },
  founderFrame: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 20 },
  founderImage: { width: width * 0.25, height: width * 0.35, borderRadius: 10, marginRight: 20 },
  founderLabelFrame: { flex: 1 },
  eyebrow: { color: '#138808', fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5 },
  title: { color: '#000080', fontSize: 24, fontWeight: '900', marginTop: 5 },
  founderSub: { color: '#555', fontSize: 12, fontWeight: '600', marginTop: 3 },
  heroSubtitle: { color: '#444', fontSize: 16, marginTop: 25, lineHeight: 24, textAlign: 'center' },

  statsCard: { margin: 20, marginTop: -20, backgroundColor: '#FFF', borderRadius: 15, padding: 25, elevation: 8 },
  statsTitle: { fontSize: 12, fontWeight: 'bold', color: '#FF9933', letterSpacing: 1, marginBottom: 10 },
  statsText: { fontSize: 15, color: '#333', lineHeight: 22 },
  boldGreen: { color: '#138808', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },

  vectorsSection: { padding: 30, backgroundColor: '#FFFFFF' },
  vectorSectionLabel: { fontSize: 10, fontWeight: 'bold', color: '#FF9933', letterSpacing: 2 },
  vectorSectionTitle: { fontSize: 28, fontWeight: '900', color: '#138808', marginTop: 5 },
  vectorSectionSubtitle: { fontSize: 15, color: '#666', lineHeight: 22, marginTop: 15, marginBottom: 30 },
  vectorList: { gap: 15 },
  vectorItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F8F4', padding: 15, borderRadius: 10 },
  vectorInitialFrame: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#138808', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  vectorInitial: { fontSize: 16, fontWeight: '900', color: '#FFFFFF' },
  vectorTextFrame: { flex: 1 },
  vectorTitle: { fontSize: 18, fontWeight: 'bold', color: '#000080' },
  vectorDesc: { fontSize: 12, color: '#666', marginTop: 2 },

  pillarsSection: { padding: 30, backgroundColor: '#F0EFEA' },
  pillarSectionLabel: { fontSize: 11, fontWeight: 'bold', color: '#138808', marginBottom: 20 },
  pillarItem: { flexDirection: 'row', marginBottom: 20 },
  pillarDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF9933', marginTop: 8, marginRight: 15 },
  pillarTitle: { color: '#000080', fontSize: 16, fontWeight: 'bold' },
  pillarDesc: { color: '#555', fontSize: 12, marginTop: 2 },

  missionSection: { padding: 40, backgroundColor: '#138808', alignItems: 'center' },
  missionHeadline: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', textAlign: 'center' },
  missionDesc: { color: '#F9F8F4', fontSize: 14, marginTop: 15, lineHeight: 22, textAlign: 'center' },
  boldWhite: { color: '#FFFFFF', fontWeight: 'bold' },

  footer: { padding: 50, backgroundColor: '#000080', alignItems: 'center' },
  footerLogo: { color: '#FFFFFF', fontWeight: '900', letterSpacing: 2 },
  footerAffil: { color: '#FF9933', fontSize: 11, fontWeight: '700', marginTop: 5 },
  footerMission: { color: '#A0A0A0', fontSize: 10, marginTop: 3 },

  fab: { 
    position: 'absolute', bottom: 30, right: 20, backgroundColor: '#FF9933', 
    flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 25, 
    borderRadius: 30, elevation: 10 
  },
  fabIcon: { fontSize: 20, marginRight: 10 },
  fabText: { color: '#000080', fontWeight: '900', fontSize: 14 }
});