import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Dimensions,
  Alert,
  Modal,
  TextInput
} from 'react-native';

// --- FIREBASE IMPORTS ---
import { auth, db } from './firebase';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { AboutUs } from './components/Header/AboutUs';
import { TISRI } from './components/Header/TISRI';
import { SIBS } from './components/Header/SIBS';
import { Workshops } from './components/Header/Workshops';
import { Career } from './components/Header/Career';
import { Testimonials } from './components/Header/Testimonials';

const { width } = Dimensions.get('window');

const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';
const BONE_WHITE = '#F9F8F4';
const DEEP_TEAL = '#004D40';

const translations = {
  en: {
    brand: "SOMATIC BHARAT MOVEMENT",
    nav: ["ABOUT", "TISRI", "SIBS ACADEMY", "WORKSHOPS", "CAREER", "REVIEWS"],
    back: "← BACK TO HOME",
    tagline: "Building a Neuro-Resilient India",
    login: "LOGIN",
    logout: "LOGOUT",
    auditBtn: "START SOMATIC AUDIT",
    volunteerBtn: "JOIN MISSION 2030 VOLUNTEER",
    heroText: "The MRI says you're fine. Blood reports are 'normal'. All treatments failed? Called just in your head? But your body is imploring, seeking deliverance from the pain. Then don't worry anymore. The fatigue, the brain fog, the moving pain—it's not in your head. It's an invisible fire called ",
    heroHighlight: "Central Sensitization—the hidden root behind conditions like Fibromyalgia.",
    ctaHero: "Discover yourself with the 3-min SOMATIC audit",
    ctaSub: "Stop Guessing, Start Healing.",
    vectorLabel: "WHERE IS YOUR FIRE BURNING?",
    vectors: [
      { n: 'MECHANICAL', d: 'Joint & Tissue Load' },
      { n: 'ANCESTRAL', d: 'Epigenetic Imprints' },
      { n: 'NEURAL', d: 'Nervous Overdrive' },
      { n: 'ATMOSPHERIC', d: 'Environmental Stress' },
      { n: 'STRUCTURAL', d: 'Fascial Alignment' },
      { n: 'HUMORAL', d: 'Systemic Toxicity' }
    ],
    epidemiologyTitle: "EPIDEMIOLOGICAL & ECONOMIC PARAMETERS",
    metrics: [
      { n: 'Prevalence Dynamics', d: '≈15–20% of adult population in India (~200 million individuals) suffer from persistent chronic pain.' },
      { n: 'Demographic Skew', d: 'Fibromyalgia and central sensitization exhibit a ~90%:10% (9:1) female-to-male ratio.' },
      { n: 'Age of Onset', d: 'Peak morbidity concentrates in the 20–50 year demographic, impacting peak economic productivity.' },
      { n: 'Productivity Degradation', d: 'Affected individuals experience a 20–50% decrement in functional work capacity due to neuro-cognitive impairment.' },
      { n: 'Presenteeism Multiplier', d: 'Output loss attributable to presenteeism is quantified at 2 to 4 times greater than total absenteeism.' }
    ],
    mission: "MISSION 2030",
    missionSub: "Building NeuroResilience of Bharat"
  },
  as: {
    brand: "ছ’মেটিক ভাৰত মুভমেণ্ট",
    nav: ["আমাৰ বিষয়ে", "TISRI গৱেষণা", "SIBS একাডেমী", "কৰ্মশালা", "কেৰিয়াৰ", "মতামত"],
    back: "← পাছলৈ যাওক",
    tagline: "এক সুদৃঢ় স্নায়ৱিক ভাৰতীয় সমাজ গঠনৰ যাত্ৰা",
    login: "লগ-ইন",
    logout: "লগ-আউট",
    auditBtn: "ছ’মেটিক অডিট আৰম্ভ কৰক",
    volunteerBtn: "মিছন ২০৩০ স্বেচ্ছাসেৱক হওক",
    heroText: "আপুনিও এই সমস্যাৰ ভুক্তভোগী নেকি? MRI ৰিপৰ্ট ঠিক আছে। তেজৰ পৰীক্ষাও 'স্বাভাৱিক'। সকলো ধৰণৰ চিকিৎসা কৰিও বিফল হৈছে আৰু এই বিষক মনৰ ধাৰণা বুলি কোৱা হৈছে? তেনেহ’লে আৰু চিন্তা নকৰিব। সেই ভাগৰ, মগজুৰ ধুঁৱলী-কুঁৱলী ভাব আৰু শৰীৰৰ যন্ত্ৰণা... এইয়া আপোনাৰ মনৰ ভুল নহয়। এইয়া এক অদৃশ্য জুই যাক কোৱা হয় ",
    heroHighlight: "চেণ্ট্ৰেল চেন্সিটাইজেচন— যি ফাইব্ৰ’মায়েলজিয়াৰ দৰে যন্ত্ৰণাৰ আঁৰত লুকাই থকা এক গোপন কাৰণ।",
    ctaHero: "৩-মিনিটৰ ছ’মেটিক অডিটৰ জৰিয়তে নিজক আৱিষ্কাৰ কৰক",
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
    epidemiologyTitle: "এপিডেমিঅ’লজিকেল আৰু অৰ্থনৈতিক পেৰামিটাৰসমূহ",
    metrics: [
      { n: 'প্ৰাদুৰ্ভাৱৰ গতিশীলতা', d: 'ভাৰতৰ প্ৰাপ্তবয়স্ক জনসংখ্যাৰ প্ৰায় ১৫-২০% (প্ৰায় ২০ কোটি লোক) দীৰ্ঘদিনীয়া বিষত আক্ৰান্ত।' },
      { n: 'জনসংখ্যাত্ৰিক বৈষম্য', d: 'ফাইব্ৰ’মায়েলজিয়াত ৯০% মহিলা আৰু ১০% পুৰুষ আক্ৰান্ত হয়।' },
      { n: 'আক্্ৰান্ত হোৱাৰ বয়স', d: '২০-৫০ বছৰ বয়সৰ লোকসকল ইয়াৰ দ্বাৰা বেছিকৈ প্ৰভাৱিত হয়।' },
      { n: 'কৰ্মক্ষমতা হ্ৰাস', d: 'মগজুৰ অৱশতাৰ বাবে ৰোগীৰ কাম কৰাৰ ক্ষমতা ২০-৫০% পৰ্যন্ত হ্ৰাস পায়।' },
      { n: 'প্ৰেজেন্টেয়িজমৰ প্ৰভাৱ', d: 'কামৰ ঠাইত শাৰীৰিকভাৱে উপস্থিত থাকিও যন্ত্ৰণা ভোগ কৰাৰ ফলত হোৱা ক্ষতি অনুপস্থিতিতকৈ ২-৪ গুণ বেছি।' }
    ],
    mission: "মিছন ২০৩০",
    missionSub: "ভাৰতৰ নিউৰ’-ৰেচিলিয়েঞ্চ গঠন"
  }
};

export default function HomeScreen({ onStart, onLoginSuccess, lang, setLang }) {
  const t = translations[lang] || translations.en;
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState('HOME');
  const [user, setUser] = useState(null); 
  
  // Modals
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [volunteerModalVisible, setVolunteerModalVisible] = useState(false);
  
  // Auth Tab Selection ('otp', 'email', 'google')
  const [authTab, setAuthTab] = useState('email');

  // Email / Password States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // Phone OTP States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);

  // Volunteer Form States
  const [vName, setVName] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vCity, setVCity] = useState('');

  // --- SETUP RECAPTCHA VERIFIER FOR WEB ---
  useEffect(() => {
    if (loginModalVisible && authTab === 'otp' && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: (response) => {},
          'expired-callback': () => {}
        });
      } catch (e) {
        console.log("Recaptcha initialization error:", e);
      }
    }
  }, [loginModalVisible, authTab]);

  // --- EMAIL / PASSWORD AUTH ---
  // --- EMAIL / PASSWORD AUTH ---
  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      if (isSignUpMode) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCred.user);
        Alert.alert("Success", "Account created successfully!");
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCred.user);
        Alert.alert("Success", "Logged in successfully!");
      }
      setLoginModalVisible(false);
      setEmail('');
      setPassword('');
      
      // TRIGGER DESTINATION SCREEN NAVIGATION
      if (onLoginSuccess) {
        onLoginSuccess();
      } else if (onStart) {
        onStart(); 
      }
    } catch (error) {
      Alert.alert("Authentication Error", error.message);
    }
  };

  // --- GOOGLE SIGN-IN ---
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      Alert.alert("Success", "Logged in with Gmail successfully!");
      setLoginModalVisible(false);
      
      // TRIGGER DESTINATION SCREEN NAVIGATION
      if (onLoginSuccess) {
        onLoginSuccess();
      } else if (onStart) {
        onStart();
      }
    } catch (error) {
      Alert.alert("Google Sign-In Error", error.message);
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
      const result = await confirmResult.confirm(otpCode);
      setUser(result.user);
      Alert.alert("Success", "Phone verified and logged in successfully!");
      setLoginModalVisible(false);
      setPhoneNumber('');
      setOtpCode('');
      setConfirmResult(null);
      
      // TRIGGER DESTINATION SCREEN NAVIGATION
      if (onLoginSuccess) {
        onLoginSuccess();
      } else if (onStart) {
        onStart();
      }
    } catch (error) {
      Alert.alert("Verification Failed", error.message);
    }
  };

  // --- HANDLE LOGOUT ---
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Alert.alert("Logged Out", "You have been logged out.");
      switchPage('HOME'); 
    } catch (error) {
      console.log(error);
    }
  };
  // --- HANDLE VOLUNTEER REGISTRATION ---
  const handleVolunteerSubmit = async () => {
    if (!vName || !vPhone || !vCity) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    try {
      await setDoc(doc(db, "volunteers", vPhone), { name: vName, phone: vPhone, city: vCity, date: new Date() });
      Alert.alert("Welcome to Mission 2030!", "Thank you for registering as a volunteer.");
      setVolunteerModalVisible(false);
      setVName(''); setVPhone(''); setVCity('');
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

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
            {/* HERO SECTION - ONLY AUDIT BUTTON NOW */}
            <View style={styles.hero}>
              <Text style={styles.hook}>
                {t.heroText}
                <Text style={{color: MATTE_GOLD, fontWeight: '900'}}>{t.heroHighlight}</Text>
              </Text>
              
              <View style={styles.heroActions}>
                <TouchableOpacity style={styles.heroCta} onPress={onStart}>
                  <Text style={styles.heroCtaText}>{t.auditBtn}</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.dnaSubText}>{t.ctaSub}</Text>
            </View>

            {/* VECTORS GRID */}
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

            {/* EPIDEMIOLOGY METRICS SECTION */}
            <View style={[styles.gridSection, {marginTop: 25}]}>
              <Text style={styles.sectionLabel}>{t.epidemiologyTitle}</Text>
              <View style={styles.metricsContainer}>
                {t.metrics.map((m, i) => (
                  <View key={i} style={styles.metricCard}>
                    <Text style={styles.metricName}>{m.n}</Text>
                    <Text style={styles.metricDesc}>{m.d}</Text>
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
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setLang(lang === 'en' ? 'as' : 'en')} style={styles.topBtn}>
          <Text style={styles.topBtnText}>{lang === 'en' ? 'অসমীয়া' : 'ENGLISH'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={user ? handleLogout : () => setLoginModalVisible(true)} 
          style={[styles.topBtn, {backgroundColor: DEEP_BLUE}]}
        >
          <Text style={[styles.topBtnText, {color: MATTE_GOLD}]}>{user ? t.logout : t.login}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.headerLogoImage} resizeMode="contain" />
          <Text style={styles.logo}>{t.brand}</Text>
          <Text style={styles.tagline}>{t.tagline}</Text>
        </View>

        <View style={styles.navBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activePage !== 'HOME' && (
              <TouchableOpacity style={[styles.navItem, {backgroundColor: MATTE_GOLD}]} onPress={() => switchPage('HOME')}>
                <Text style={[styles.navText, {color: DEEP_BLUE}]}>{t.back}</Text>
              </TouchableOpacity>
            )}
            {t.nav.map((item, index) => (
              <TouchableOpacity key={index} style={styles.navItem} onPress={() => switchPage(["About", "TISRI", "SIBS", "Workshops", "Career", "Reviews"][index])}>
                <Text style={[styles.navText, activePage === ["About", "TISRI", "SIBS", "Workshops", "Career", "Reviews"][index] && {color: MATTE_GOLD}]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.mainContainer}>
          {renderMainContent()}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>{t.brand} </Text>
          <TouchableOpacity style={styles.missionBox} onPress={() => setVolunteerModalVisible(true)}>
            <Text style={styles.footerMission}>{t.mission}</Text>
            <Text style={styles.missionSub}>{t.missionSub}</Text>
            <Text style={[styles.missionSub, {color: MATTE_GOLD, fontWeight: 'bold', marginTop: 10}]}>{t.volunteerBtn} →</Text>
          </TouchableOpacity>
          <Text style={styles.copyrightText}>POWERED BY FASCIAMAX | SHATKONA CENTER | SHATKONALIFE © 2026 SOMATIC BHARAT.</Text>
        </View>
      </ScrollView>

      {/* --- MULTI-AUTH LOGIN / SIGNUP MODAL --- */}
      <Modal visible={loginModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Authentication Hub</Text>
            
            <View style={styles.authTabRow}>
              <TouchableOpacity 
                style={[styles.authTabBtn, authTab === 'email' && styles.authTabBtnActive]} 
                onPress={() => setAuthTab('email')}
              >
                <Text style={[styles.authTabText, authTab === 'email' && styles.authTabTextActive]}>Email / PW</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.authTabBtn, authTab === 'otp' && styles.authTabBtnActive]} 
                onPress={() => setAuthTab('otp')}
              >
                <Text style={[styles.authTabText, authTab === 'otp' && styles.authTabTextActive]}>Phone OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.authTabBtn, authTab === 'google' && styles.authTabBtnActive]} 
                onPress={() => { setAuthTab('google'); handleGoogleLogin(); }}
              >
                <Text style={[styles.authTabText, authTab === 'google' && styles.authTabTextActive]}>Gmail</Text>
              </TouchableOpacity>
            </View>

            {authTab === 'email' && (
              <View style={{ width: '100%' }}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Email Address" 
                  placeholderTextColor="#888" 
                  autoCapitalize="none"
                  value={email} 
                  onChangeText={setEmail} 
                />
                <TextInput 
                  style={styles.input} 
                  placeholder="Password" 
                  placeholderTextColor="#888" 
                  secureTextEntry 
                  value={password} 
                  onChangeText={setPassword} 
                />
                <TouchableOpacity style={styles.modalBtn} onPress={handleEmailAuth}>
                  <Text style={styles.modalBtnText}>{isSignUpMode ? "Sign Up" : "Login"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSignUpMode(!isSignUpMode)}>
                  <Text style={styles.switchModeText}>
                    {isSignUpMode ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {authTab === 'otp' && (
              <View style={{ width: '100%', alignItems: 'center' }}>
                {!confirmResult ? (
                  <>
                    <TextInput 
                      style={styles.input} 
                      placeholder="Phone Number (+91...)" 
                      placeholderTextColor="#888" 
                      keyboardType="phone-pad"
                      value={phoneNumber} 
                      onChangeText={setPhoneNumber} 
                    />
                    <View id="recaptcha-container" style={{ marginVertical: 5 }} />
                    <TouchableOpacity style={styles.modalBtn} onPress={handleSendOTP}>
                      <Text style={styles.modalBtnText}>Send OTP</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </View>
            )}

            {authTab === 'google' && (
              <View style={{ width: '100%', alignItems: 'center', paddingVertical: 15 }}>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#DB4437' }]} onPress={handleGoogleLogin}>
                  <Text style={styles.modalBtnText}>Continue with Google</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity onPress={() => { setLoginModalVisible(false); setConfirmResult(null); }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- VOLUNTEER REGISTRATION MODAL --- */}
      <Modal visible={volunteerModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Join Mission 2030</Text>
            <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#888" value={vName} onChangeText={setVName} />
            <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#888" keyboardType="phone-pad" value={vPhone} onChangeText={setVPhone} />
            <TextInput style={styles.input} placeholder="City / State" placeholderTextColor="#888" value={vCity} onChangeText={setVCity} />
            <TouchableOpacity style={styles.modalBtn} onPress={handleVolunteerSubmit}>
              <Text style={styles.modalBtnText}>Register as Volunteer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVolunteerModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BONE_WHITE },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 40, gap: 10, position: 'absolute', width: '100%', zIndex: 1000 },
  topBtn: { backgroundColor: MATTE_GOLD, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  topBtnText: { color: DEEP_BLUE, fontWeight: '900', fontSize: 10 },
  scroll: { flexGrow: 1 },
  header: { backgroundColor: DEEP_BLUE, padding: 25, alignItems: 'center', paddingTop: 60 },
  headerLogoImage: { width: 60, height: 60, marginBottom: 10 },
  logo: { fontSize: 20, fontWeight: '900', color: '#FFF', letterSpacing: 2 },
  tagline: { color: MATTE_GOLD, fontSize: 10, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
  navBar: { backgroundColor: DEEP_BLUE, paddingVertical: 10 },
  navItem: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, marginHorizontal: 5 },
  navText: { color: '#FFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  mainContainer: { minHeight: 400 },
  pageWrapper: { padding: 20, backgroundColor: '#FFF' },
  
  hero: { padding: 30, alignItems: 'center', backgroundColor: '#FFF' },
  hook: { fontSize: 18, textAlign: 'center', lineHeight: 30, color: DEEP_BLUE, marginBottom: 30, fontWeight: '600' },
  
  heroActions: { width: '100%', alignItems: 'center' },
  heroCta: { 
    backgroundColor: DEEP_BLUE, 
    width: '100%', 
    maxWidth: 600, 
    paddingVertical: 22, 
    paddingHorizontal: 25,
    borderRadius: 16, 
    elevation: 12, 
    shadowColor: DEEP_BLUE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignItems: 'center', 
    borderWidth: 2,
    borderColor: MATTE_GOLD 
  },
  heroCtaText: { color: MATTE_GOLD, fontWeight: '900', fontSize: 16, letterSpacing: 1.5, textAlign: 'center' },
  dnaSubText: { fontSize: 11, color: '#666', marginTop: 15, fontWeight: '700', textAlign: 'center' },
  gridSection: { paddingHorizontal: 20 },
  sectionLabel: { fontSize: 10, fontWeight: 'bold', color: MATTE_GOLD, letterSpacing: 2, textAlign: 'center', marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  vectorCard: { width: '48%', backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#F0F0F0', elevation: 3 },
  vName: { fontSize: 11, fontWeight: '900', color: DEEP_BLUE, marginBottom: 4 },
  vDesc: { fontSize: 10, color: '#666', lineHeight: 14 },
  metricsContainer: { marginTop: 5 },
  metricCard: { backgroundColor: '#FFF', padding: 14, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EFEFEF', elevation: 2 },
  metricName: { fontSize: 11, fontWeight: '900', color: DEEP_BLUE, marginBottom: 3 },
  metricDesc: { fontSize: 10, color: '#555', lineHeight: 15 },
  footer: { padding: 40, alignItems: 'center', backgroundColor: '#FFF' },
  footerLogo: { fontSize: 12, fontWeight: '900', color: DEEP_BLUE, marginBottom: 15 },
  missionBox: { backgroundColor: BONE_WHITE, padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20, width: '100%', borderWidth: 1, borderColor: '#DDD' },
  footerMission: { fontSize: 14, fontWeight: '900', color: DEEP_TEAL },
  missionSub: { fontSize: 10, color: '#666', marginTop: 4, textAlign: 'center' },
  copyrightText: { fontSize: 8, color: '#BBB', textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#FFF', padding: 25, borderRadius: 15, alignItems: 'center' },
  modalTitle: { fontSize: 16, fontWeight: '900', color: DEEP_BLUE, marginBottom: 15 },
  authTabRow: { flexDirection: 'row', width: '100%', marginBottom: 15, borderWidth: 1, borderColor: DEEP_BLUE, borderRadius: 8, overflow: 'hidden' },
  authTabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: '#FFF' },
  authTabBtnActive: { backgroundColor: DEEP_BLUE },
  authTabText: { fontSize: 11, fontWeight: 'bold', color: DEEP_BLUE },
  authTabTextActive: { color: MATTE_GOLD },
  input: { width: '100%', borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 12, backgroundColor: BONE_WHITE },
  modalBtn: { backgroundColor: DEEP_BLUE, width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  modalBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  switchModeText: { color: DEEP_BLUE, marginTop: 12, fontSize: 11, fontWeight: 'bold', textAlign: 'center' },
  cancelText: { color: '#888', marginTop: 15, fontSize: 11, fontWeight: 'bold' }
});