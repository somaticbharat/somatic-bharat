import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';

const TRANSLATIONS = {
  en: {
    disclaimer: "Disclaimer: This somatic audit is for educational and self-awareness purposes only and does not constitute medical diagnosis or clinical treatment.",
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
    disclaimer: "স্বীকাৰোক্তি: এই ছ’মেটিক অডিট কেৱল শিক্ষা আৰু আত্ম-সজাগতাৰ বাবে প্ৰস্তুত কৰা হৈছে; ই কোনো চিকিৎসা নিদান বা পেছাদাৰী চিকিৎসা সেৱা নহয়।",
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
  { v: 'MECHANICAL', en: "Have you undergone multiple clinical imaging scans or blood panels, only to be told that your physical structures appear completely normal?", as: "আপুনি একাধিক ক্লিনিকেল ইমেজিং স্কেন বা ৰক্ত পৰীক্ষা কৰাৰ পাছতো আপোনাৰ শাৰীৰিক গঠন সম্পূৰ্ণ স্বাভাৱিক বুলি কোৱা হৈছে নেকি?" },
  { v: 'MECHANICAL', en: "Does your pain regularly shift, migrate, or expand to completely different, unrelated quadrants of your body from day to day?", as: "আপোনাৰ শৰীৰৰ বিষটো দিনে দিনে শৰীৰৰ এটা অংশৰ পৰা সম্পূৰ্ণ বেলেগ আৰু অসংলগ্ন অংশলৈ বিয়পি পৰে বা স্থান সলনি কৰে নেকি?" },
  { v: 'MECHANICAL', en: "Do minor everyday pressures—like light touch, minor bumps, or tight clothing—cause a distinct physical pain or deep bruising sensation?", as: "দৈনন্দিন সৰু-সুৰা হেঁচা—যেনে পাতল স্পৰ্শ, সামান্য আঘাত, বা টান কাপোৰে আপোনাৰ শৰীৰত তীব্ৰ বিষ বা গভীৰ আঘাতৰ অনুভূতি দিয়ে নেকি?" },
  { v: 'MECHANICAL', en: "Do you find yourself anticipating or worrying about how your musculoskeletal system will behave, flare up, or react to basic physical exertion?", as: "সামান্য শাৰীৰিক পৰিশ্ৰম কৰিলে আপোনাৰ পেশী আৰু হাড়ৰ গাঁথনিয়ে কেনেদৰে প্ৰতিক্ৰিয়া কৰিব বা বিষ বাঢ়ি যাব, সেই বিষয়ে আপুনি চিন্তিত হৈ পৰে নেকি?" },
  { v: 'MECHANICAL', en: "Do you experience an exaggerated or sudden physical shock, a full-body jolt, or an intense internal scare from minor unexpected stimuli?", as: "সৰু-সুৰা অপ্ৰত্যাশিত ঘটনা বা শব্দত আপুনি অস্বাভাৱিকভাৱে চক খাই উঠে বা শৰীৰত এক তীব্ৰ ভয়ৰ জোকাৰণি অনুভৱ কৰে নেকি?" },
  { v: 'MECHANICAL', en: "Do you wake up feeling physically heavy, stiff, and unrefreshed, regardless of how many hours of sleep you get?", as: "যিমানেই সময় নোশোৱক কিয়, ৰাতিপুৱা শোৱাৰ পৰা উঠাৰ সময়ত আপোনাৰ শৰীৰটো গধুৰ, জঠৰ আৰু ভাগৰুৱা যেন লাগে নেকি?" },

  // ANCESTRAL VECTOR
  { v: 'ANCESTRAL', en: "Upon waking in the morning, do you experience a generalized, profound stiffness across multiple joints?", as: "ৰাতিপুৱা সাৰ পোৱাৰ সময়ত আপুনি শৰীৰৰ একাধিক গাঁঠিতে এক গভীৰ জঠৰতা অনুভৱ কৰে নেকি?" },
  { v: 'ANCESTRAL', en: "Do you notice 'brain fog,' momentary short-term memory lapses, or difficulty concentrating when your physical pain intensifies?", as: "শৰীৰৰ বিষ বাঢ়ি গ'লে আপুনি মগজুত কুঁৱলীৰ দৰে ভাব (Brain Fog), ক্ষণিকৰ বাবে স্মৃতিশক্তি হ্ৰাস পোৱা, বা মনোযোগ দিয়াত অসুবিধা অনুভৱ কৰে নেকি?" },
  { v: 'ANCESTRAL', en: "Do you suffer from severe abdominal bloating or unpredictable, reactive digestive issues alongside your musculoskeletal pain?", as: "পেশী আৰু হাড়ৰ বিষৰ লগতে আপুনি পেট ফুলা বা অনিশ্চিত হজমৰ সমস্যাত ভোগে নেকি?" },
  { v: 'ANCESTRAL', en: "Do you have specific, hard, or rope-like bands in your muscles that feel highly tender to the touch?", as: "আপোনাৰ পেশীত কোনো টান বা ৰছীৰ দৰে গাঁঠি (Trigger points) আছে নেকি যিবোৰ চুলে তীব্ৰ বিষ হয়?" },
  { v: 'ANCESTRAL', en: "When a highly tender muscle spot is pressed, does the pain consistently travel, radiate, or shoot to a completely different part of your body?", as: "পেশীৰ অতি সংবেদনশীল অংশত হেঁচা দিলে বিষটো শৰীৰৰ আন এটা বেলেগ অংশলৈ বিয়পি বা সৰি পৰা যেন লাগে নেকি?" },
  { v: 'ANCESTRAL', en: "Is your primary physical discomfort localized to specific regional areas rather than being evenly spread across your entire body?", as: "আপোনাৰ শাৰীৰিক অস্বস্তি সমগ্ৰ শৰীৰত সমানভাৱে বিয়পি থকাৰ পৰিৱৰ্তে কেৱল কিছুমান নিৰ্দ্বিষ্ট অংশত আৱদ্ধ হৈ থাকে নেকি?" },

  // NEURAL VECTOR
  { v: 'NEURAL', en: "Do you experience unexplained twitching within a specific muscle group, localized night cramps, or a burning sensation in your extremities?", as: "আপুনি পেশীৰ অকাৰণ স্পন্দন (Twitching), ৰাতি ভৰি কামোৰা, বা হাত-ভৰিত পোৰণি অনুভৱ কৰে নেকি?" },
  { v: 'NEURAL', en: "Do you regularly suffer from chronic tension headaches, neck strain, or severe jaw tightness/clenching alongside your primary muscle pain?", as: "পেশীৰ বিষৰ লগতে আপুনি নিয়মীয়াকৈ মূৰৰ বিষ, ডিঙিৰ চাপ, বা মুখমণ্ডল/হনুৰ জঠৰতাত ভোগে নেকি?" },
  { v: 'NEURAL', en: "Do you experience a severe lack of physical energy and heavy morning lethargy that makes initiating movement feel physically monumental?", as: "আপুনি শাৰীৰিক শক্তিৰ তীব্ৰ অভাৱ আৰু ৰাতিপুৱা এনে এক এলেহুৱা ভাব অনুভৱ কৰে নেকি যাৰ বাবে লৰচৰ কৰাটোও এক ডাঙৰ কাম যেন লাগে?" },
  { v: 'NEURAL', en: "Do you spend more than six to seven hours a day locked in a stagnant, sedentary sitting position at a desk or keyboard?", as: "আপুনি দিনটোত ছয়-সাত ঘণ্টাতকৈ অধিক সময় ডেক্স বা কম্পিউটাৰৰ সন্মুখত একেৰাহে বহাৰ অভ্যাস আছে নেকি?" },
  { v: 'NEURAL', en: "Do you work in a highly repetitive, high-focus profession where it feels like your brain has forgotten how to voluntarily relax specific muscle groups?", as: "আপুনি এনে এক উচ্চ-মনোযোগৰ কাম কৰে নেকি য’ত আপোনাৰ মগজুৱে পেশীবোৰক স্বাভাৱিকভাৱে শিথিল বা ৰিলেক্স কৰিবলৈ পাহৰি যোৱা যেন লাগে?" },
  { v: 'NEURAL', en: "Do you maintain exceptionally rigid, non-negotiable standards for your own performance, constantly feeling deep physical anxiety or muscle locking if things aren't perfect?", as: "আপুনি নিজৰ কাম-কাজত অতি উচ্চ মানদণ্ড বজাই ৰাখিবলৈ বিচাৰে নেকি, যাৰ ফলত কামবোৰ নিখুঁত নহ’লে শৰীৰত চাপ বা পেশী জঠৰ হৈ পৰা অনুভৱ কৰে নেকি?" },

  // ATMOSPHERIC VECTOR
  { v: 'ATMOSPHERIC', en: "Is your daily lifestyle characterized by a lack of dietary protein combined with an absence of structured physical resistance exercise?", as: "আপোনাৰ দৈনিক জীৱনশৈলীত প্ৰ’টিনযুক্ত খাদ্যৰ অভাৱ আৰু সঠিক শাৰীৰিক ব্যায়ামৰ অভাৱ আছে নেকি?" },
  { v: 'ATMOSPHERIC', en: "Do you feel your physical energy being heavily drained by a highly stressful, exhausting, or chaotic daily environment?", as: "অতি মাত্ৰাৰ মানসিক চাপ আৰু বিশৃঙ্খল পৰিৱেশৰ বাবে আপোনাৰ শাৰীৰিক শক্তি সম্পূৰ্ণৰূপে হ্ৰাস পোৱা যেন অনুভৱ কৰে নেকি?" },
  { v: 'ATMOSPHERIC', en: "Do you find yourself in a constant state of hyper-alertness, chronic tension, or self-censorship around dominant individuals in your daily life?", as: "আপোনাৰ দৈনন্দিন জীৱনত প্ৰভাৱশালী ব্যক্তিৰ উপস্থিতিৰ বাবে আপুনি সদায় এক মানসিক চাপ, সজাগ অৱস্থা বা সংকোচত থাকে নেকি?" },
  { v: 'ATMOSPHERIC', en: "Does experiencing a sudden emotional withdrawal or conflict with someone in your daily circle trigger an immediate physical state of panic or body locking?", as: "আপোনাৰ আপোনজনৰ সৈতে হঠাৎ সংঘাত বা সম্পৰ্কৰ দূৰত্বই আপোনাৰ শৰীৰত লগে লগে ভয় বা পেশীৰ জঠৰতাৰ সৃষ্টি কৰে নেকি?" },
  { v: 'ATMOSPHERIC', en: "When dealing with deep internal or physical stress, do you feel an isolating lack of an active, understanding physical or social support system?", as: "গভীৰ মানসিক বা শাৰীৰিক চাপৰ সময়ত আপুনি কোনো বুজাপৰা থকা ব্যক্তি বা সামাজিক সমৰ্থনৰ অভাৱ অনুভৱ কৰে নেকি?" },
  { v: 'ATMOSPHERIC', en: "Do you experience immediate, severe physical pain 'flare-ups' or total-body muscle locking following a sudden emotional shock or intense stress event?", as: "হঠাৎ মানসিক আঘাত বা তীব্ৰ চাপৰ পৰিঘটনাৰ পাছত আপোনাৰ শৰীৰত লগে লগে তীব্ৰ বিষ বা পেশী লক হৈ পৰে নেকি?" },

  // STRUCTURAL VECTOR
  { v: 'STRUCTURAL', en: "Have you habitually learned to physically mask your suffering, holding your body stiffly to look strong and capable on the outside?", as: "বাহিৰত নিজক শক্তিশালী আৰু সক্ষম দেখুৱাবলৈ আপুনি নিজৰ কষ্টবোৰ লুকুৱাই শৰীৰটো টান কৰি ৰখাৰ অভ্যাস কৰি লৈছে নেকি?" },
  { v: 'STRUCTURAL', en: "Do you find yourself deeply absorbing and physically taking on the tension, stress, or somatic burdens of those around you?", as: "আপুনি ওচৰৰ মানুহৰ মানসিক চাপ, চিন্তা বা কষ্টবোৰ নিজৰ শৰীৰত অনুভৱ বা গ্ৰহণ কৰে নেকি?" },
  { v: 'STRUCTURAL', en: "Has your body been stuck in an anxious, defensive 'survival mode' for so long that you find it physically impossible to drop your shoulders or experience true physical relaxation?", as: "আপোনাৰ শৰীৰটো ইমান দিনে এক প্ৰতিৰক্ষামূলক 'চাৰ্ভাইভেল ম'ড'ত আৱদ্ধ হৈ আছে যে কান্ধ দুটা শিথিল কৰা বা প্ৰকৃত ৰিলেক্সেচন পোৱাটো অসম্ভৱ যেন লাগে নেকি?" },
  { v: 'STRUCTURAL', en: "Have you spent significant time navigating relationships where you felt systematically diminished, constantly walking on eggshells to avoid emotional outbursts?", as: "আপুনি এনে কোনো সম্পৰ্ক চম্ভালিছে নেকি য’ত আপুনি নিজকে অৱহেলিত অনুভৱ কৰিছিল আৰু সংঘাত পৰিহাৰ কৰিবলৈ সদায় সাৱধানে চলিবলগীয়া হৈছিল?" },
  { v: 'STRUCTURAL', en: "Is there a distinct history in your family line of chronic widespread physical exhaustion, unresolved deep tension, or severe nervous system fatigue?", as: "আপোনাৰ পৰিয়ালত ক্ৰনিক শাৰীৰিক ভাগৰ, গভীৰ মানসিক চাপ বা স্নায়ুতন্ত্ৰৰ দুৰ্বলতাৰ এক ইতিহাস আছে নেকি?" },
  { v: 'STRUCTURAL', en: "Are you experiencing a profound drop in personal vitality, physical drive, or libido, which frequently tracks alongside chronic, system-wide nervous system exhaustion?", as: "স্নায়ুতন্ত্ৰৰ ক্ৰনিক ভাগৰৰ বাবে আপোনাৰ শাৰীৰিক শক্তি, উৎসাহ বা যৌন আগ্ৰহ তীব্ৰভাৱে হ্ৰাস পাইছে নেকি?" },

  // HUMORAL VECTOR
  { v: 'HUMORAL', en: "Do you struggle with persistent overthinking or racing mental loops, especially at night, that physically prevent your body and muscles from settling down?", as: "আপুনি অবিৰাম অতি-চিন্তা বা অনবৰতে মনলê অহা চিন্তাত ভোগে নেকি, বিশেষকৈ ৰাতিৰ সময়ত, যিয়ে আপোনাৰ শৰীৰ আৰু পেশীবোৰক শান্ত হ'বলৈ নিদিয়ে?" },
  { v: 'HUMORAL', en: "Do you notice your breath becomes shallow, rapid, or completely held in your chest when managing normal, daily intellectual workloads?", as: "দৈনন্দিন কাম-কাজৰ সময়ত আপোনাৰ উশাহ-নিশাহ সৰু, দ্ৰুত বা ছাত আৱদ্ধ হৈ পৰা যেন অনুভৱ কৰে নেকি?" },
  { v: 'HUMORAL', en: "Does your physical recovery time after mild daily tasks or light home errands take days rather than hours?", as: "সামান্য ঘৰুৱা কাম বা দৈনিক পৰিশ্ৰমৰ পাছত সুস্থ হ’বলৈ আপোনাক কেইবা ঘণ্টাৰ পৰিৱৰ্তে কেইবাদিনো লাগে নেকি?" },
  { v: 'HUMORAL', en: "Do your muscles consistently feel cool or numb in certain regions, indicating local circulatory stagnation or high sympathetic constriction?", as: "আপোনাৰ শৰীৰৰ কিছুমান অংশৰ পেশী সদায় ঠাণ্ডা বা অৱশ যেন লাগে নেকি, যিয়ে ৰক্ত সঞ্চালনৰ মন্থৰতা বুজায়?" },
  { v: 'HUMORAL', en: "Do you experience an intensive intolerance to sudden environmental temperature shifts, causing your body to lock down or ache intensely?", as: "বতৰৰ হঠাৎ পৰিৱৰ্তনে আপোনাৰ শৰীৰত তীব্ৰ বিষ বা পেশী লক কৰি পেলায় নেকি?" },
  { v: 'HUMORAL', en: "Do you feel a profound baseline loss of physical restoration, where your body feels as though it is constantly running on empty?", as: "আপোনাৰ শৰীৰটো সদায় শক্তিহীন হৈ থকা যেন লাগে নেকি, যেন কোনো পুনৰুদ্ধাৰেই শৰীৰটোক শক্তি দিব পৰা নাই?" }
];

export default function AuditScreen({ onComplete, onExit, lang = 'en', setLang }) {
  const [current, setCurrent] = useState(0);
  const [history, setHistory] = useState([]); 
  const [scores, setScores] = useState({ 
    MECHANICAL: 0, ANCESTRAL: 0, NEURAL: 0, 
    ATMOSPHERIC: 0, STRUCTURAL: 0, HUMORAL: 0 
  });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

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
      if (onExit) onExit();
    }
  };

  const toggleLanguage = () => {
    if (setLang) {
      setLang(lang === 'en' ? 'as' : 'en');
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
          onPress={toggleLanguage}
        >
          <Text style={styles.langToggleText}>{lang === 'en' ? 'অসমীয়া' : 'ENGLISH'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        {/* DISCLAIMER BANNER */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>{t.disclaimer}</Text>
        </View>

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
  disclaimerBox: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFEEBA',
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginBottom: 15,
    width: '100%'
  },
  disclaimerText: {
    fontSize: 9,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 13,
  },
  backBtn: { position: 'absolute', left: 20, top: 75, flexDirection: 'row', alignItems: 'center' },
  backBtnText: { color: MATTE_GOLD, fontSize: 12, fontWeight: 'bold', marginLeft: 5 },
  progressText: { color: MATTE_GOLD, fontWeight: '900', fontSize: 11, letterSpacing: 1.5, marginTop: 5 },
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