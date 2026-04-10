import React, { useState, useRef } from 'react';
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

// --- IMPORTING YOUR MODULAR HEADER FILES ---
import { AboutUs } from './components/Header/AboutUs';
import { TISRI } from './components/Header/TISRI';
import { SIBS } from './components/Header/SIBS';
import { Workshops } from './components/Header/Workshops';
import { Career } from './components/Header/Career';
import { Testimonials } from './components/Header/Testimonials';

const { width } = Dimensions.get('window');

// BRANDING CONSTANTS
const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';
const BONE_WHITE = '#F9F8F4';
const DEEP_TEAL = '#004D40';

const translations = {
  en: {
    brand: "SOMATIC BHARAT",
    nav: ["ABOUT", "TISRI", "SIBS ACADEMY", "WORKSHOPS", "CAREER", "REVIEWS"],
    back: "← BACK TO HOME",
    tagline: "BECAUSE PAIN SHOULDN'T BE YOUR PERSONALITY",
    founderTitle: "Founder & Architect | MSR Protocol",
    clinicalExp: "Clinical exposure @ NIMHANS | Apollo Blore",
    heroText: "The MRI says you're fine. Blood reports are 'normal'. All treatments failed? Called just in your head? But your body is imploring, seeking deliverance from the pain. Then don't worry anymore. The fatigue, the brain fog, the moving pain—it's not in your head. It's an invisible fire called ",
    heroHighlight: "Central Sensitization—the hidden root behind conditions like Fibromyalgia..",
    ctaHero: "Discover yourself with the 3-min DNA audit",
    ctaSub: "Diagnostic Neural Audit: Stop Guessing, Start Healing.",
    vectorLabel: "WHERE IS YOUR FIRE BURNING?",
    vectors: [
      { n: 'MECHANICAL', d: 'Joint & Tissue Load' },
      { n: 'ANCESTRAL', d: 'Epigenetic Imprints' },
      { n: 'NEURAL', d: 'Nervous Overdrive' },
      { n: 'ATMOSPHERIC', d: 'Environmental Stress' },
      { n: 'STRUCTURAL', d: 'Fascial Alignment' },
      { n: 'HUMORAL', d: 'Systemic Toxicity' }
    ],
    pillarsLabel: "THE 6 PATHWAYS TO RESET",
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
    nav: ["আমাৰ বিষয়ে", "TISRI গৱেষণা", "SIBS একাডেমী", "কৰ্মশালা", "কেৰিয়াৰ", "মতামত"],
    back: "← পাছলৈ যাওক",
    tagline: "যন্ত্ৰণা আপোনাৰ পৰিচয় হ’ব নালাগে",
    founderTitle: "প্ৰতিষ্ঠাপক আৰু স্থপতি | MSR প্ৰ’ট’কল",
    clinicalExp: "ক্লিনিকেল অভিজ্ঞতা @ NIMHANS | Apollo Blore",
    heroText: "MRI ৰিপৰ্ট ঠিক আছে। তেজৰ পৰীক্ষাও 'স্বাভাৱিক'। সকলো ধৰণৰ চিকিৎসা কৰিও বিফল হৈছে আৰু এই বিষক মনৰ ধাৰণা বুলি কোৱা হৈছে? তেনেহ’লে আৰু চিন্তা নকৰিব? সেই অসহ্যকৰ ভাগৰ, মগজুৰ ধুঁৱলী-কুঁৱলী ভাব আৰু শৰীৰৰ যন্ত্ৰণা... এইয়া আপোনাৰ মনৰ ভুল নহয়। এইয়া এক অদৃশ্য জুই। ",
    heroHighlight: "এইয়া হৈছে 'চেণ্ট্ৰেল চেন্সিটাইজেচন', যি ফাইব্ৰ’মায়েলজিয়াৰ দৰে যন্ত্ৰণাৰ আঁৰত লুকাই থকা এক শিপা।",
    ctaHero: "৩-মিনিটৰ DNA অডিটৰ জৰিয়তে নিজক আৱিষ্কাৰ কৰক",
    ctaSub: "অন্ধকাৰত নাথাকিব, সমাধান বিচাৰি উলিয়াওক",
    vectorLabel: "আপোনাৰ যন্ত্ৰণাৰ উৎস ক’ত?",
    vectors: [
      { n: 'যান্ত্ৰিক (MECHANICAL)', d: 'গাঁঠি আৰু কলাৰ বোজা' },
      { n: 'পূৰ্বপুৰুষীয় (ANCESTRAL)', d: 'এপিজেনেটিক প্ৰভাৱ' },
      { n: 'স্নায়ৱিক (NEURAL)', d: 'স্নায়ু তন্ত্ৰৰ অতিৰিক্ত চাপ' },
      { n: 'বায়ুমণ্ডলীয় (ATMOSPHERIC)', d: 'পাৰিপাৰ্শ্বিক মানসিক চাপ' },
      { n: 'গাঁথনিগত (STRUCTURAL)', d: 'ফেচিয়েল এলাইনমেণ্ট' },
      { n: 'হিউম’ৰেল (HUMORAL)', d: 'প্ৰণালীবদ্ধ বিষক্ৰিয়া' }
    ],
    pillarsLabel: "ৰিছেট কৰাৰ ৬টা পথ",
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
  const t = translations[lang] || translations.as;
  const scrollRef = useRef(null);
  
  const [activePage, setActivePage] = useState('HOME');

  const switchPage = (pageName) => {
    setActivePage(pageName);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const renderMainContent = () => {
    switch(activePage) {
      case 'About': return <View style={styles.pageWrapper}><AboutUs lang={lang} /></View>;
      case 'TISRI': return <View style={styles.pageWrapper}><TISRI lang={lang} /></View>;
      case 'SIBS': return <View style={styles.pageWrapper}><SIBS lang={lang} /></View>;
      case 'Workshops': return <View style={styles.pageWrapper}><Workshops lang={lang} /></View>;
      case 'Career': return <View style={styles.pageWrapper}><Career lang={lang} /></View>;
      case 'Reviews': return <View style={styles.pageWrapper}><Testimonials lang={lang} /></View>;
      
      case 'HOME':
      default:
        return (
          <>
            {/* HERO SECTION */}
            <View style={styles.hero}>
              <Image source={require('../assets/dr-mp-das.png')} style={styles.img} resizeMode="cover" />
              <Text style={styles.name}>Dr. MP Das PT, LLB, RYT 500</Text>
              <Text style={styles.subName}>{t.founderTitle}</Text>
              <Text style={styles.subName}>{t.clinicalExp}</Text>
              <View style={styles.goldDivider} />
              <Text style={styles.hook}>
                {t.heroText}
                <Text style={{color: MATTE_GOLD, fontWeight: 'bold'}}>{t.heroHighlight}</Text>
              </Text>
              <TouchableOpacity style={styles.heroCta} onPress={onStart}>
                <Text style={styles.heroCtaText}>{t.ctaHero}</Text>
              </TouchableOpacity>
              <Text style={styles.dnaSubText}>{t.ctaSub}</Text>
            </View>

            {/* VECTORS GRID SECTION */}
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

            {/* PILLARS GRID SECTION */}
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
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.langToggle} 
        onPress={() => setLang(lang === 'en' ? 'as' : 'en')}
      >
        <Text style={styles.langToggleText}>{lang === 'en' ? 'অসমীয়া' : 'ENGLISH'}</Text>
      </TouchableOpacity>

      <ScrollView 
        ref={scrollRef}
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.headerLogoImage} resizeMode="contain" />
          <Text style={styles.logo}>{t.brand}</Text>
          <Text style={styles.tagline}>{t.tagline}</Text>
        </View>

        <View style={styles.navBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activePage !== 'HOME' && (
              <TouchableOpacity 
                style={[styles.navItem, {backgroundColor: MATTE_GOLD}]} 
                onPress={() => switchPage('HOME')}
              >
                <Text style={[styles.navText, {color: DEEP_BLUE}]}>{t.back}</Text>
              </TouchableOpacity>
            )}

            {t.nav.map((item, index) => {
              const keys = ["About", "TISRI", "SIBS", "Workshops", "Career", "Reviews"];
              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.navItem}
                  onPress={() => switchPage(keys[index])}
                >
                  <Text style={[styles.navText, activePage === keys[index] && {color: MATTE_GOLD}]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.mainContainer}>
          {renderMainContent()}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>{t.brand} FOUNDATION</Text>
          <View style={styles.missionBox}>
            <Text style={styles.footerMission}>{t.mission}</Text>
            <Text style={styles.missionSub}>{t.missionSub}</Text>
          </View>
          <Text style={styles.copyrightText}>POWERED BY FASCIAMAX SHATVAYU | SHATKONALIFE © 2026 SOMATIC BHARAT. ALL RIGHTS RESERVED.</Text>
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
  tagline: { color: MATTE_GOLD, fontSize: 10, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
  
  navBar: { backgroundColor: DEEP_BLUE, paddingVertical: 10 },
  navItem: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, marginHorizontal: 5 },
  navText: { color: '#FFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },

  mainContainer: { minHeight: 400 },
  pageWrapper: { padding: 20, backgroundColor: '#FFF' },

  hero: { padding: 30, alignItems: 'center', backgroundColor: '#FFF' },
  img: { width: 110, height: 140, borderRadius: 8, marginBottom: 15 },
  name: { fontSize: 18, fontWeight: '900', color: DEEP_BLUE },
  subName: { fontSize: 11, color: '#666', marginTop: 2 },
  goldDivider: { width: 40, height: 2, backgroundColor: MATTE_GOLD, marginVertical: 15 },
  hook: { fontSize: 15, textAlign: 'center', lineHeight: 26, color: '#333', marginBottom: 25, fontStyle: 'italic' },
  heroCta: { backgroundColor: DEEP_BLUE, paddingVertical: 18, paddingHorizontal: 35, borderRadius: 35, elevation: 8 },
  heroCtaText: { color: '#FFF', fontWeight: '900', fontSize: 14, letterSpacing: 1 },
  dnaSubText: { fontSize: 10, color: '#666', marginTop: 12, fontWeight: '600', textAlign: 'center' },
  
  gridSection: { paddingHorizontal: 20 },
  sectionLabel: { fontSize: 10, fontWeight: 'bold', color: MATTE_GOLD, letterSpacing: 2, textAlign: 'center', marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  vectorCard: { 
    width: '48%', 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#F0F0F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vName: { fontSize: 11, fontWeight: '900', color: DEEP_BLUE, marginBottom: 4 },
  vDesc: { fontSize: 10, color: '#666', lineHeight: 14 },

  pillarCard: { 
    width: '48%', 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: 'rgba(197, 160, 89, 0.3)' 
  },
  pTitle: { fontSize: 10, fontWeight: '900', color: MATTE_GOLD },
  pDesc: { fontSize: 9, color: '#BBB', marginTop: 2 },

  footer: { padding: 40, alignItems: 'center', backgroundColor: '#FFF' },
  footerLogo: { fontSize: 12, fontWeight: '900', color: DEEP_BLUE, marginBottom: 15 },
  missionBox: { backgroundColor: BONE_WHITE, padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  footerMission: { fontSize: 11, fontWeight: '900', color: DEEP_TEAL },
  missionSub: { fontSize: 9, color: '#666', marginTop: 4 },
  copyrightText: { fontSize: 8, color: '#BBB' }
});