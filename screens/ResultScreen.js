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
    highLoad: "High systemic load detected. Your 'NF-kB Fire' requires a clinical reset. We recommend a focused 1-on-1 session to restore your neural baseline.",
    modLoad: "Moderate tension patterns identified. Recalibration through Vagal Toning and guided fascia release will optimize your recovery.",
    restoreTitle: "RESTORE YOUR PRANA",
    inPerson: "FASCIAMAX STUDIO (IN-PERSON)",
    address: "#43, Rudrapur Bylane, Bhetapara, Guwahati",
    online: "ONLINE CLINICAL RESET",
    onlineSub: "Global Tele-Somatic Session",
    community: "JOIN MASTERCLASS COMMUNITY",
    communitySub: "Priority Access to Somatic Bharat App",
    retake: "RETAKE AUDIT"
  },
  as: {
    header: "ছ’মেটিক ভাইটেলিটি অডিট",
    calculating: "ছ’মেটিক লোড গণনা কৰা হৈছে...",
    systemicLoad: "প্ৰণালীবদ্ধ বোজা (LOAD)",
    prescriptionTitle: "ভাইটেলিটি প্ৰেছক্ৰিপচন",
    highLoad: "উচ্চ প্ৰণালীবদ্ধ বোজা ধৰা পৰিছে। আপোনাৰ 'NF-kB Fire' নিৰ্বাপিত কৰিবলৈ ক্লিনিকেল ৰিছেটৰ প্ৰয়োজন। নিউৰেল বেচলাইন পুনৰুদ্ধাৰৰ বাবে আমি ১-অন-১ চেছনৰ পৰামৰ্শ দিওঁ।",
    modLoad: "মধ্যমীয়া উত্তেজনাৰ আৰ্হি চিনাক্ত কৰা হৈছে। ভেগাল টোনিং আৰু গাইডেড ফেচিয়া ৰিলিজৰ জৰিয়তে ৰিকভাৰী উন্নত কৰিব পৰা যাব।",
    restoreTitle: "প্ৰাণ শক্তি পুনৰুদ্ধাৰ কৰক",
    inPerson: "ফেচিয়ামাক্স ষ্টুডিঅ’ (শাৰীৰিক উপস্থিতি)",
    address: "গৃহ নং ৪৩, ৰুদ্ৰপুৰ বাইলেন, ভেটাপাৰা, গুৱাহাটী",
    online: "অনলাইন ক্লিনিকেল ৰিছেট",
    onlineSub: "গ্ল’বেল টেলি-ছ’মেটিক চেছন",
    community: "মাষ্টাৰক্লাচ কমিউনিটিত যোগদান কৰক",
    communitySub: "ছ’মেটিক ভাৰত এপৰ অগ্ৰাধিকাৰ একচেছ",
    retake: "অডিট পুনৰ কৰক"
  }
};

export default function ResultScreen({ scores, onReset }) {
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang];

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
      <SafeAreaView style={{ flex: 1 }}>
        {/* FLOATING TOGGLE */}
        <TouchableOpacity style={styles.langToggle} onPress={() => setLang(lang === 'en' ? 'as' : 'en')}>
          <Text style={styles.langToggleText}>{lang === 'en' ? 'অসমীয়া' : 'ENGLISH'}</Text>
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
              {loadPercentage > 60 ? t.highLoad : t.modLoad}
            </Text>
          </View>

          {/* CONSULTATION OPTIONS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.restoreTitle}</Text>
            
            <TouchableOpacity style={styles.optionCard} onPress={openMaps}>
              <View style={styles.optionInfo}>
                <Text style={styles.optionType}>{t.inPerson}</Text>
                <Text style={styles.addressText}>{t.address}</Text>
              </View>
              <View style={styles.iconCircle}><Text>📍</Text></View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionCard} 
              onPress={() => Linking.openURL('https://calendly.com/shatvayu/fasciamax-consult')}
            >
              <View style={styles.optionInfo}>
                <Text style={styles.optionType}>{t.online}</Text>
                <Text style={styles.addressText}>{t.onlineSub}</Text>
              </View>
              <View style={styles.iconCircle}><Text>🌐</Text></View>
            </TouchableOpacity>
          </View>

          {/* COMMUNITY ACCESS */}
          <TouchableOpacity style={styles.communityBtn} onPress={openWhatsApp}>
            <LinearGradient 
              colors={[COPPER_SUN, '#D17B5D']} 
              start={{x:0, y:0}} end={{x:1, y:0}} 
              style={styles.gradientBtn}
            >
              <Text style={styles.communityBtnText}>{t.community}</Text>
              <Text style={styles.communitySubText}>{t.communitySub}</Text>
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
  headerText: { color: MOSS_GLOW, fontSize: 13, fontWeight: '900', letterSpacing: 3, marginBottom: 40, textAlign: 'center' },
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
  communityBtnText: { color: '#FFF', fontWeight: '900', fontSize: 13, letterSpacing: 1, textAlign: 'center' },
  communitySubText: { color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 5, fontWeight: '600' },
  resetBtn: { marginTop: 40, paddingBottom: 50 },
  resetText: { color: VITAL_TEAL, fontSize: 11, fontWeight: '800', letterSpacing: 1 }
});