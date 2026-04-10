import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const translations = {
  en: {
    header: "Join the Somatic Movement",
    subHeader: "Building the Future of Bharat's Health Literacy",
    introText: "At Somatic Bharat Foundation, we don't just hire employees; we recruit pioneers. Whether you are a clinician, a researcher, or a technologist, your work here contributes directly to Mission 2047.",
    roles: [
      {
        badge: "Clinical",
        badgeBg: '#F2F2F2',
        badgeColor: '#666',
        title: "Somatic Practitioner (MPT/BPT)",
        desc: "Join the FasciaMax clinical wing. You will be trained in the proprietary Shatkona MSR Protocol to treat chronic pain, Fibromyalgia, and CS.",
        req: "• Specialization in Musculoskeletal/Neuro preferred.",
      },
      {
        badge: "TISRI Research",
        badgeBg: '#E8F0FE',
        badgeColor: '#1967D2',
        title: "Biosomatic Research Fellow",
        desc: "Help us map the 'Jad' (roots) of pain. You will work on social research projects and curate global archives on NF-kB and Epigenetics.",
        req: "• Background in Social Science, Biology, or Data Analytics.",
      },
      {
        badge: "SIBS Academy",
        badgeBg: '#FFF4ED',
        badgeColor: '#B34700',
        title: "Somatic Literacy Educator",
        desc: "Develop and deliver NSDC-aligned courses for the \"young crowd\" and corporate partners. Help us scale somatic education across Bharat.",
        req: "• Experience in teaching, yoga, or wellness coaching.",
      }
    ],
    applyTitle: "Ready to make an impact?",
    applyBody: "Send your CV and a brief note on how you align with our Mission 2047 vision to our recruitment team.",
    cta: "Apply Now"
  },
  as: {
    header: "ছ’মেটিক আন্দোলনত যোগদান কৰক",
    subHeader: "ভাৰতৰ স্বাস্থ্য সাক্ষৰতাৰ ভৱিষ্যত গঢ়ি তোলা",
    introText: "ছ’মেটিক ভাৰত ফাউণ্ডেশ্যনত আমি কেৱল কৰ্মচাৰী নিয়োগ নকৰো; আমি অগ্ৰগামী বিপ্লৱী বিচাৰো। আপুনি এজন চিকিৎসক, গৱেষক বা প্ৰযুক্তিবিদে নহওক কিয়, আপোনাৰ কামে পোনপটীয়াকৈ 'মিছন ২০৪৭'ত অৰিহণা যোগাব।",
    roles: [
      {
        badge: "ক্লিনিকেল",
        badgeBg: '#F2F2F2',
        badgeColor: '#666',
        title: "ছ’মেটিক প্ৰেকটিচনাৰ (MPT/BPT)",
        desc: "FasciaMax ক্লিনিকেল উইঙত যোগদান কৰক। আপোনাক দীৰ্ঘদিনীয়া বিষ আৰু ফাইব্ৰ’মায়েলজিয়াৰ চিকিৎসাৰ বাবে ষটকোণ MSR প্ৰটোকলত প্ৰশিক্ষণ দিয়া হ'ব।",
        req: "• মাস্কুলোস্কেলিটেল/নিউৰ’ বিভাগত বিশেষজ্ঞতা থকাটো অগ্ৰাধিকাৰযোগ্য।",
      },
      {
        badge: "TISRI গৱেষণা",
        badgeBg: '#E8F0FE',
        badgeColor: '#1967D2',
        title: "বায়োছ’মেটিক গৱেষণা ফেল’",
        desc: "বিষৰ 'শিপা' (Jad) চিনাক্ত কৰাত আমাক সহায় কৰক। আপুনি সামাজিক গৱেষণা প্ৰকল্প আৰু এপিজেনেটিক্সৰ গোলকীয় আৰ্কাইভৰ কামত জড়িত হ'ব।",
        req: "• সমাজ বিজ্ঞান, জীৱবিজ্ঞান বা ডাটা এনালিটিক্সৰ জ্ঞান থকাটো প্ৰয়োজনীয়।",
      },
      {
        badge: "SIBS একাডেমী",
        badgeBg: '#FFF4ED',
        badgeColor: '#B34700',
        title: "ছ’মেটিক লিটাৰেচি এডুকেটৰ",
        desc: "যুৱ প্ৰজন্ম আৰু কৰ্পোৰেট অংশীদাৰসকলৰ বাবে NSDC-সংলগ্ন পাঠ্যক্ৰম প্ৰস্তুত কৰক। সমগ্ৰ ভাৰতত ছ’মেটিক শিক্ষা বিস্তাৰ কৰাত সহায় কৰক।",
        req: "• শিক্ষকতা, যোগ বা ৱেলনেছ কোচিংত অভিজ্ঞতা থকাটো প্ৰয়োজনীয়।",
      }
    ],
    applyTitle: "আপুনি পৰিৱৰ্তন আনিবলৈ সাজুনে?",
    applyBody: "আপোনাৰ চিভি (CV) আৰু আমাৰ মিছন ২০৪৭-ৰ সৈতে আপুনি কেনেকৈ সংগতি ৰাখে তাৰ এক চমু বিৱৰণ আমাৰ নিয়োগ দললৈ প্ৰেৰণ কৰক।",
    cta: "এতিয়াই আবেদন কৰক"
  }
};

export const Career = ({ lang }) => {
  const t = translations[lang] || translations.as;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>{t.header}</Text>
      <Text style={styles.subHeader}>{t.subHeader}</Text>
      
      <Text style={styles.introText}>{t.introText}</Text>

      {/* --- RENDER ROLES --- */}
      {t.roles.map((role, index) => (
        <View key={index} style={styles.jobCard}>
          <View style={[styles.badge, { backgroundColor: role.badgeBg }]}>
            <Text style={[styles.badgeText, { color: role.badgeColor }]}>{role.badge}</Text>
          </View>
          <Text style={styles.jobTitle}>{role.title}</Text>
          <Text style={styles.jobDesc}>{role.desc}</Text>
          <Text style={styles.requirement}>{role.req}</Text>
        </View>
      ))}

      {/* --- APPLICATION CTA --- */}
      <View style={styles.applySection}>
        <Text style={styles.applyTitle}>{t.applyTitle}</Text>
        <Text style={styles.applyBody}>{t.applyBody}</Text>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => Linking.openURL('mailto:careers@somaticbharat.org')}
          activeOpacity={0.8}
        >
          <Text style={styles.applyButtonText}>{t.cta}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#003366' },
  subHeader: { fontSize: 16, color: '#B34700', fontWeight: '600', marginBottom: 15 },
  introText: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 25 },
  
  jobCard: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEE',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  badge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 4, 
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  badgeText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  jobDesc: { fontSize: 14, color: '#555', marginVertical: 8, lineHeight: 22 },
  requirement: { fontSize: 12, color: '#888', fontStyle: 'italic' },
  
  applySection: { 
    marginTop: 10, 
    padding: 25, 
    backgroundColor: '#003366', 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  applyTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  applyBody: { fontSize: 13, color: '#D1E3FF', textAlign: 'center', marginBottom: 20, lineHeight: 18 },
  applyButton: { backgroundColor: '#B34700', paddingHorizontal: 35, paddingVertical: 14, borderRadius: 30 },
  applyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});