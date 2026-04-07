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
    statsTitle: "A National Somatic Epidemic",
    statsText1: "Over 80% of sufferers are women—mothers, homemakers, and professionals silenced by an invisible fire.",
    statsText2: "This is the systemic 'NF-kB Fire' turning local muscle knots into total neural sensitization.",
    originLabel: "THE ORIGIN STORY",
    originTitle: "About Somatic Bharat Foundation | One Discovery | One Mission | One Bharat",
    aboutBody: "While searching for a permanent solution with 12+ years of clinical experience in 1,000+ cases of chronic pain where traditional physio or medicine alone failed, Dr. MP Das discovered the MSR Protocol. He identified how a muscle knot triggers the 'NF-kB Fire,' leading to systemic brain re-wiring.",
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
      { title: 'QUANTUM BREATH', desc: 'Lymphatic drainage and oxygen-CO2 balancing for deep cellular detox.' },
      { title: 'MERIDIAN STRETCH', desc: 'Kinetic elongation of energy pathways to release stagnant load.' },
      { title: 'FASCIAL MFR', desc: 'Manual manipulation of connective tissue to restore fluid flow.' },
      { title: 'PRECISION LOADING', desc: 'Biomechanical training for systemic strength and structural resilience.' },
      { title: 'CHAKRA BHEDANAM', desc: 'Neural alignment and empathic shielding for sensory resilience.' },
      { title: 'MAHANIDRA', desc: 'Neuroplasticity and epigenetic flush through deep somatic recovery.' }
    ],
    extinguish: "Extinguish the NF-kB Fire.",
    ctaActive: "START CLINICAL AUDIT",
    ctaLocked: "Swipe all pillars to unlock Audit ↑",
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
    statsTitle: "এক ৰাষ্ট্ৰীয় ছ’মেটিক মহামাৰী",
    statsText1: "৮০%-তকৈ অধিক ভুক্তভোগী মহিলা—মাতৃ, গৃহিনী আৰু পেছাদাৰী যিসকল এক অদৃশ্য জুইৰ দ্বাৰা নিৰ্বাক হৈ পৰিছে।",
    statsText2: "এইটোৱেই হৈছে প্ৰণালীবদ্ধ 'NF-kB Fire' যিয়ে স্থানীয় পেশীৰ গাঁঠিৰ বিষক সম্পূৰ্ণ নিউৰেল চেন্সিটাইজেচনলৈ পৰিবৰ্তন কৰে।",
    originLabel: "আৱিষ্কাৰৰ কাহিনী",
    originTitle: "ছ’মেটিক ভাৰত ফাউণ্ডেশ্যন | এক আৱিষ্কাৰ | এক লক্ষ্য | এক ভাৰত",
    aboutBody: "১২ বছৰৰ ক্লিনিকেল অভিজ্ঞতাৰ সৈতে এক স্থায়ী সমাধান বিচাৰি থাকোতে ড° এমপি দাসে MSR প্ৰ’ট’কল আৱিষ্কাৰ কৰে। তেখেতে চিনাক্ত কৰিছিল কেনেকৈ এটা পেশীৰ গাঁঠিয়ে অৱশেষত 'NF-kB Fire' ক ট্ৰিগাৰ কৰি মগজুৰ কাৰ্যপ্ৰণালী সলনি কৰি পেলায়।",
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
      { title: 'কোৱাণ্টাম ব্ৰেথ', desc: 'লিম্ফেটিক ড্ৰেইনেজ আৰু কোষৰ গভীৰ ডিটক্সৰ বাবে অক্সিজেন-CO2 ৰ সন্তুলন।' },
      { title: 'মেৰিডিয়ান ষ্ট্ৰেচ', desc: 'স্থবিৰ লোড মুকলি কৰিবলৈ শক্তি পথৰ গতিশীল সম্প্ৰসাৰণ।' },
      { title: 'ফেচিয়েল MFR', desc: 'তৰল প্ৰবাহ পুনৰুদ্ধাৰৰ বাবে সংযোজক কলাৰ মেনুৱেল মেনিপুলেচন।' },
      { title: 'প্ৰিচিজন লোডিং', desc: 'প্ৰণালীবদ্ধ শক্তি আৰু গাঁথনিগত স্থিতিস্থাপকতাৰ বাবে বায়’মেকানিকেল প্ৰশিক্ষণ।' },
      { title: 'চক্ৰ ভেদনম', desc: 'সংবেদনশীল স্থিতিস্থাপকতাৰ বাবে নিউৰেল এলাইনমেণ্ট আৰু এম্পেথিক শ্বিল্ডিং।' },
      { title: 'মহানিদ্ৰা', desc: 'গভীৰ ছ’মেটিক ৰিকভাৰীৰ জৰিয়তে নিউৰ’প্লাষ্টিচিটি আৰু এপিজেনেটিক ফ্লাছ।' }
    ],
    extinguish: "NF-kB Fire নিৰ্বাপিত কৰক।",
    ctaActive: "ক্লিনিকেল অডিট আৰম্ভ কৰক",
    ctaLocked: "অডিট খুলিবলৈ সকলো স্তম্ভ স্বাইপ কৰক ↑",
    mission: "মিছন ২০৪৭",
    missionSub: "ভাৰতৰ নিউৰ’-ৰেচিলিয়েঞ্চ গঠন"
  }
};

export default function HomeScreen({ onStart }) {
  const [activePillar, setActivePillar] = useState(0);
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <SafeAreaView style={styles.container}>
      {/* FLOATING TOGGLE */}
      <TouchableOpacity style={styles.langToggle} onPress={() => setLang(lang === 'en' ? 'as' : 'en')}>
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
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>{t.statsTitle}</Text>
          <Text style={styles.statsText}>{t.statsText1}</Text>
          <View style={styles.divider} />
          <Text style={styles.statsText}>{t.statsText2}</Text>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionLabel}>{t.originLabel}</Text>
          <Text style={styles.sectionTitle}>{t.originTitle}</Text>
          <Text style={styles.aboutBody}>{t.aboutBody}</Text>
        </View>

        <View style={styles.vectorSection}>
          <Text style={styles.sectionLabel}>{t.vectorLabel}</Text>
          <View style={styles.vectorGrid}>
            {t.vectors.map((v, i) => (
              <View key={i} style={styles.vectorCard}>
                <Text style={styles.vName}>{v.n}</Text>
                <Text style={styles.vDesc}>{v.d}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.pillarCarouselSection}>
          <Text style={[styles.sectionLabel, {color: MATTE_GOLD, marginBottom: 15}]}>{t.pillarsLabel}</Text>
          <FlatList
            data={t.pillars}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            onScroll={(e) => setActivePillar(Math.round(e.nativeEvent.contentOffset.x / width))}
            renderItem={({ item, index }) => (
              <View style={styles.pillarCarouselCard}>
                <Text style={styles.pNum}>0{index+1}</Text>
                <Text style={styles.pTitle}>{item.title}</Text>
                <View style={styles.goldDividerSmall} />
                <Text style={styles.pSub}>{item.desc}</Text>
              </View>
            )}
          />
          <View style={styles.dotRow}>
            {t.pillars.map((_, i) => (
              <View key={i} style={[styles.dot, { backgroundColor: activePillar === i ? MATTE_GOLD : '#666' }]} />
            ))}
          </View>
        </View>

        <View style={styles.auditCtaSection}>
          {activePillar === 5 ? (
            <TouchableOpacity style={styles.btnUnlocked} onPress={onStart}>
              <Text style={styles.btnTextUnlocked}>{t.ctaActive}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.lockedBtn}>
              <Text style={styles.lockedBtnText}>{t.ctaLocked}</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>{t.brand} FOUNDATION</Text>
          <View style={styles.missionBox}>
            <Text style={styles.footerMission}>{t.mission}</Text>
            <Text style={styles.missionSub}>{t.missionSub}</Text>
          </View>
          <Text style={styles.copyrightText}>Powered by FasciaMax Shatvayu | ShatkonaLife © 2026 SOMATIC BHARAT. ALL RIGHTS RESERVED.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BONE_WHITE },
  langToggle: { position: 'absolute', top: 50, right: 20, zIndex: 1000, backgroundColor: MATTE_GOLD, padding: 8, borderRadius: 20 },
  langToggleText: { color: DEEP_BLUE, fontWeight: '900', fontSize: 10 },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  header: { backgroundColor: DEEP_BLUE, padding: 25, alignItems: 'center' },
  headerLogoImage: { width: 60, height: 60, marginBottom: 10 },
  logo: { fontSize: 20, fontWeight: '900', color: '#FFF', letterSpacing: 2 },
  tagline: { color: MATTE_GOLD, fontSize: 10, fontWeight: 'bold', marginTop: 5 },
  hero: { padding: 30, alignItems: 'center', backgroundColor: '#FFF' },
  img: { width: 110, height: 140, borderRadius: 8, marginBottom: 15 },
  name: { fontSize: 18, fontWeight: '900', color: DEEP_BLUE },
  subName: { fontSize: 11, color: '#666', marginTop: 2 },
  goldDivider: { width: 40, height: 2, backgroundColor: MATTE_GOLD, marginVertical: 15 },
  hook: { fontSize: 14, textAlign: 'center', lineHeight: 22, color: '#444' },
  statsCard: { margin: 20, marginTop: -20, backgroundColor: '#FFF', borderRadius: 15, padding: 20, elevation: 5 },
  statsTitle: { fontSize: 12, fontWeight: 'bold', color: MATTE_GOLD, marginBottom: 10 },
  statsText: { fontSize: 14, color: '#333', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 10 },
  aboutSection: { padding: 30 },
  sectionLabel: { fontSize: 10, fontWeight: 'bold', color: MATTE_GOLD, letterSpacing: 2, textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: DEEP_TEAL, marginVertical: 10, textAlign: 'center' },
  aboutBody: { fontSize: 14, color: '#444', lineHeight: 22, textAlign: 'center' },
  vectorSection: { padding: 25 },
  vectorGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 15 },
  vectorCard: { width: '48%', backgroundColor: '#FFF', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EEE' },
  vName: { fontSize: 10, fontWeight: '900', color: DEEP_BLUE },
  vDesc: { fontSize: 9, color: '#666', marginTop: 2 },
  pillarCarouselSection: { paddingVertical: 30, backgroundColor: DEEP_BLUE },
  pillarCarouselCard: { width: width, paddingHorizontal: 40, alignItems: 'center' },
  pNum: { color: 'rgba(197, 160, 89, 0.1)', fontWeight: '900', fontSize: 60, position: 'absolute', top: -10 },
  pTitle: { color: '#FFF', fontWeight: '800', fontSize: 20, marginTop: 30, textAlign: 'center' },
  goldDividerSmall: { width: 30, height: 2, backgroundColor: MATTE_GOLD, marginVertical: 15 },
  pSub: { color: '#CCC', fontSize: 14, textAlign: 'center', lineHeight: 22 },
  dotRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 4 },
  auditCtaSection: { padding: 30, alignItems: 'center' },
  btnUnlocked: { backgroundColor: DEEP_BLUE, paddingVertical: 18, paddingHorizontal: 35, borderRadius: 30 },
  btnTextUnlocked: { color: MATTE_GOLD, fontWeight: '900', fontSize: 12 },
  lockedBtn: { backgroundColor: '#001D21', padding: 18, borderRadius: 30, borderWidth: 1, borderColor: CYAN_NEON, width: '90%', alignItems: 'center' },
  lockedBtnText: { color: CYAN_NEON, fontSize: 11, fontWeight: '900', opacity: 0.8 },
  footer: { padding: 40, alignItems: 'center', backgroundColor: '#FFF' },
  footerLogo: { fontSize: 12, fontWeight: '900', color: DEEP_BLUE, marginBottom: 15 },
  missionBox: { backgroundColor: BONE_WHITE, padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  footerMission: { fontSize: 11, fontWeight: '900', color: DEEP_TEAL },
  missionSub: { fontSize: 9, color: '#666', marginTop: 4 },
  copyrightText: { fontSize: 8, color: '#BBB' }
});