import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';
const BG_CREAM = '#F9F8F4';

// --- TRANSLATION DICTIONARY ---
const translations = {
  en: {
    brand: "SOMATIC BHARAT",
    title: "Save Your Audit Results",
    subtitle: "Secure your vector profile and unlock your personalized recovery pathway.",
    googleBtn: "Continue with Google",
    emailBtn: "Continue with Email & Password",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password (min 6 characters)",
    signUpBtn: "Create Account & View Results",
    loginBtn: "Log In",
    switchToLogin: "Already have an account? Log In",
    switchToSignUp: "Need an account? Sign Up",
    backMethod: "← Choose another sign-in method",
    loaderText: "Processing securely...",
    defaultError: "Please enter both email and password.",
    firestoreError: "Failed to save audit results. Please try again."
  },
  as: {
    brand: "ছ’মেটিক ভাৰত",
    title: "আপোনাৰ অডিটৰ ফলাফলসমূহ সংৰক্ষণ কৰক",
    subtitle: "আপোনাৰ ভেক্তৰ প্ৰফাইল সুৰক্ষিত কৰক আৰু আপোনাৰ নিজা পুনৰুদ্ধাৰৰ পথ উন্মুক্ত কৰক।",
    googleBtn: "গুগলৰ জৰিয়তে আগবাঢ়ক",
    emailBtn: "ইমেইল আৰু পাছৱৰ্ডৰ জৰিয়তে আগবাঢ়ক",
    emailPlaceholder: "ইমেইল ঠিকনা",
    passwordPlaceholder: "পাছৱৰ্ড (নূন্যতম ৬ টা আখৰ)",
    signUpBtn: "একাউণ্ট সৃষ্টি কৰক আৰু ফলাফল চাওক",
    loginBtn: "লগ ইন কৰক",
    switchToLogin: "ইতিমধ্যে একাউণ্ট আছে নেকি? লগ ইন কৰক",
    switchToSignUp: "একাউণ্ট প্ৰয়োজন নেকি? ছাইন আপ কৰক",
    backMethod: "← আন এটা ছাইন-ইন পদ্ধতি বাছক",
    loaderText: "সুৰক্ষিতভাৱে প্ৰক্ৰিয়া কৰা হৈছে...",
    defaultError: "অনুগ্ৰহ কৰি ইমেইল আৰু পাছৱৰ্ড দুয়োটাই দিয়ক।",
    firestoreError: "অডিট ফলাফল সংৰক্ষণ কৰাত ব্যৰ্থ হৈছে। পুনৰ চেষ্টা কৰক।"
  }
};

export default function AuthScreen({ pendingScores, lang = 'en', onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('select'); // 'select', 'email'
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Select translation dictionary based on lang prop (defaults to 'en')
  const t = translations[lang] || translations.en;

  // 1. Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await saveUserDataAndFinish(result.user.uid);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  // 2. Email / Password Auth
  const handleEmailAuth = async () => {
    if (!email || !password) {
      setErrorMessage(t.defaultError);
      return;
    }
    try {
      setLoading(true);
      setErrorMessage('');
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      await saveUserDataAndFinish(userCredential.user.uid);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  // 3. Save to Firestore & Proceed
  const saveUserDataAndFinish = async (uid) => {
    try {
      await addDoc(collection(db, "audit_submissions"), {
        userId: uid,
        scores: pendingScores,
        completedAt: serverTimestamp(),
        language: lang,
        platform: 'web'
      });
      onAuthSuccess(pendingScores, uid);
    } catch (e) {
      console.error("Firestore Error:", e);
      setErrorMessage(t.firestoreError);
      setLoading(false);
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <Text style={styles.brandTitle}>{t.brand}</Text>
          <View style={styles.goldDivider} />
        </View>

        <Text style={styles.modalTitle}>{t.title}</Text>
        <Text style={styles.modalSubtitle}>{t.subtitle}</Text>

        {errorMessage ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={MATTE_GOLD} />
            <Text style={styles.loaderText}>{t.loaderText}</Text>
          </View>
        ) : (
          <>
            {authMode === 'select' && (
              <View style={styles.btnGroup}>
                <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
                  <MaterialCommunityIcons name="google" size={20} color="#DB4437" />
                  <Text style={styles.googleBtnText}>{t.googleBtn}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.emailBtn} onPress={() => setAuthMode('email')}>
                  <MaterialCommunityIcons name="email-outline" size={20} color={DEEP_BLUE} />
                  <Text style={styles.emailBtnText}>{t.emailBtn}</Text>
                </TouchableOpacity>
              </View>
            )}

            {authMode === 'email' && (
              <View style={styles.formGroup}>
                <TextInput 
                  placeholder={t.emailPlaceholder} 
                  placeholderTextColor="#999"
                  value={email} 
                  onChangeText={setEmail} 
                  style={styles.input} 
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <TextInput 
                  placeholder={t.passwordPlaceholder} 
                  placeholderTextColor="#999"
                  value={password} 
                  onChangeText={setPassword} 
                  secureTextEntry 
                  style={styles.input} 
                />
                
                <TouchableOpacity style={styles.submitBtn} onPress={handleEmailAuth}>
                  <Text style={styles.submitBtnText}>{isSignUp ? t.signUpBtn : t.loginBtn}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={{ marginTop: 15 }}>
                  <Text style={styles.switchText}>
                    {isSignUp ? t.switchToLogin : t.switchToSignUp}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setAuthMode('select')} style={styles.backLinkContainer}>
                  <Text style={styles.backText}>{t.backMethod}</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { 
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: 'rgba(0,33,71,0.75)', 
    justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    padding: 20
  },
  modalContainer: { 
    width: '100%', maxWidth: 420, 
    backgroundColor: BG_CREAM, 
    borderRadius: 16, padding: 30, 
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, 
    elevation: 8,
    borderWidth: 1, borderColor: '#E6DFD5'
  },
  brandHeader: { alignItems: 'center', marginBottom: 20 },
  brandTitle: { fontSize: 12, fontWeight: '900', color: MATTE_GOLD, letterSpacing: 3 },
  goldDivider: { width: 40, height: 2, backgroundColor: MATTE_GOLD, marginTop: 6 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: DEEP_BLUE, textAlign: 'center', marginBottom: 8 },
  modalSubtitle: { fontSize: 13, color: '#555', textAlign: 'center', marginBottom: 25, lineHeight: 18 },
  errorBox: { backgroundColor: '#FFEBEE', padding: 10, borderRadius: 8, marginBottom: 15 },
  errorText: { color: '#C62828', fontSize: 12, textAlign: 'center', fontWeight: '600' },
  loaderContainer: { paddingVertical: 40, alignItems: 'center' },
  loaderText: { color: DEEP_BLUE, marginTop: 12, fontSize: 13, fontWeight: '600' },
  btnGroup: { width: '100%' },
  googleBtn: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', 
    padding: 14, borderRadius: 10, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2
  },
  googleBtnText: { fontWeight: '700', color: '#333', marginLeft: 12, fontSize: 14 },
  emailBtn: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
    backgroundColor: '#FFF', borderWidth: 1, borderColor: DEEP_BLUE, 
    padding: 14, borderRadius: 10 
  },
  emailBtnText: { fontWeight: '700', color: DEEP_BLUE, marginLeft: 12, fontSize: 14 },
  formGroup: { width: '100%' },
  input: { 
    borderWidth: 1, borderColor: '#CCC', padding: 14, borderRadius: 8, 
    marginBottom: 14, fontSize: 14, backgroundColor: '#FFF', color: DEEP_BLUE 
  },
  submitBtn: { backgroundColor: DEEP_BLUE, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  submitBtnText: { color: '#FFF', fontWeight: '800', fontSize: 14, letterSpacing: 0.5 },
  switchText: { color: MATTE_GOLD, textAlign: 'center', fontWeight: '700', fontSize: 13 },
  backLinkContainer: { marginTop: 20, alignItems: 'center' },
  backText: { color: '#666', fontSize: 12, fontWeight: '600' }
});