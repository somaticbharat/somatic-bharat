import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';

const TRANSLATIONS = {
  en: {
    step: "STEP",
    vector: "VECTOR",
    back: "BACK",
    options: [
      { l: 'STRONGLY DISAGREE', v: 0, icon: 'thumb-down', color: '#FF5252' },
      { l: 'DISAGREE', v: 1, icon: 'thumb-down-outline', color: '#FFAB40' },
      { l: 'NEUTRAL', v: 2, icon: 'minus-circle-outline', color: '#9E9E9E' },
      { l: 'AGREE', v: 3, icon: 'thumb-up-outline', color: '#4DB6AC' },
      { l: 'STRONGLY AGREE', v: 5, icon: 'thumb-up', color: '#00FFFF' }
    ]
  },
  as: {
    step: "পদক্ষেপ",
    vector: "ভেক্টৰ",
    back: "পাছলৈ",
    options: [
      { l: 'দৃঢ়ভাৱে একমত নহয়', v: 0, icon: 'thumb-down', color: '#FF5252' },
      { l: 'একমত নহয়', v: 1, icon: 'thumb-down-outline', color: '#FFAB40' },
      { l: 'নিৰপেক্ষ', v: 2, icon: 'minus-circle-outline', color: '#9E9E9E' },
      { l: 'একমত', v: 3, icon: 'thumb-up-outline', color: '#4DB6AC' },
      { l: 'দৃঢ়ভাৱে একমত', v: 5, icon: 'thumb-up', color: '#00FFFF' }
    ]
  }
};

const QUESTIONS = [
  // MECHANICAL VECTOR
  { v: 'MECHANICAL', en: "Do you feel a 'locking' sensation in your joints during routine movement?", as: "আপুনি দৈনন্দিন চলাচলৰ সময়ত গাঁঠিবোৰ 'লক' বা স্থবিৰ হৈ যোৱা যেন অনুভৱ কৰে নেকি?" },
  { v: 'MECHANICAL', en: "Is your pain localized to specific tendons or ligaments rather than broad areas?", as: "আপোনাৰ বিষটো বহল অংশতকৈ নিৰ্দিষ্ট টেণ্ডন বা লিগামেণ্টত বেছিকৈ অনুভূত হয় নেকি?" },
  { v: 'MECHANICAL', en: "Do you experience sharp, needle-like pain when lifting even light objects?", as: "পাতল বস্তু দাঙিলে আপুনি বেজীৰে বিন্ধাৰ দৰে তীব্ৰ বিষ অনুভৱ কৰে নেকি?" },
  { v: 'MECHANICAL', en: "Does your posture feel 'collapsed' or heavy by the end of the day?", as: "দিনটোৰ শেষত আপোনাৰ শৰীৰৰ ভংগীমা দুৰ্বল বা গধুৰ যেন লাগে নেকি?" },
  { v: 'MECHANICAL', en: "Have you noticed a visible loss of range of motion in your neck or hips?", as: "আপোনাৰ ডিঙি বা কঁকালৰ সঞ্চালনৰ ক্ষমতা কমি যোৱা লক্ষ্য কৰিছে নেকি?" },
  { v: 'MECHANICAL', en: "Does physical rest fail to resolve the stiffness you feel in the morning?", as: "শাৰীৰিক জিৰণিৰ পাছতো আপুনি ৰাতিপুৱা অনুভৱ কৰা জঠৰতা আঁতৰি নাযায় নেকি?" },
  
  // ANCESTRAL VECTOR
  { v: 'ANCESTRAL', en: "Do you suffer from health patterns similar to those of your parents or grandparents?", as: "আপুনি আপোনাৰ পিতৃ-মাতৃ বা ককা-আইতাৰ দৰে একে ধৰণৰ স্বাস্থ্যজনিত সমস্যাত ভুগিছে নেকি?" },
  { v: 'ANCESTRAL', en: "Do you experience 'unearned' anxiety—anxiety without a direct current trigger?", as: "আপুনি কোনো প্ৰত্যক্ষ কাৰণ নোহোৱাকৈয়ে এক গভীৰ উৎকণ্ঠা বা চিন্তা অনুভৱ কৰে নেকি?" },
  { v: 'ANCESTRAL', en: "Do you feel a deep-seated 'survivalist' urge even when you are secure?", as: "সুৰক্ষিত থকাৰ পাছতো আপুনি সদায় এক অস্তিত্ব ৰক্ষাৰ মানসিক চাপত থাকে নেকি?" },
  { v: 'ANCESTRAL', en: "Are there recurring 'anniversary' symptoms (getting sick same time every year)?", as: "প্ৰতি বছৰে একে সময়তে আপুনি পুনৰাবৃত্তিমূলক ৰোগৰ লক্ষণত ভোগে নেকি?" },
  { v: 'ANCESTRAL', en: "Do you feel a heavy emotional burden that doesn't seem to belong to your life events?", as: "আপুনি এনে এক আবেগিক বোজা অনুভৱ কৰে নেকি যিটো আপোনাৰ জীৱনৰ পৰিস্থিতিৰ সৈতে জড়িত নহয়?" },
  { v: 'ANCESTRAL', en: "Have you been told you have a 'family temperament' involving high stress?", as: "আপোনাৰ পৰিয়ালত উচ্চ মাত্ৰাৰ মানসিক চাপ থকা বুলি আপোনাক কোৱা হৈছে নেকি?" },
  
  // NEURAL VECTOR
  { v: 'NEURAL', en: "Does your pain 'migrate' or travel from one part of the body to another?", as: "আপোনাৰ বিষটো শৰীৰৰ এটা অংশৰ পৰা আন এটা অংশলৈ বিয়পি পৰে নেকি?" },
  { v: 'NEURAL', en: "Are you hypersensitive to bright lights, loud noises, or strong smells?", as: "আপুনি উজ্জ্বল পোহৰ, তীব্ৰ শব্দ বা উগ্ৰ গোন্ধৰ প্ৰতি অতি সংবেদনশীল নেকি?" },
  { v: 'NEURAL', en: "Do you startle easily or feel constantly 'on edge' (The Beta State)?", as: "আপুনি অতি সহজে উচপ খাই উঠে নেকি বা সদায় এক সজাগ অৱস্থাত থাকে নেকি?" },
  { v: 'NEURAL', en: "Does your skin feel painful or tender to even a very light touch?", as: "পাতল স্পৰ্শ কৰিলেও আপোনাৰ ছালত বিষ বা অস্বস্তি অনুভৱ হয় নেকি?" },
  { v: 'NEURAL', en: "Do you experience 'Brain Fog' or difficulty finding words under mild stress?", as: "মানসিক চাপৰ সময়ত আপুনি কথা পাহৰি যোৱা বা মগজুত এক ধুঁৱলী-কুঁৱলী (Brain Fog) অনুভৱ কৰে নেকি?" },
  { v: 'NEURAL', en: "Is your sleep frequently interrupted by a mind that won't stop racing?", as: "অবিৰাম চিন্তাৰ বাবে আপোনাৰ টোপনিত সঘনাই ব্যাঘাত ঘটে নেকি?"},

  // ATMOSPHERIC VECTOR
  { v: 'ATMOSPHERIC', en: "Does your pain increase significantly with changes in weather or pressure?", as: "বতৰ বা বায়ুমণ্ডলৰ চাপ সলনি হ'লে আপোনাৰ বিষ বৃদ্ধি পায় নেকি?" },
  { v: 'ATMOSPHERIC', en: "Do you feel physically drained after being in crowded or high-EMF environments?", as: "ভিৰ বা বৈদ্যুতিক-চুম্বকীয় ক্ষেত্ৰ (EMF) থকা পৰিৱেশত আপুনি শাৰীৰিকভাৱে ভাগৰুৱা অনুভৱ কৰে নেকি?" },
  { v: 'ATMOSPHERIC', en: "Are you prone to 'sensory overwhelm' in shopping malls or busy offices?", as: "শ্বপিং মল বা ব্যস্ত অফিচত আপুনি ইন্দ্ৰিয়গতভাৱে বিমোৰত পৰে নেকি?" },
  { v: 'ATMOSPHERIC', en: "Do you feel significantly better when you are away from your primary city?", as: "আপুনি নিজৰ চহৰৰ পৰা দূৰত থাকিলে শাৰীৰিকভাৱে যথেষ্ট ভাল অনুভৱ কৰে নেকি?" },
  { v: 'ATMOSPHERIC', en: "Does 'blue light' from screens trigger immediate headaches or eye strain?", as: "স্ক্ৰীণৰ 'ব্লু লাইট'ৰ ফলত আপোনাৰ লগে লগে মূৰৰ বিষ বা চকুৰ পানী ওলায় নেকি?" },
  { v: 'ATMOSPHERIC', en: "Are you highly sensitive to synthetic fragrances or cleaning chemicals?", as: "আপুনি কৃত্ৰিম সুগন্ধি বা চাফ-চিকুণৰ ৰাসায়নিক পদাৰ্থৰ প্ৰতি অতি সংবেদনশীল নেকি?" },

  // STRUCTURAL VECTOR
  { v: 'STRUCTURAL', en: "Do you feel like your body is 'wrapped in tight plastic' or restricted?", as: "আপোনাৰ শৰীৰটো যেন কোনো টান প্লাষ্টিকেৰে মেৰিয়াই ৰখা হৈছে তেনে এক আৱদ্ধ অনুভৱ হয় নেকি?" },
  { v: 'STRUCTURAL', en: "Have you noticed your height decreasing or your shoulders rounding forward?", as: "আপোনাৰ উচ্চতা কমি যোৱা বা কান্ধ দুটা আগলৈ হালি অহা লক্ষ্য কৰিছে নেকি?" },
  { v: 'STRUCTURAL', en: "Do you have 'trigger points' (knots) that feel like hard marbles under the skin?", as: "আপোনাৰ ছালৰ তলত টান মার্বলৰ দৰে পেশীৰ গাঁঠি (Trigger points) অনুভৱ কৰে নেকি?" },
  { v: 'STRUCTURAL', en: "Does your breathing feel shallow, as if your ribcage is 'stiff'?", as: "আপোনাৰ উশাহ-নিশাহ চুটি যেন লাগে নেকি, যেন পাঞ্জৰৰ হাড়বোৰ জঠৰ হৈ পৰিছে?" },
  { v: 'STRUCTURAL', en: "Do you experience 'clicking' or 'popping' in your jaw (TMJ)?", as: "খোৱা বা কথা কোৱাৰ সময়ত আপোনাৰ হনুৰ গাঁঠিত (TMJ) কিবা শব্দ হোৱা অনুভৱ কৰে নেকি?" },
  { v: 'STRUCTURAL', en: "Is there a noticeable difference in the length of your legs or hip levels?", as: "আপোনাৰ ভৰি দুখনৰ দৈৰ্ঘ্য বা কঁকালৰ সমতাৰ মাজত কিবা পাৰ্থক্য দেখা পায় নেকি?" },

  // HUMORAL VECTOR
  { v: 'HUMORAL', en: "Do you experience unexplained puffiness or swelling in your hands or face?", as: "হস্ত বা মুখমণ্ডলত কোনো কাৰণ নোহোৱাকৈয়ে ফুলা ভাব অনুভৱ কৰে নেকি?" },
  { v: 'HUMORAL', en: "Is your digestion inconsistent (bloating/acidity) regardless of what you eat?", as: "যিয়েই নাখাওক কিয়, আপোনাৰ হজম প্ৰক্ৰিয়া সদায় বিসংগতিপূৰ্ণ (গেছ বা এচিডিটি) হয় নেকি?" },
  { v: 'HUMORAL', en: "Do you feel a sense of 'internal heat' or low-grade feverishness?", as: "আপুনি শৰীৰৰ ভিতৰত এক উত্তাপ বা মৃদু জ্বৰ জ্বৰ ভাব অনুভৱ কৰে নেকি?" },
  { v: 'HUMORAL', en: "Do you struggle with skin breakouts or rashes when your stress levels rise?", as: "মানসিক চাপ বাঢ়িলে আপোনাৰ ছালত গুটি বা খজুৱতি ওলায় নেকি?" },
  { v: 'HUMORAL', en: "Is your recovery from a simple cold or flu unusually slow?", as: "সাধাৰণ ঠাণ্ডা বা জ্বৰৰ পৰা সুস্থ হবলৈ আপোনাক অস্বাভাৱিকভাৱে বেছি সময় লাগে নেকি?" },
  { v: 'HUMORAL', en: "Do you feel 'tired but wired'—exhausted but unable to achieve deep sleep?", as: "আপুনি অতিশয় ভাগৰুৱা অনুভৱ কৰিও গভীৰ টোপনি যাবলৈ অক্ষম হয় নেকি?" }
];

export default function AuditScreen({ onComplete, onExit }) {
  const [current, setCurrent] = useState(0);
  const [lang, setLang] = useState('en'); 
  const [history, setHistory] = useState([]); 
  const [scores, setScores] = useState({ 
    MECHANICAL: 0, ANCESTRAL: 0, NEURAL: 0, 
    ATMOSPHERIC: 0, STRUCTURAL: 0, HUMORAL: 0 
  });

  const t = TRANSLATIONS[lang];

  const handleAnswer = (val) => {
    const vector = QUESTIONS[current].v;
    const newScores = { ...scores, [vector]: scores[vector] + val };
    setHistory([...history, val]);

    if (current < QUESTIONS.length - 1) {
      setScores(newScores);
      setCurrent(current + 1);
    } else {
      onComplete(newScores); 
    }
  };

  const handleBack = () => {
    if (current > 0) {
      const prevIndex = current - 1;
      const vectorToReduce = QUESTIONS[prevIndex].v;
      const valueToSubtract = history[history.length - 1];

      setScores({
        ...scores,
        [vectorToReduce]: scores[vectorToReduce] - valueToSubtract
      });

      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrent(prevIndex);
    } else {
      // Exit to home if on question 1
      if(onExit) onExit();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER CONTROLS */}
      <View style={styles.topNav}>
        <TouchableOpacity 
          style={styles.homeBtn} 
          onPress={() => onExit && onExit()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons name="home" size={24} color={DEEP_BLUE} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.langToggle} 
          onPress={() => setLang(lang === 'en' ? 'as' : 'en')}
        >
          <Text style={styles.langToggleText}>{lang === 'en' ? 'অসমীয়া' : 'ENGLISH'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <MaterialCommunityIcons name="arrow-left" size={20} color={MATTE_GOLD} />
          <Text style={styles.backBtnText}>{t.back}</Text>
        </TouchableOpacity>

        <Text style={styles.progressText}>{t.vector}: {QUESTIONS[current].v}</Text>
        <Text style={styles.stepText}>{t.step} {current + 1} / 36</Text>
        <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((current + 1) / 36) * 100}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.qBox}>
          <Text style={styles.qText}>{lang === 'en' ? QUESTIONS[current].en : QUESTIONS[current].as}</Text>
          <View style={styles.options}>
            {t.options.map((opt) => (
              <TouchableOpacity 
                key={opt.l} 
                style={[styles.optBtn, { borderLeftColor: opt.color, borderLeftWidth: 4 }]} 
                onPress={() => handleAnswer(opt.v)}
              >
                <View style={styles.btnContent}>
                  <MaterialCommunityIcons name={opt.icon} size={24} color={opt.color} />
                  <Text style={[styles.optLabel, { color: DEEP_BLUE }]}>{opt.l}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8F4' },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, height: 60 },
  homeBtn: { backgroundColor: '#FFF', padding: 8, borderRadius: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2 },
  langToggle: { backgroundColor: MATTE_GOLD, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
  langToggleText: { color: DEEP_BLUE, fontWeight: '900', fontSize: 10 },
  header: { padding: 20, borderBottomWidth: 1, borderColor: '#EEE', alignItems: 'center' },
  backBtn: { position: 'absolute', left: 20, top: 20, flexDirection: 'row', alignItems: 'center' },
  backBtnText: { color: MATTE_GOLD, fontSize: 12, fontWeight: 'bold', marginLeft: 5 },
  progressText: { color: MATTE_GOLD, fontWeight: '900', fontSize: 11, letterSpacing: 1.5 },
  stepText: { color: '#999', fontSize: 10, marginTop: 4, fontWeight: '600' },
  progressBar: { height: 4, width: '100%', backgroundColor: '#EEE', marginTop: 15, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#004D40' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  qBox: { padding: 30 },
  qText: { fontSize: 20, fontWeight: '800', color: DEEP_BLUE, marginBottom: 40, textAlign: 'center', lineHeight: 28 },
  options: { width: '100%' },
  optBtn: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0' },
  btnContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
  optLabel: { fontWeight: '900', fontSize: 12, marginLeft: 15, letterSpacing: 1 }
});