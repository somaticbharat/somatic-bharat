import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Alert, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// --- FIREBASE IMPORTS ---
import { auth } from './firebase';
import { signOut, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

const { width } = Dimensions.get('window');

// --- MOOD-LIFTING BLUE TO WHITE VITALITY PALETTE ---
const SKY_DEEP = '#00416A';       // Rich, grounding deep ocean blue
const SKY_MID = '#0284C7';        // Vibrant, uplifting bright blue
const SKY_LIGHT = '#E0F2FE';      // Airy soft cyan-tinted mist
const PURE_WHITE = '#FFFFFF';     // Clean, breathable white
const ACCENT_GOLD = '#D97706';    // Warm restorative highlight
const TEXT_DARK = '#0F172A';      // Deep readable charcoal for white backgrounds
const TEXT_MUTED = '#475569';     // Soft supportive grey

const TRANSLATIONS = {
  en: {
    header: "SOMATIC VITALITY AUDIT",
    calculating: "CALCULATING SOMATIC LOAD...",
    systemicLoad: "SOMATIC LOAD",
    prescriptionTitle: "YOUR TAILORED VITALITY PATH",
    
    // High Load Translations
    highLoad: "High Somatic load detected. Your nervous system is working overtime. We recommend a gentle clinical reset or 1-on-1 guidance to help your body safely return to its natural baseline.",
    restoreTitleHigh: "RECOMMENDED CLINICAL CARE",
    teleconsultBtn: "SCHEDULE TELECONSULTATION",
    teleconsultSub: "1-on-1 Online Clinical Reset via Shatkona Life",
    inPersonTitle: "SHATKONA CENTER (Tanman Physiotherapy Clinic)",
    address: "#43, Rudrapur Bylane, Bhetapara, Guwahati",

    // Moderate / Low Load Translations
    modLoad: "Balanced patterns identified! You are in an ideal space to practice self-guided daily vagal toning and mindful fascia maintenance to keep your energy flowing smoothly.",
    restoreTitleMod: "BUILD YOUR DAILY PRACTICE",
    waitlistBtn: "JOIN APP LAUNCH WAITLIST",
    waitlistSub: "Get Priority Access to Shatkona Life App & Masterclasses",

    // Action & Retake
    saveAndContinue: "SAVE RESULTS & PROCEED",
    community: "JOIN MASTERCLASS COMMUNITY",
    communitySub: "Connect with our Somatic Wellness Network",
    retake: "LOGOUT",
    loginTitle: "Phone OTP Authentication"
  },
  as: {
    header: "ছ’মেটিক ভাইটেলিটি অডিট",
    calculating: "ছ’মেটিক লোড গণনা কৰা হৈছে...",
    systemicLoad: "স্নায়ৱিক হেঁচা (LOAD)",
    prescriptionTitle: "আপোনাৰ বাবে বিশেষ পৰামৰ্শ",
    
    // High Load Translations
    highLoad:"আপোনাৰ শৰীৰত অত্যাধিক স্নায়ৱিক হেঁচা ধৰা পৰিছে। এই অৱস্থাৰ পৰা মুক্ত হ'বলৈ সঠিক চিকিৎসা আৰু চিকিৎসকৰ পোনপটীয়া পৰামৰ্শৰ প্ৰয়োজন।",
    restoreTitleHigh: "চিকিৎসাৰ পৰামৰ্শ",
    teleconsultBtn: "অনলাইন টেলি-কনচাল্টেশ্যন",
    teleconsultSub: "ষটকোন লাইফৰ জৰিয়তে ১-অন-১ চেছন বুক কৰক",
    inPersonTitle: "ষটকোন কেন্দ্ৰ’(তনমন ফিজিঅ’থেৰাপী ক্লিনিক)",
    address: "গৃহ নং ৪৩, ৰুদ্ৰপুৰ বাইলেন, ভেটাপাৰা, গুৱাহাটী",

    // Moderate / Low Load Translations
    modLoad: "মধ্যমীয়াৰ পৰা নূন্যতম স্নায়ৱিক হেঁচা চিনাক্ত কৰা হৈছে। দৈনন্দিন ফেচিয়া ৰিলিজ আৰু স্ব-পৰিচৰ্যাৰ বাবে আপুনি উপযুক্ত।",
    restoreTitleMod: "দৈনন্দিন অভ্যাস গঢ়ি তুলক",
    waitlistBtn: "এপ মুকলিৰ ৱেইটলিষ্টত যোগ দিয়ক",
    waitlistSub: "ষটকোন লাইফ এপৰ প্ৰথম সুবিধা লাভ কৰক",

    // Action & Retake
    saveAndContinue: "ফলাফল সংৰক্ষণ কৰক",
    community: "মাষ্টাৰক্লাচ কমিউনিটিত যোগদান কৰক",
    communitySub: "ছ’মেটিক ৱেলনেচ নেটৱৰ্কৰ সৈতে সংলগ্ন হওক",
    retake: "লগআউট",
    loginTitle: "ফোন ও.টি.পি. লগইন"
  }
};

export default function ResultScreen({ scores, onSaveTrigger, onReset, lang: parentLang, setLang: parentSetLang }) {
  const [localLang, setLocalLang] = useState(parentLang || 'en');
  const currentLang = parentLang || localLang;
  const t = TRANSLATIONS[currentLang];

  // OTP Login Modal States
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);

  // Setup Recaptcha Verifier for Web/Firebase Auth
  useEffect(() => {
    if (otpModalVisible && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-result', {
          size: 'invisible',
          callback: () => {},
          'expired-callback': () => {}
        });
      } catch (e) {
        console.log("Recaptcha init error:", e);
      }
    }
  }, [otpModalVisible]);

  const handleLangToggle = () => {
    if (parentSetLang) {
      parentSetLang();
    } else {
      setLocalLang(prev => (prev === 'en' ? 'as' : 'en'));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been logged out successfully.");
      if (onReset) {
        onReset();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // --- SEND OTP ---
  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number with country code (e.g. +91XXXXXXXXXX)");
      return;
    }
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmResult(confirmation);
      Alert.alert("OTP Sent", "Check your phone for the verification code.");
    } catch (error) {
      Alert.alert("OTP Error", error.message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId) => {
          window.grecaptcha.reset(widgetId);
        });
      }
    }
  };

  // --- VERIFY OTP ---
  const handleVerifyOTP = async () => {
    if (!otpCode || otpCode.length < 6) {
      Alert.alert("Error", "Please enter the 6-digit OTP.");
      return;
    }
    try {
      await confirmResult.confirm(otpCode);
      Alert.alert("Success", "Phone verified and logged in successfully!");
      setOtpModalVisible(false);
      setConfirmResult(null);
      setPhoneNumber('');
      setOtpCode('');
    } catch (error) {
      Alert.alert("Verification Failed", error.message);
    }
  };

  if (!scores || Object.keys(scores).length === 0) {
    return (
      <LinearGradient colors={[SKY_DEEP, SKY_MID]} style={styles.fullContainer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: PURE_WHITE, letterSpacing: 2, fontWeight: '600' }}>{t.calculating}</Text>
        </View>
      </LinearGradient>
    );
  }

  const scoreValues = Object.values(scores);
  const totalScore = scoreValues.reduce((a, b) => a + b, 0);
  const maxPossible = 180;
  const loadPercentage = Math.round((totalScore / maxPossible) * 100);
  const isHighLoad = loadPercentage > 50;

  return (
    <LinearGradient colors={[SKY_DEEP, SKY_MID, SKY_LIGHT, PURE_WHITE]} style={styles.fullContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* FLOATING LANGUAGE TOGGLE */}
        <TouchableOpacity style={styles.langToggle} onPress={handleLangToggle}>
          <Text style={styles.langToggleText}>{currentLang === 'en' ? 'অসমীয়া' : 'ENGLISH'}</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* HEADER TITLE */}
          <Text style={styles.headerText}>{t.header}</Text>

          {/* BREATHING ROOM & SCORE RING */}
          <View style={styles.scoreContainer}>
            <View style={styles.outerRing}>
              <Text style={styles.percentageText}>{loadPercentage}%</Text>
              <Text style={styles.loadLabel}>{t.systemicLoad}</Text>
            </View>
          </View>

          {/* HIGHLIGHTED PRESCRIPTION BOX */}
          <View style={styles.prescriptionBox}>
            <View style={styles.prescriptionGlowBar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.prescriptionTitle}>{t.prescriptionTitle}</Text>
              <Text style={styles.prescriptionBody}>
                {isHighLoad ? t.highLoad : t.modLoad}
              </Text>
            </View>
          </View>

          {/* NEXT STEP SECTION WITH AMPLE BREATHING SPACE */}
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
                <Text style={{ fontSize: 16 }}>{isHighLoad ? '🌐' : '✨'}</Text>
              </View>
            </View>
          </View>

          {/* PRIMARY CALL TO ACTION BUTTON */}
          <TouchableOpacity style={styles.communityBtn} onPress={onSaveTrigger} activeOpacity={0.9}>
            <LinearGradient 
              colors={[SKY_MID, SKY_DEEP]} 
              start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
              style={styles.gradientBtn}
            >
              <Text style={styles.communityBtnText}>{t.saveAndContinue}</Text>
              <Text style={styles.communitySubText}>Secure your score & access tailored options</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* PHONE OTP LOGIN TRIGGER */}
          <TouchableOpacity onPress={() => setOtpModalVisible(true)} style={styles.otpTriggerBtn}>
            <Text style={styles.otpTriggerText}>Login via Phone OTP</Text>
          </TouchableOpacity>

          {/* LOGOUT / RETAKE ACTION */}
          <TouchableOpacity onPress={handleLogout} style={styles.resetBtn}>
            <Text style={styles.resetText}>{t.retake}</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* --- PHONE OTP MODAL --- */}
        <Modal visible={otpModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t.loginTitle}</Text>
              
              {!confirmResult ? (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Phone Number (+91...)" 
                    placeholderTextColor="#888" 
                    keyboardType="phone-pad"
                    value={phoneNumber} 
                    onChangeText={setPhoneNumber} 
                  />
                  <View nativeID="recaptcha-container-result" style={{ marginVertical: 5 }} />
                  <TouchableOpacity style={styles.modalBtn} onPress={handleSendOTP}>
                    <Text style={styles.modalBtnText}>Send OTP</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Enter 6-digit OTP" 
                    placeholderTextColor="#888" 
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otpCode} 
                    onChangeText={setOtpCode} 
                  />
                  <TouchableOpacity style={styles.modalBtn} onPress={handleVerifyOTP}>
                    <Text style={styles.modalBtnText}>Verify OTP & Login</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity onPress={() => { setOtpModalVisible(false); setConfirmResult(null); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullContainer: { flex: 1 },
  langToggle: { position: 'absolute', top: 50, right: 24, zIndex: 1000, backgroundColor: PURE_WHITE, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  langToggleText: { color: SKY_DEEP, fontWeight: '900', fontSize: 10, letterSpacing: 1 },
  scrollContent: { paddingHorizontal: 28, paddingTop: 70, paddingBottom: 60, alignItems: 'center' },
  headerText: { color: PURE_WHITE, fontSize: 13, fontWeight: '900', letterSpacing: 3, marginBottom: 40, textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.15)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  scoreContainer: { marginBottom: 40, alignItems: 'center' },
  outerRing: { width: 150, height: 150, borderRadius: 75, borderWidth: 3, borderColor: PURE_WHITE, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.18)', shadowColor: '#FFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },
  percentageText: { color: PURE_WHITE, fontSize: 40, fontWeight: '200', letterSpacing: 1 },
  loadLabel: { color: PURE_WHITE, fontSize: 9, letterSpacing: 1.5, marginTop: 6, fontWeight: '800', opacity: 0.9 },
  prescriptionBox: { flexDirection: 'row', width: '100%', padding: 24, borderRadius: 20, backgroundColor: PURE_WHITE, borderWidth: 1, borderColor: 'rgba(2, 132, 199, 0.15)', marginBottom: 35, shadowColor: '#0284C7', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 4 },
  prescriptionGlowBar: { width: 4, backgroundColor: SKY_MID, borderRadius: 2, marginRight: 16 },
  prescriptionTitle: { color: ACCENT_GOLD, fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 10 },
  prescriptionBody: { color: TEXT_DARK, fontSize: 13, lineHeight: 24, fontWeight: '400', opacity: 0.9 },
  section: { width: '100%', marginBottom: 30 },
  sectionTitle: { color: TEXT_DARK, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 14, opacity: 0.8 },
  optionCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: PURE_WHITE, padding: 20, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(2, 132, 199, 0.12)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  optionInfo: { flex: 1, paddingRight: 10 },
  optionType: { color: TEXT_DARK, fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
  addressText: { color: TEXT_MUTED, fontSize: 10, marginTop: 6, lineHeight: 15, fontWeight: '500' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: SKY_LIGHT, justifyContent: 'center', alignItems: 'center' },
  communityBtn: { width: '100%', marginTop: 10, borderRadius: 18, overflow: 'hidden', shadowColor: SKY_DEEP, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 5 },
  gradientBtn: { paddingVertical: 20, paddingHorizontal: 20, alignItems: 'center' },
  communityBtnText: { color: PURE_WHITE, fontWeight: '900', fontSize: 12, letterSpacing: 1.5, textAlign: 'center' },
  communitySubText: { color: PURE_WHITE, fontSize: 9, marginTop: 6, fontWeight: '600', opacity: 0.85, letterSpacing: 0.5 },
  otpTriggerBtn: { marginTop: 25, paddingVertical: 10, alignItems: 'center' },
  otpTriggerText: { color: SKY_DEEP, fontSize: 11, fontWeight: '800', letterSpacing: 1, textDecorationLine: 'underline' },
  resetBtn: { marginTop: 15, paddingBottom: 20, alignItems: 'center' },
  resetText: { color: TEXT_MUTED, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#FFF', padding: 25, borderRadius: 15, alignItems: 'center' },
  modalTitle: { fontSize: 16, fontWeight: '900', color: SKY_DEEP, marginBottom: 15 },
  input: { width: '100%', borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 12, backgroundColor: PURE_WHITE },
  modalBtn: { backgroundColor: SKY_DEEP, width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  modalBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  cancelText: { color: '#888', marginTop: 15, fontSize: 11, fontWeight: 'bold' }
});