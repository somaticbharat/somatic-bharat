import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const translations = {
  en: {
    header: "Experience the Reset",
    subHeader: "Somatic Literacy & Clinical Mastery Sessions",
    intro: "Our workshops bridge the gap between ancient wisdom and neuro-biological science. Join us to learn how to regulate your nervous system and unlock the 'Jad' (roots) of physical resilience.",
    workshops: [
      {
        tag: "SOCIAL MISSION",
        title: "Somatic Literacy 101: The Young Crowd",
        details: "Designed for students and early-career professionals. Understand how stress \"locks\" into the fascia and learn the 6-vector basics to prevent burnout.",
        loc: "📍 Guwahati / Virtual",
        time: "⏱ 2 Hours",
        color: '#1967D2'
      },
      {
        tag: "CORPORATE WELLNESS",
        title: "The Resilient Workforce (Mission 2047)",
        details: "A deep dive into NF-kB markers and ergonomics. We teach your team how to reset their somatic state during the workday using the Shatkona Protocol.",
        loc: "📍 On-site / Corporate",
        time: "⏱ Half Day",
        color: '#B34700'
      },
      {
        tag: "CLINICAL SPECIALIZATION",
        title: "MSR Masterclass for Professionals",
        details: "For BPT/MPT graduates. Learn the science of Fascia and the specific manual techniques used in our FasciaMax clinical resets.",
        loc: "📍 Sixmile Clinic, Ghy",
        time: "⏱ 2 Days",
        color: '#003366'
      }
    ],
    cta: "Book a Workshop for your Team"
  },
  as: {
    header: "ৰিছেটৰ অভিজ্ঞতা লওক",
    subHeader: "ছ’মেটিক লিটাৰেচি আৰু ক্লিনিকেল মাষ্টাৰী চেচন",
    intro: "আমাৰ কৰ্মশালাসমূহে প্ৰাচীন জ্ঞান আৰু নিউৰ’-বায়’লজিকেল বিজ্ঞানৰ মাজত এক সেতু গঢ়ি তোলে। আপোনাৰ স্নায়ুতন্ত্ৰক নিয়ন্ত্ৰণ কৰিবলৈ আৰু শাৰীৰিক স্থিতিস্থাপকতাৰ 'শিপা' (Jad) চিনি পাবলৈ আমাৰ সৈতে যোগ দিয়ক।",
    workshops: [
      {
        tag: "সামাজিক মিছন",
        title: "ছ’মেটিক লিটাৰেচি ১০১: যুৱ প্ৰজন্ম",
        details: "ছাত্ৰ-ছাত্ৰী আৰু কৰ্মজীৱন আৰম্ভ কৰা সকলৰ বাবে প্ৰস্তুত কৰা হৈছে। মানসিক চাপে কেনেকৈ ফেচিয়াত প্ৰভাৱ পেলায় আৰু বাৰ্ণআউট প্ৰতিৰোধৰ বাবে ৬-ভেক্টৰৰ মৌলিক কথাবোৰ শিকক।",
        loc: "📍 গুৱাহাটী / ভাৰ্চুৱেল",
        time: "⏱ ২ ঘণ্টা",
        color: '#1967D2'
      },
      {
        tag: "কৰ্পোৰেট ৱেলনেছ",
        title: "স্থিতিস্থাপক কৰ্মশক্তি (মিছন ২০৪৭)",
        details: "NF-kB মাৰ্কাৰ আৰু আৰ্গ’নমিক্সৰ গভীৰ অধ্যয়ন। ষটকোণ প্ৰটোকল ব্যৱহাৰ কৰি কৰ্মদিনৰ মাজতে কেনেকৈ ছ’মেটিক স্থিতি ৰিছেট কৰিব পাৰি সেইয়া আমি আপোনাৰ দলক শিকাওঁ।",
        loc: "📍 কৰ্পোৰেট / থলীত",
        time: "⏱ আধা দিন",
        color: '#B34700'
      },
      {
        tag: "ক্লিনিকেল বিশেষজ্ঞতা",
        title: "পেছাদাৰীসকলৰ বাবে MSR মাষ্টাৰক্লাছ",
        details: "BPT/MPT স্নাতকসকলৰ বাবে। ফেচিয়া বিজ্ঞান আৰু আমাৰ FasciaMax ক্লিনিকেল ৰিছেটত ব্যৱহৃত নিৰ্দিষ্ট মেনুৱেল কৌশলসমূহ শিকক।",
        loc: "📍 চিক্সমাইল ক্লিনিক, গুৱাহাটী",
        time: "⏱ ২ দিন",
        color: '#003366'
      }
    ],
    cta: "আপোনাৰ দলৰ বাবে কৰ্মশালা বুক কৰক"
  }
};

export const Workshops = ({ lang }) => {
  const t = translations[lang] || translations.as;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>{t.header}</Text>
      <Text style={styles.subHeader}>{t.subHeader}</Text>
      
      <Text style={styles.intro}>{t.intro}</Text>

      {t.workshops.map((item, index) => (
        <View key={index} style={[styles.workshopCard, { borderLeftColor: item.color }]}>
          <Text style={[styles.typeTag, { color: item.color }]}>{item.tag}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.details}>{item.details}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.info}>{item.loc}</Text>
            <Text style={styles.info}>{item.time}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{t.cta}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#003366' },
  subHeader: { fontSize: 16, color: '#B34700', fontWeight: '600', marginBottom: 10 },
  intro: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 20 },
  
  workshopCard: { 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15, 
    borderLeftWidth: 5, 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  typeTag: { fontSize: 10, fontWeight: 'bold', marginBottom: 5, letterSpacing: 0.5 },
  title: { fontSize: 17, fontWeight: 'bold', color: '#333' },
  details: { fontSize: 13, color: '#555', marginVertical: 8, lineHeight: 19 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  info: { fontSize: 12, color: '#888', fontWeight: '600' },
  
  button: { 
    backgroundColor: '#003366', 
    padding: 18, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10,
    marginBottom: 30
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 }
});