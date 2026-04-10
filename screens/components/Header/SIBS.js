import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const translations = {
  en: {
    header: "SIBS Academy",
    subHeader: "Somatic Institute of Biosomatics",
    nsdcTitle: "NSDC ALIGNMENT ROADMAP",
    nsdcStatus: "Status: Curriculum Mapping (NSQF Level 4-6)",
    phases: [
      {
        title: "Phase 1: NSQF Mapping",
        detail: "Aligning the Shatkona MSR Protocol with the National Skills Qualification Framework for 'Somatic Health Assistants' and 'Wellness Mentors'."
      },
      {
        title: "Phase 2: QP (Qualification Pack) Development",
        detail: "Creating unique occupational standards for Biosomatics to be recognized under the Healthcare Sector Skill Council (HSSC)."
      },
      {
        title: "Phase 3: Smart Portal Registration",
        detail: "Establishing SIBS as an Accredited Training Provider to offer Government-recognized certification."
      }
    ],
    upcomingTitle: "Upcoming Vocational Courses",
    courses: [
      {
        name: "Somatic Literacy Educator",
        desc: "Targeting the 'Young Crowd' & Teachers to build national health resilience by 2047."
      },
      {
        name: "Certified MSR Technician",
        desc: "Vocational training for BPT/MPT graduates in the Shatkona Neuro-Biological Reset."
      }
    ],
    mission: "\"Creating a skilled, pain-free workforce for a Developed Bharat by 2047.\""
  },
  as: {
    header: "SIBS একাডেমী",
    subHeader: "ছ’মেটিক ইনষ্টিটিউট অফ বায়োছ’মেটিক্স",
    nsdcTitle: "NSDC এলাইনমেণ্ট ৰোডমেপ",
    nsdcStatus: "স্থিতি: পাঠ্যক্ৰম মেপিং (NSQF স্তৰ ৪-৬)",
    phases: [
      {
        title: "পৰ্যায় ১: NSQF মেপিং",
        detail: "'ছ’মেটিক হেলথ এছিষ্টেণ্ট' আৰু 'ৱেলনেছ মেণ্টৰ'ৰ বাবে ৰাষ্ট্ৰীয় দক্ষতা অৰ্হতা ফ্ৰেমৱৰ্কৰ সৈতে ষটকোণ MSR প্ৰটোকলৰ সংগতি।"
      },
      {
        title: "পৰ্যায় ২: QP (অৰ্হতা পেক) বিকাশ",
        detail: "হেল্থকেয়াৰ চেক্টৰ স্কিল কাউন্সিলৰ (HSSC) অধীনত স্বীকৃতি লাভৰ বাবে বায়োছ’মেটিক্সৰ একক বৃত্তিমূলক মানদণ্ড প্ৰস্তুত কৰা।"
      },
      {
        title: "পৰ্যায় ৩: স্মাৰ্ট পৰ্টেল পঞ্জীয়ন",
        detail: "চৰকাৰী স্বীকৃতিপ্ৰাপ্ত প্ৰমাণপত্ৰ প্ৰদান কৰাৰ বাবে SIBS-ক এক স্বীকৃত প্ৰশিক্ষণ প্ৰদানকাৰী হিচাপে প্ৰতিষ্ঠা কৰা।"
      }
    ],
    upcomingTitle: "আগন্তুক বৃত্তিমূলক পাঠ্যক্ৰম",
    courses: [
      {
        name: "ছ’মেটিক লিটাৰেচি এডুকেটৰ",
        desc: "২০৪৭ চনৰ ভিতৰত ৰাষ্ট্ৰীয় স্বাস্থ্য সজাগতা গঢ়ি তোলাৰ বাবে যুৱ প্ৰজন্ম আৰু শিক্ষকসকলক লক্ষ্য কৰি লোৱা হৈছে।"
      },
      {
        name: "চাৰ্টিফাইড MSR টেকনিচিয়ান",
        desc: "ষটকোণ নিউৰ’-বায়’লজিকেল ৰিছেটত BPT/MPT স্নাতকসকলৰ বাবে বৃত্তিমূলক প্ৰশিক্ষণ।"
      }
    ],
    mission: "\"২০৪৭ চনৰ ভিতৰত এখন উন্নত ভাৰতৰ বাবে দক্ষ আৰু বিষমুক্ত কৰ্মশক্তি সৃষ্টি কৰা।\""
  }
};

export const SIBS = ({ lang }) => {
  const t = translations[lang] || translations.as;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>{t.header}</Text>
      <Text style={styles.subHeader}>{t.subHeader}</Text>
      
      {/* --- THE NSDC STRATEGY BOX --- */}
      <View style={styles.nsdcBox}>
        <Text style={styles.nsdcTitle}>{t.nsdcTitle}</Text>
        <Text style={styles.nsdcStatus}>{t.nsdcStatus}</Text>
        
        {t.phases.map((phase, index) => (
          <View key={index} style={styles.step}>
            <Text style={styles.stepTitle}>{phase.title}</Text>
            <Text style={styles.stepDetail}>{phase.detail}</Text>
          </View>
        ))}
      </View>

      {/* --- Future Course Catalog --- */}
      <View style={styles.planSection}>
        <Text style={styles.sectionTitle}>{t.upcomingTitle}</Text>
        {t.courses.map((course, index) => (
          <View key={index} style={styles.courseCard}>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseDesc}>{course.desc}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.missionText}>{t.mission}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#003366' },
  subHeader: { fontSize: 16, color: '#B34700', fontWeight: '600', marginBottom: 15 },
  
  nsdcBox: { 
    backgroundColor: '#F0F7FF', 
    padding: 15, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#D1E3FF',
    marginBottom: 25 
  },
  nsdcTitle: { fontSize: 14, fontWeight: 'bold', color: '#1967D2', letterSpacing: 1 },
  nsdcStatus: { fontSize: 12, color: '#555', marginBottom: 15, fontStyle: 'italic' },
  
  step: { marginBottom: 12, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: '#1967D2' },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  stepDetail: { fontSize: 12, color: '#666', lineHeight: 20 },

  planSection: { marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  courseCard: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#EEE' },
  courseName: { fontSize: 15, fontWeight: 'bold', color: '#B34700' },
  courseDesc: { fontSize: 13, color: '#777', marginTop: 4, lineHeight: 18 },
  
  missionText: { textAlign: 'center', fontSize: 12, color: '#999', marginTop: 30, fontStyle: 'italic', paddingBottom: 20 }
});