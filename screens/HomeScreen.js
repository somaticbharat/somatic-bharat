import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Dimensions,
  FlatList 
} from 'react-native';

const { width } = Dimensions.get('window');

// THE TRINITY BRANDING CONSTANTS
const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';
const BONE_WHITE = '#F9F8F4';
const DEEP_TEAL = '#004D40';

export default function HomeScreen({ onStart }) {
  // --- CAROUSEL UNLOCK STATE ---
  const [activePillar, setActivePillar] = useState(0);

  // MSR SHATKONA PROTOCOL DATA
  const pillars = [
    { title: 'QUANTUM BREATH', desc: 'Lymphatic drainage and oxygen-CO2 balancing for deep cellular detox.' },
    { title: 'MERIDIAN STRETCH', desc: 'Kinetic elongation of energy pathways to release stagnant load.' },
    { title: 'FASCIAL MFR', desc: 'Manual manipulation of connective tissue to restore fluid flow.' },
    { title: 'PRECISION LOADING', desc: 'Biomechanical training for systemic strength and structural resilience.' },
    { title: 'CHAKRA BHEDANAM', desc: 'Neural alignment and empathic shielding for sensory resilience.' },
    { title: 'MAHANIDRA', desc: 'Neuroplasticity and epigenetic flush through deep somatic recovery.' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scroll}
      >
        
        {/* 1. BRANDING HEADER */}
        <View style={styles.header}>
            <Image 
    source={require('../assets/logo.png')} // Ensure your logo file is named logo.png in the assets folder
    style={styles.headerLogoImage} 
    resizeMode="contain"
  />
          <Text style={styles.logo}>SOMATIC <Text style={{color: MATTE_GOLD}}>BHARAT</Text></Text>
          <Text style={styles.tagline}>SVASTHYA KA KOI VIKALP NAHI</Text>
        </View>

        {/* 2. HERO / CLINICAL AUTHORITY */}
        <View style={styles.hero}>
          <Image 
            source={require('../assets/dr-mp-das.png')} 
            style={styles.img} 
            resizeMode="cover"
          />
          <Text style={styles.name}>Dr. MP Das PT, LLB, RYT 500</Text>
          <Text style={styles.subName}>Founder & Architect | MSR Protocol</Text>
          <Text style={styles.subName}>Clinical exposure @ NIMHANS | Apollo Blore</Text>
          <View style={styles.goldDivider} />
          <Text style={styles.hook}>
            <Text style={styles.heroSubtitle}>
            MRI Clear. Blood reports normal. Yet the fatigue, brain fog, and migrating pain persist? 
            You aren't imagining it—you are experiencing <Text style={{color: '#C5A059', fontWeight: 'bold'}}>Central Sensitization.</Text>
          </Text>
          </Text>
        </View>

{/* DATA & AWARENESS */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>A National Somatic Epidemic</Text>
          <Text style={styles.statsText}>
            Over <Text style={styles.boldTeal}>80% of sufferers are women</Text>—mothers, homemakers, and professionals silenced by an invisible fire.
          </Text>
          <View style={styles.divider} />
          <Text style={styles.statsText}>
            This is the systemic "NF-kB Fire" turning local muscle knots into total neural sensitization.
          </Text>
        </View>

        {/* 3. THE 6 MANASH VECTORS (ORIGIN) - Keep static grid for diag Authority */}
        <View style={styles.vectorSection}>
             {/* --- UPDATE: THE 6 MANASH VECTORS (MSR PROTOCOL) --- */}
         {/* ABOUT / ORIGIN STORY */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionLabel}>THE ORIGIN STORY</Text>
          <Text style={styles.sectionTitle}>About Somatic Bharat Foundation | One Discovery | One Mission | One Bharat</Text>
          <Text style={styles.aboutBody}>
            While searching for a permanent solution with 12+ years of clinical experience in 1,000+ cases of chronic pain and central sesitization where traditional physio, yoga, or medicine alone failed, 
            <Text style={styles.boldTeal}> Dr. MP Das PT, LLB</Text> discovered the **Manash Shatkona Reset (MSR)**. 
            {"\n\n"}
            He identified how a simple muscle knot, if left uncontrolled, eventually triggers the "NF-kB Fire," leading to a 
            systemic re-wiring of the brain. This mission was born to help crores suffering from this silent epidemic.
          </Text>
        </View>
          <Text style={styles.sectionLabel}>THE 6 VECTORS OF CENTRAL SENSITIZATION ORIGIN</Text>
          
          
          <View style={styles.vectorGrid}>
            {[
              { n: 'MECHANICAL', d: 'Joint & Tissue Load' },
              { n: 'ANCESTRAL', d: 'Epigenetic Imprints' },
              { n: 'NEURAL', d: 'Nervous Overdrive' },
              { n: 'ATMOSPHERIC', d: 'Environmental Stress' },
              { n: 'STRUCTURAL', d: 'Fascial Alignment' },
              { n: 'HUMORAL', d: 'Systemic Toxicity' }
            ].map((v, i) => (
              <View key={i} style={styles.vectorCard}>
                <Text style={styles.vName}>{v.n}</Text>
                <Text style={styles.vDesc}>{v.d}</Text>
              </View>
            ))}
          </View>
        </View>
<Text style={{fontWeight:'900', color: DEEP_TEAL}}>Extinguish the NF-kB Fire.</Text>
        {/* 4. THE 6 PILLARS OF RESET (THE NEW CAROUSEL) */}
        <View style={styles.pillarCarouselSection}>
            
          <Text style={[styles.sectionLabel, {color: MATTE_GOLD, marginBottom: 15}]}>
            THE 6 PILLARS OF MSR RESET
          </Text>
          
          {/* THE FLATLIST SWIPE-GALLERY */}
          <FlatList
            data={pillars}
            horizontal
            pagingEnabled // This forces the "snap to full width"
            showsHorizontalScrollIndicator={false}
            snapToInterval={width} // Ensure smooth snapping
            snapToAlignment="center"
            decelerationRate="fast"
            // TRACKS USER SWIPE
            onScroll={(e) => setActivePillar(Math.round(e.nativeEvent.contentOffset.x / width))}
            renderItem={({ item, index }) => (
              <View style={styles.pillarCarouselCard}>
                <View style={styles.pillarHeader}>
                  <Text style={styles.pNum}>0{index+1}</Text>
                </View>
                <Text style={styles.pTitle}>{item.title.toUpperCase()}</Text>
                <View style={styles.goldDividerSmall} />
                <Text style={styles.pSub}>{item.desc}</Text>
              </View>
            )}
          />

          {/* PROGRESS DOTS - (Essential for user clarity) */}
          <View style={styles.dotRow}>
            {pillars.map((_, i) => (
              <View key={i} style={[styles.dot, { backgroundColor: activePillar === i ? MATTE_GOLD : '#666' }]} />
            ))}
          </View>
        </View>

        {/* 5. CALL TO ACTION (THE UNLOCK) */}
        <View style={styles.auditCtaSection}>
          {/* THE CONDITIONAL UNLOCK */}
          {activePillar === 5 ? (
            <TouchableOpacity 
              style={styles.btnUnlocked} 
              onPress={onStart}
            >
              <Text style={styles.btnTextUnlocked}>START CLINICAL AUDIT</Text>
            </TouchableOpacity>
          ) : (
            // LOCKED STATE MESSAGE
            <View style={styles.lockedBtn}>
              <Text style={styles.lockedBtnText}>
                Swipe all pillars to unlock Audit
              </Text>
            </View>
          )}
        </View>
{/* 6. FOUNDATION INSTITUTIONAL FOOTER */}
        <View style={styles.footer}>
          <View style={styles.goldDividerSmall} />
          
          <Text style={styles.footerLogo}>SOMATIC BHARAT FOUNDATION</Text>
          
          <View style={styles.affilRow}>
            <Text style={styles.footerAffil}>SIBS ACADEMY</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.footerAffil}>TISRI</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.footerAffil}>SVAASTHYAMANTRA</Text>
          </View>

          <Text style={styles.location}>GUWAHATI | ASSAM | 781028</Text>

          <View style={styles.missionBox}>
            <Text style={styles.footerMission}>MISSION 2047</Text>
            <Text style={styles.missionSub}>Building NeuroResilience of Bharat</Text>
          </View>

          <Text style={styles.poweredBy}>
            Powered by FasciaMax Shatvayu | ShatkonaLife
          </Text>

          <Text style={styles.copyrightText}>
            © 2026 SOMATIC BHARAT. ALL RIGHTS RESERVED.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BONE_WHITE },
  scroll: { 
    flexGrow: 1, 
    paddingBottom: 80 // Bottom space for safe-scroll
  },
  header: { backgroundColor: DEEP_BLUE, paddingVertical: 25, alignItems: 'center' },
  headerLogoImage: {
  width: 60,   // Adjust width based on your logo's aspect ratio
  height: 60,  // Adjust height
  marginBottom: 10
},
  logo: { fontSize: 22, fontWeight: '900', color: '#FFF', letterSpacing: 3 },
  tagline: { color: MATTE_GOLD, fontSize: 10, fontWeight: 'bold', marginTop: 5, letterSpacing: 1 },
  hero: { padding: 30, alignItems: 'center', backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE' },
  img: { width: 110, height: 140, borderRadius: 8, marginBottom: 15, backgroundColor: '#f0f0f0' },
  name: { fontSize: 18, fontWeight: '900', color: DEEP_BLUE },
  subName: { fontSize: 11, color: '#666', marginTop: 2 },
  goldDivider: { width: 40, height: 2, backgroundColor: MATTE_GOLD, marginVertical: 15 },
  hook: { fontSize: 14, textAlign: 'center', lineHeight: 22, color: '#444' },
  vectorSection: { padding: 25 },
  sectionLabel: { fontSize: 12, fontWeight: '900', textAlign: 'center', color: DEEP_BLUE, letterSpacing: 1.5, textTransform: 'uppercase' },
  sectionSub: { fontSize: 10, textAlign: 'center', color: '#888', marginBottom: 20 },
  vectorGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  vectorCard: { width: '48%', backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#E8E8E8' },
  vName: { fontSize: 10, fontWeight: '900', color: DEEP_BLUE, marginBottom: 4 },
  vDesc: { fontSize: 9, color: '#666', fontWeight: '600' },

  // --- NEW CAROUSEL STYLES ---
  pillarCarouselSection: { paddingVertical: 30, backgroundColor: DEEP_BLUE },
  // full width minus potential horizontal padding from parent scrollview
  pillarCarouselCard: { width: width, paddingHorizontal: 40, alignItems: 'center' }, 
  pillarHeader: { marginBottom: 15, alignItems: 'center' },
  pNum: { color: 'rgba(197, 160, 89, 0.1)', fontWeight: '900', fontSize: 60, position: 'absolute', top: -15 }, // Very faint gold text
  pTitle: { color: '#FFF', fontWeight: '800', fontSize: 22, letterSpacing: 0.5, textAlign: 'center', marginTop: 30 },
  goldDividerSmall: { width: 30, height: 2, backgroundColor: MATTE_GOLD, marginVertical: 15 },
  pSub: { color: 'rgba(255,255,255,0.7)', fontSize: 15, marginTop: 2, textAlign: 'center', lineHeight: 24 },
  
  // DOTS
  dotRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  dot: { width: 7, height: 7, borderRadius: 3.5, marginHorizontal: 4 },

  // --- UNLOCK CTA STYLES ---
  auditCtaSection: { padding: 40, alignItems: 'center' },
  
  // UNLOCKED STATE
  btnUnlocked: { backgroundColor: DEEP_BLUE, paddingVertical: 20, paddingHorizontal: 40, borderRadius: 35 },
  btnTextUnlocked: { color: MATTE_GOLD, fontWeight: '900', fontSize: 12, letterSpacing: 1.5 },
statsCard: { margin: 20, marginTop: -30, backgroundColor: '#FFF', borderRadius: 15, padding: 25, elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  statsTitle: { fontSize: 12, fontWeight: 'bold', color: '#C5A059', letterSpacing: 1, marginBottom: 10 },
  statsText: { fontSize: 15, color: '#333', lineHeight: 22 },
  boldTeal: { color: '#004D40', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },
aboutSection: { padding: 30, backgroundColor: '#F9F8F4' },
  sectionLabel: { fontSize: 10, fontWeight: 'bold', color: '#C5A059', letterSpacing: 2 },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#004D40', marginVertical: 10 },
  aboutBody: { fontSize: 14, color: '#444', lineHeight: 22 },
  boldTeal: { color: '#004D40', fontWeight: 'bold' },
  vectorsSection: { padding: 30, backgroundColor: '#FFFFFF' },
  vectorSectionLabel: { fontSize: 10, fontWeight: 'bold', color: '#C5A059', letterSpacing: 2 },
  vectorSectionTitle: { fontSize: 28, fontWeight: '900', color: '#004D40', marginTop: 5 },
  vectorSectionSubtitle: { fontSize: 15, color: '#666', lineHeight: 22, marginTop: 15, marginBottom: 30 },
// --- ENHANCED FOUNDATION FOOTER STYLES ---
  footer: { 
    backgroundColor: '#FFF', 
    paddingTop: 50, 
    paddingBottom: 60, 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderColor: '#F0F0F0' 
  },
  goldDividerSmall: { 
    width: 30, 
    height: 3, 
    backgroundColor: MATTE_GOLD, 
    marginBottom: 20 
  },
  footerLogo: { 
    fontSize: 14, 
    fontWeight: '900', 
    color: DEEP_BLUE, 
    letterSpacing: 2, 
    marginBottom: 12 
  },
  affilRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  footerAffil: { 
    fontSize: 9, 
    fontWeight: '700', 
    color: '#666', 
    letterSpacing: 1 
  },
  dot: { 
    marginHorizontal: 8, 
    color: MATTE_GOLD, 
    fontSize: 12 
  },
  location: { 
    fontSize: 9, 
    color: '#999', 
    fontWeight: '600', 
    letterSpacing: 1, 
    marginBottom: 25 
  },
  missionBox: { 
    alignItems: 'center', 
    marginBottom: 25,
    backgroundColor: BONE_WHITE,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  footerMission: { 
    fontSize: 11, 
    fontWeight: '900', 
    color: DEEP_TEAL, 
    letterSpacing: 2 
  },
  missionSub: { 
    fontSize: 9, 
    color: '#444', 
    fontWeight: '600', 
    marginTop: 4 
  },
  poweredBy: { 
    fontSize: 8, 
    color: '#BBB', 
    fontWeight: '700', 
    letterSpacing: 0.5, 
    marginBottom: 15 
  },
  copyrightText: { 
    fontSize: 9, 
    fontWeight: '800', 
    color: DEEP_BLUE, 
    opacity: 0.4, 
    letterSpacing: 1 
  },
 // UPDATED LOCKED STATE WITH CYAN NEON GLOW
  lockedBtn: { 
    backgroundColor: 'rgba(0, 33, 71, 0.8)', // Darker base to make the neon pop
    paddingVertical: 20, 
    paddingHorizontal: 40, 
    borderRadius: 35, 
    width: '100%', 
    alignItems: 'center',
    
    // THE NEON BORDER
    borderWidth: 1.5,
    borderColor: '#00FFFF', // Pure Cyan
    
    // NEON GLOW (iOS)
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    
    // NEON GLOW (Android)
    elevation: 8, 
  },
  lockedBtnText: { 
    color: '#00FFFF', // Matching Cyan text for the "lit" look
    fontSize: 11, 
    fontStyle: 'italic', 
    textTransform: 'uppercase',
    fontWeight: '900',
    letterSpacing: 1.5,
    opacity: 0.7 // Slightly dimmed since it's locked
  }
});