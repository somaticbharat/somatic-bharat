import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const translations = {
  en: {
    header: "Stories of Poritran",
    subHeader: "Real outcomes from the Shatkona MSR Protocol",
    tags: {
      recovery: "Fibromyalgia Recovery",
      wellness: "Corporate Wellness",
      edu: "Professional Education"
    },
    disclaimer: "*Results may vary based on individual DNA Audit profiles and protocol adherence."
  },
  as: {
    header: "পৰিত্ৰাণৰ কাহিনী",
    subHeader: "ষটকোণ MSR প্ৰটোকলৰ প্ৰকৃত ফলাফল",
    tags: {
      recovery: "ফাইব্ৰ’মায়েলজিয়াৰ পৰা আৰোগ্য",
      wellness: "কৰ্পোৰেট ৱেলনেছ",
      edu: "পেছাদাৰী শিক্ষা"
    },
    disclaimer: "*ব্যক্তিগত DNA অডিট প্ৰফাইল আৰু প্ৰটোকল মানি চলাৰ ওপৰত ভিত্তি কৰি ফলাফল ভিন্ন হ'ব পাৰে।"
  }
};

export const Testimonials = ({ lang }) => {
  const t = translations[lang] || translations.as;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>{t.header}</Text>
      <Text style={styles.subHeader}>{t.subHeader}</Text>
      
      {/* --- PERSONA 1 --- */}
      <View style={styles.testimonialCard}>
        <Text style={styles.quote}>
          "I lived with Fibromyalgia for 7 years. Every doctor told me it was 'Monor Dharona' (imaginary). 
          The DNA Audit at FasciaMax was the first time someone mapped my pain to my past stress 
          and my fascia. I feel like I've been given a second life."
        </Text>
        <View style={styles.footer}>
          <Text style={styles.author}>— Ananya B., Guwahati</Text>
          <Text style={styles.tag}>{t.tags.recovery}</Text>
        </View>
      </View>

      {/* --- PERSONA 2 --- */}
      <View style={[styles.testimonialCard, { borderLeftColor: '#B34700' }]}>
        <Text style={styles.quote}>
          "As an IT professional, burnout and back pain were my daily reality. The Somatic 
          Literacy workshop taught me how my 'Environmental Vector' was locking my nervous 
          system. The MSR reset was the 'Control-Alt-Delete' my body needed."
        </Text>
        <View style={styles.footer}>
          <Text style={styles.author}>— Rahul S., Software Engineer</Text>
          <Text style={styles.tag}>{t.tags.wellness}</Text>
        </View>
      </View>

      {/* --- PERSONA 3 --- */}
      <View style={[styles.testimonialCard, { borderLeftColor: '#1967D2' }]}>
        <Text style={styles.quote}>
          "Studying at SIBS Academy opened my eyes to the science of NF-kB and Ancestral Trauma. 
          As a physio, I used to just treat muscles. Now, I treat the whole human system using 
          the 6-Vector model. This is the future of Bharat's healthcare."
        </Text>
        <View style={styles.footer}>
          <Text style={styles.author}>— Dr. P. Gogoi (MPT), SIBS Alumnus</Text>
          <Text style={styles.tag}>{t.tags.edu}</Text>
        </View>
      </View>

      <Text style={styles.disclaimer}>{t.disclaimer}</Text>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#003366' },
  subHeader: { fontSize: 16, color: '#B34700', fontWeight: '600', marginBottom: 20 },
  
  testimonialCard: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 20, 
    borderLeftWidth: 6, 
    borderLeftColor: '#003366',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }
  },
  quote: { fontSize: 14, color: '#444', fontStyle: 'italic', lineHeight: 22 },
  footer: { marginTop: 15, borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10 },
  author: { fontSize: 13, fontWeight: 'bold', color: '#333' },
  tag: { fontSize: 11, color: '#B34700', fontWeight: '700', marginTop: 4, textTransform: 'uppercase' },
  
  disclaimer: { textAlign: 'center', fontSize: 10, color: '#999', marginTop: 10, paddingHorizontal: 20, lineHeight: 16 }
});