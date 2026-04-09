import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

// BRANDING CONSTANTS
const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';
const BONE_WHITE = '#F9F8F4';
const DEEP_TEAL = '#004D40';
const CYAN_NEON = '#00FFFF';

const translations = {
  en: {
    brand: "SOMATIC BHARAT",
    tagline: "SVASTHYA KA KOI VIKALP NAHI",
    founderTitle: "Founder & Architect | MSR Protocol",
    clinicalExp: "Clinical exposure @ NIMHANS | Apollo Blore",
    heroText: "MRI Clear. Blood reports normal. Yet the fatigue, brain fog, and migrating pain persist? You aren't imagining it—you are experiencing ",
    heroHighlight: "Central Sensitization.",
    ctaHero: "START CLINICAL AUDIT NOW",
    originLabel: "THE ORIGIN STORY",
    originTitle: "About Somatic Bharat Foundation",
    aboutBody: "With 12+ years of clinical experience in 1,000+ cases where traditional physio failed, Dr. MP Das identified how a muscle knot triggers the 'NF-kB Fire,' leading to systemic brain re-wiring.",
    vectorLabel: "THE 6 VECTORS OF CENTRAL SENSITIZATION",
    vectors: [
      { n: 'MECHANICAL', d: 'Joint & Tissue Load' },
      { n: 'ANCESTRAL', d: 'Epigenetic Imprints' },
      { n: 'NEURAL', d: 'Nervous Overdrive' },
      { n: 'ATMOSPHERIC', d: 'Environmental Stress' },
      { n: 'STRUCTURAL', d: 'Fascial Alignment' },
      { n: 'HUMORAL', d: 'Systemic Toxicity' }
    ],
    pillarsLabel: "THE 6 PILLARS OF MSR RESET",
    pillars: [
      { title: 'QUANTUM BREATH', desc: 'Cellular detox through O2-CO2 balance.' },
      { title: 'MERIDIAN STRETCH', desc: 'Kinetic elongation of energy pathways.' },
      { title: 'FASCIAL MFR', desc: 'Manual manipulation of connective tissue.' },
      { title: 'PRECISION LOADING', desc: 'Structural resilience training.' },
      { title: 'CHAKRA BHEDANAM', desc: 'Neural alignment & sensory resilience.' },
      { title: 'MAHANIDRA', desc: 'Neuroplasticity & epigenetic flush.' }
    ],
    mission: "MISSION 2047",
    missionSub: "Building NeuroResilience of Bharat"
  },
  as: {
    brand: "ছ’মেটিক ভাৰত",
    tagline: "স্বাস্থ্যৰ কোনো বিকল্প নাই",
    founderTitle: "প্ৰতিষ্ঠাপক আৰু স্থপতি | MSR প্ৰ’ট’কল",
    clinicalExp: "ক্লিনিকেল অভিজ্ঞতা @ NIMHANS | Apollo Blore",
    heroText: "MRI ক্লিয়াৰ। তেজৰ ৰিপৰ্ট স্বাভাৱিক। তথাপিও ভাগৰ আৰু শৰীৰৰ বিষ অনুভৱ কৰিছে নেকি? আপুনি কেন্দ্ৰীয় সংবেদনশীলতা ",
    heroHighlight: "(Central Sensitization) ত ভুগিছে।",
    ctaHero: "ক্লিনিকেল অডিট আৰম্ভ কৰক",
    originLabel: "আৱিষ্কাৰৰ কাহিনী",
    originTitle: "ছ’মেটিক ভাৰত ফাউণ্ডেশ্যন",
    aboutBody: "১২ বছৰৰ ক্লিনিকেল অভিজ্ঞতাৰ সৈতে ডা: এমপি দাসে MSR প্ৰ’ট’কল আৱিষ্কাৰ কৰে। তেখেতে চিনাক্ত কৰিছিল কেনেকৈ এটা পেশীৰ গাঁঠিয়ে 'NF-kB Fire' ক ট্ৰিগাৰ কৰি মগজুৰ কাৰ্যপ্ৰণালী সলনি কৰি পেলায়।",
    vectorLabel: "কেন্দ্ৰীয় সংবেদনশীলতাৰ ৬টা মূল ভেক্টৰ",
    vectors: [
      { n: 'যান্ত্ৰিক (MECHANICAL)', d: 'গাঁঠি আৰু কলাৰ বোজা' },
      { n: 'পূৰ্বপুৰুষীয় (ANCESTRAL)', d: 'এপিজেনেটিক প্ৰভাৱ' },
      { n: 'স্নায়ৱিক (NEURAL)', d: 'স্নায়ু তন্ত্ৰৰ অতিৰিক্ত চাপ' },
      { n: 'বায়ুমণ্ডলীয় (ATMOSPHERIC)', d: 'পাৰিপাৰ্শ্বিক মানসিক চাপ' },
      { n: 'গাঁথনিগত (STRUCTURAL)', d: 'ফেচিয়েল এলাইনমেণ্ট' },
      { n: 'হিউম’ৰেল (HUMORAL)', d: 'প্ৰণালীবদ্ধ বিষক্ৰিয়া' }
    ],
    pillarsLabel: "MSR ৰিছেটৰ ৬টা মুখ্য স্তম্ভ",
    pillars: [
      { title: 'কোৱাণ্টাম ব্ৰেথ', desc: 'অক্সিজেন-CO2 ৰ সন্তুলন আৰু ডিটক্স।' },
      { title: 'মেৰিডিয়ান ষ্ট্ৰেচ', desc: 'শক্তি পথৰ গতিশীল সম্প্ৰসাৰণ।' },
      { title: 'মায়’ফেচিয়েল ৰিলিজ', desc: 'সংয়োজক কলাৰ মেনুৱেল ৰিলিজ।' },
      { title: 'প্ৰিচিজন লোডিং', desc: 'গাঁথনিগত স্থিতিস্থাপকতাৰ বাবে প্ৰশিক্ষণ।' },
      { title: 'চক্ৰ ভেদনম', desc: 'নিউৰেল এলাইনমেণ্ট আৰু সুৰক্ষা।' },
      { title: 'মহানিদ্ৰা', desc: 'গভীৰ ছ’মেটিক ৰিকভাৰী আৰু নিউৰ’প্লাষ্টিচিটি।' }
    ],
    mission: "মিছন ২০৪৭",
    missionSub: "ভাৰতৰ নিউৰ’-ৰেচিলিয়েঞ্চ গঠন"
  }
};

export default function HomeScreen({ onStart, lang, setLang }) {
  const t = translations[lang];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.langToggle} onPress={setLang}>
        <Text style={styles.langToggleText}>{lang === 'en' ? 'অসমীয়া' : 'ENGLISH'}</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.headerLogoImage} resizeMode="contain" />
          <Text style={styles.logo}>{t.brand}</Text>
          <Text style={styles.tagline}>{t.tagline}</Text>
        </View>

        <View style={styles.hero}>
          <Image source={require('../assets/dr-mp-das.png')} style={styles.img} resizeMode="cover" />
          <Text style={styles.name}>Dr. MP Das PT, LLB, RYT 500</Text>
          <Text style={styles.subName}>{t.founderTitle}</Text>
          <Text style={styles.subName}>{t.clinicalExp}</Text>
          <View style={styles.goldDivider} />
          <Text style={styles.hook}>{t.heroText}<Text style={{color: MATTE_GOLD, fontWeight: 'bold'}}>{t.heroHighlight}</Text></Text>
          
          {/* AUDIT BUTTON MOVED HERE */}
          <TouchableOpacity style={styles.heroCta} onPress={onStart}>
            <Text style={styles.heroCtaText}>{t.ctaHero}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionLabel}>{t.originLabel}</Text>
          <Text style={styles.sectionTitle}>{t.originTitle}</Text>
          <Text style={styles.aboutBody}>{t.aboutBody}</Text>
        </View>

        <View style={styles.gridSection}>
          <Text style={styles.sectionLabel}>{t.vectorLabel}</Text>
          <View style={styles.grid}>
            {t.vectors.map((v, i) => (
              <View key={i} style={styles.vectorCard}>
                <Text style={styles.vName}>{v.n}</Text>
                <Text style={styles.vDesc}>{v.d}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.gridSection, { backgroundColor: DEEP_BLUE, marginTop: 20, paddingVertical: 30 }]}>
          <Text style={[styles.sectionLabel, { color: MATTE_GOLD }]}>{t.pillarsLabel}</Text>
          <View style={styles.grid}>
            {t.pillars.map((p, i) => (
              <View key={i} style={styles.pillarCard}>
                <Text style={styles.pTitle}>{p.title}</Text>
                <Text style={styles.pDesc}>{p.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>{t.brand} FOUNDATION</Text>
          <View style={styles.missionBox}>
            <Text style={styles.footerMission}>{t.mission}</Text>
            <Text style={styles.missionSub}>{t.missionSub}</Text>
          </View>
          <Text style={styles.copyrightText}>© 2026 SOMATIC BHARAT. ALL RIGHTS RESERVED.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BONE_WHITE },
  langToggle: { position: 'absolute', top: 50, right: 20, zIndex: 1000, backgroundColor: MATTE_GOLD, padding: 8, borderRadius: 20 },
  langToggleText: { color: DEEP_BLUE, fontWeight: '900', fontSize: 10 },
  scroll: { flexGrow: 1 },
  header: { backgroundColor: DEEP_BLUE, padding: 25, alignItems: 'center' },
  headerLogoImage: { width: 60, height: 60, marginBottom: 10 },
  logo: { fontSize: 20, fontWeight: '900', color: '#FFF', letterSpacing: 2 },
  tagline: { color: MATTE_GOLD, fontSize: 10, fontWeight: 'bold', marginTop: 5 },
  hero: { padding: 30, alignItems: 'center', backgroundColor: '#FFF' },
  img: { width: 110, height: 140, borderRadius: 8, marginBottom: 15 },
  name: { fontSize: 18, fontWeight: '900', color: DEEP_BLUE },
  subName: { fontSize: 11, color: '#666', marginTop: 2 },
  goldDivider: { width: 40, height: 2, backgroundColor: MATTE_GOLD, marginVertical: 15 },
  hook: { fontSize: 14, textAlign: 'center', lineHeight: 22, color: '#444', marginBottom: 20 },
  heroCta: { backgroundColor: DEEP_BLUE, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, borderBottomWidth: 3, borderBottomColor: MATTE_GOLD },
  heroCtaText: { color: '#FFF', fontWeight: '900', fontSize: 12, letterSpacing: 1 },
  aboutSection: { padding: 30 },
  sectionLabel: { fontSize: 10, fontWeight: 'bold', color: MATTE_GOLD, letterSpacing: 2, textAlign: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: DEEP_TEAL, marginBottom: 10, textAlign: 'center' },
  aboutBody: { fontSize: 13, color: '#555', lineHeight: 20, textAlign: 'center' },
  gridSection: { paddingHorizontal: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 15 },
  vectorCard: { width: '48%', backgroundColor: '#FFF', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EEE' },
  vName: { fontSize: 10, fontWeight: '900', color: DEEP_BLUE },
  vDesc: { fontSize: 9, color: '#666', marginTop: 2 },
  pillarCard: { width: '48%', backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(197, 160, 89, 0.3)' },
  pTitle: { fontSize: 10, fontWeight: '900', color: MATTE_GOLD },
  pDesc: { fontSize: 9, color: '#BBB', marginTop: 2 },
  footer: { padding: 40, alignItems: 'center', backgroundColor: '#FFF' },
  footerLogo: { fontSize: 12, fontWeight: '900', color: DEEP_BLUE, marginBottom: 15 },
  missionBox: { backgroundColor: BONE_WHITE, padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  footerMission: { fontSize: 11, fontWeight: '900', color: DEEP_TEAL },
  missionSub: { fontSize: 9, color: '#666', marginTop: 4 },
  copyrightText: { fontSize: 8, color: '#BBB' }
});