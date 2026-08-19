import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Dimensions, Platform, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// LIVEN VITALITY PALETTE
const EARTH_DARK = '#001D21';   // Deep Grounding Cyan/Black
const VITAL_TEAL = '#0be1f5';   // Prana / Fluidity
const MOSS_GLOW = '#83C5BE';    // Growth / Vagal Tone
const COPPER_SUN = '#78e2ad';   // Heat / Healing / Shatkona
const MIST_SILVER = '#EDF6F9';  // Clarity
const MATTE_GOLD = '#C5A059';

const TRANSLATIONS = {
  en: {
    header: "SOMATIC VITALITY AUDIT",
    calculating: "CALCULATING SOMATIC LOAD...",
    systemicLoad: "SYSTEMIC LOAD",
    prescriptionTitle: "VITALITY PRESCRIPTION",
    
    // High Load Translations
    highLoad: "High systemic load detected. Your somatic system requires a clinical reset. We recommend a 1-on-1 consultation or studio visit to restore your baseline.",
    restoreTitleHigh: "RECOMMENDED CLINICAL CARE",
    teleconsultBtn: "SCHEDULE TELECONSULTATION",
    teleconsultSub: "1-on-1 Online Clinical Reset via Shatkona Life",
    inPersonTitle: "SHATKONA CENTER (Tanman Physiotherapy Clinic)",
    address: "#43, Rudrapur Bylane, Bhetapara, Guwahati",

    // Moderate / Low Load Translations
    modLoad: "Moderate to low tension patterns identified. You are a great candidate for self-guided daily vagal toning and guided fascia maintenance.",
    restoreTitleMod: "BUILD YOUR DAILY PRACTICE",
    waitlistBtn: "JOIN APP LAUNCH WAITLIST",
    waitlistSub: "Get Priority Access to Shatkona Life App & Masterclasses",

    // Action & Retake
    saveAndContinue: "SAVE RESULTS & UNLOCK PATHWAY",
    community: "JOIN MASTERCLASS COMMUNITY",
    communitySub: "Connect with our Somatic Wellness Network",
    retake: "RETAKE AUDIT"
  },
  as: {
    header: "ছ’মেটিক ভাইটেলিটি অডিট",
    calculating: "ছ’মেটিক লোড গণনা কৰা হৈছে...",
    systemicLoad: "প্ৰণালীবদ্ধ বোজা (LOAD)",
    prescriptionTitle: "ভাইটেলিটি প্ৰেছক্ৰিপচন",
    
    // High Load Translations
    highLoad: "উচ্চ প্ৰণালীবদ্ধ বোজা ধৰা পৰিছে। আপোনাৰ নিউৰেল বেচলাইন পুনৰুদ্ধাৰৰ বাবে ক্লিনিকেল ৰিছেট আৰু ১-অন-১ পৰামৰ্শৰ প্ৰয়োজন।",
    restoreTitleHigh: "পৰামৰ্শিত ক্লিনিকেল সেৱা",
    teleconsultBtn: "অনলাইন টেলি-কনচাল্টেশ্যন",
    teleconsultSub: "ছ’মেটিক লাইফৰ জৰিয়তে ১-অন-১ চেছন বুক কৰক",
    inPersonTitle: "ষটকোন কেন্দ্ৰ’(তনমন ফিজিঅ’থেৰাপী ক্লিনিক)",
    address: "গৃহ নং ৪৩, ৰুদ্ৰপুৰ বাইলেন, ভেটাপাৰা, গুৱাহাটী",

    // Moderate / Low Load Translations
    modLoad: "মধ্যমীয়াৰ পৰা নূন্যতম উত্তেজনাৰ আৰ্হি চিনাক্ত কৰা হৈছে। দৈনন্দিন ফেচিয়া ৰিলিজ আৰু স্ব-পৰিচৰ্যাৰ বাবে আপুনি উপযুক্ত।",
    restoreTitleMod: "দৈনন্দিন অভ্যাস গঢ়ি তুলক",
    waitlistBtn: "এপ মুকলিৰ ৱেইটলিষ্টত যোগ দিয়ক",
    waitlistSub: "ছ’মেটিক লাইফ এপৰ অগ্ৰাধিকাৰ একচেছ প্ৰাপ্ত কৰক",

    // Action & Retake
    saveAndContinue: "ফলাফল সংৰক্ষণ কৰি আগবাঢ়ক",
    community: "মাষ্টাৰক্লাচ কমিউনিটিত যোগদান কৰক",
    communitySub: "ছ’মেটিক ৱেলনেচ নেটৱৰ্কৰ সৈতে সংলগ্ন হওক",
    retake: "অডিট পুনৰ কৰক"
  }
};

export default function ResultScreen({ scores, onSaveTrigger, onReset, lang: parentLang, setLang: parentSetLang }) {
  // Local language state fallback if parent lang isn't passed down directly
  const [localLang, setLocalLang] = useState(parentLang || 'en');
  const currentLang = parentLang || localLang;
  const t = TRANSLATIONS[currentLang];

  const handleLangToggle = () => {
    if (parentSetLang) {
      parentSetLang();
    } else {
      setLocalLang(prev => (prev === 'en' ? 'as' : 'en'));
    }
  };

  // --- SAFETY GUARD ---
  if (!scores || Object.keys(scores).length === 0) {
    return (
      <View style={[styles.fullContainer, { justifyContent: 'center', alignItems: 'center', backgroundColor: EARTH_DARK }]}>
        <Text style={{ color: MOSS_GLOW, letterSpacing: 2 }}>{t.calculating}</Text>
      </View>
    );
  }

  const scoreValues = Object.values(scores);
  const totalScore = scoreValues.reduce((a, b) => a + b, 0);
  const maxPossible = 180;
  const loadPercentage = Math.round((totalScore / maxPossible) * 100);
  const isHighLoad = loadPercentage > 50; // Adjust threshold matching your App.js logic

  return (
    <LinearGradient colors={[EARTH_DARK, '#002F35']} style={styles.fullContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* FLOATING TOGGLE */}
        <TouchableOpacity style={styles.langToggle} onPress={handleLangToggle}>
          <Text style={styles.langToggleText}>{currentLang === 'en' ? 'অসমীয়া' : 'ENGLISH'}</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.headerText}>{t.header}</Text>

          {/* SCORE RING */}
          <View style={styles.scoreContainer}>
            <View style={styles.outerRing}>
              <Text style={styles.percentageText}>{loadPercentage}%</Text>
              <Text style={styles.loadLabel}>{t.systemicLoad}</Text>
            </View>
          </View>

          {/* PRESCRIPTION BOX */}
          <View style={styles.prescriptionBox}>
            <Text style={styles.prescriptionTitle}>{t.prescriptionTitle}</Text>
            <Text style={styles.prescriptionBody}>
              {isHighLoad ? t.highLoad : t.modLoad}
            </Text>
          </View>

          {/* SUMMARY PREVIEW OF NEXT STEP */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isHighLoad ? t.restoreTitleHigh : t.restoreTitleMod}
            </Text>
            
            <View style={styles.optionCard}>
              <View style={styles.optionInfo}>
                <Text style={styles.optionType}>
                  {isHighLoad ? t.teleconsultBtn : t.waitlistBtn}
                </Text>
                <Text style={styles.addressText}>
                  {isHighLoad ? t.teleconsultSub : t.waitlistSub}
                </Text>
              </View>
              <View style={styles.iconCircle}>
                <Text>{isHighLoad ? '🌐' : '📱'}</Text>
              </View>
            </View>
          </View>

          {/* PRIMARY CALL TO ACTION: SAVE & PROCEED TO AUTH/DESTINATION */}
          <TouchableOpacity style={styles.communityBtn} onPress={onSaveTrigger}>
            <LinearGradient 
              colors={[COPPER_SUN, '#D17B5D']} 
              start={{x:0, y:0}} end={{x:1, y:0}} 
              style={styles.gradientBtn}
            >
              <Text style={styles.communityBtnText}>{t.saveAndContinue}</Text>
              <Text style={styles.communitySubText}>Secure your score & access tailored options</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
            <Text style={styles.resetText}>{t.retake}</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullContainer: { flex: 1 },
  langToggle: { position: 'absolute', top: 50, right: 20, zIndex: 1000, backgroundColor: MATTE_GOLD, padding: 8, borderRadius: 20 },
  langToggleText: { color: EARTH_DARK, fontWeight: '900', fontSize: 10 },
  scrollContent: { padding: 25, alignItems: 'center', paddingTop: 60 },
  headerText: { color: MOSS_GLOW, fontSize: 13, fontWeight: '900', letterSpacing: 3, marginBottom: 30, textAlign: 'center' },
  scoreContainer: { marginBottom: 30 },
  outerRing: { 
    width: 140, height: 140, borderRadius: 70, 
    borderWidth: 2, borderColor: VITAL_TEAL, 
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(131, 197, 190, 0.05)'
  },
  percentageText: { color: MIST_SILVER, fontSize: 36, fontWeight: '200' },
  loadLabel: { color: MOSS_GLOW, fontSize: 9, letterSpacing: 1, marginTop: 5, fontWeight: '700' },
  prescriptionBox: { 
    width: '100%', padding: 22, borderRadius: 15, 
    backgroundColor: 'rgba(131, 197, 190, 0.08)', 
    borderWidth: 1, borderColor: 'rgba(131, 197, 190, 0.2)',
    marginBottom: 30 
  },
  prescriptionTitle: { color: COPPER_SUN, fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 10 },
  prescriptionBody: { color: MIST_SILVER, fontSize: 13, lineHeight: 22, opacity: 0.85 },
  section: { width: '100%', marginBottom: 20 },
  sectionTitle: { color: VITAL_TEAL, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 12 },
  optionCard: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 109, 119, 0.15)', padding: 18, borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(0, 109, 119, 0.3)'
  },
  optionInfo: { flex: 1 },
  optionType: { color: '#FFF', fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  addressText: { color: MOSS_GLOW, fontSize: 10, marginTop: 4, opacity: 0.7 },
  iconCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  communityBtn: { width: '100%', marginTop: 10, borderRadius: 16, overflow: 'hidden' },
  gradientBtn: { padding: 18, alignItems: 'center' },
  communityBtnText: { color: '#FFF', fontWeight: '900', fontSize: 12, letterSpacing: 1, textAlign: 'center' },
  communitySubText: { color: 'rgba(255,255,255,0.7)', fontSize: 9, marginTop: 4, fontWeight: '600' },
  resetBtn: { marginTop: 30, paddingBottom: 40 },
  resetText: { color: VITAL_TEAL, fontSize: 11, fontWeight: '800', letterSpacing: 1 }
});