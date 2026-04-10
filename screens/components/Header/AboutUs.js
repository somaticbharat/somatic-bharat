import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const translations = {
  // Swapped the order so 'as' is the primary focus
  as: {
    visionary: "প্ৰতিষ্ঠাপক",
    founderName: "মনাস প্ৰতিম দাস (BPT, LLB, RYT 500)",
    founderBody: "১২ বছৰৰো অধিক ক্লিনিকেল অভিজ্ঞতাৰ সৈতে, আমাৰ প্ৰতিষ্ঠাপকে ফিজিঅ’থেৰাপী, আইনী ওকালতি আৰু প্ৰাচীন ছ’মেটিক জ্ঞানৰ মাজত এক যোগসূত্ৰ স্থাপন কৰিছে। তেখেতৰ যাত্ৰাই 'Uncut' সংযোগ আৱিষ্কাৰ কৰিছিল—য’ত সমাধান নোহোৱা অৱচেতন মনেই শাৰীৰিক যন্ত্ৰণা হিচাপে প্ৰকাশ পায়।",
    shatkonaTitle: "ষটকোণ ৬-ভেক্টৰ মডেল",
    shatkonaDesc: "'DNA অডিট'ৰ বাবে আমাৰ স্বকীয় ডায়েগনষ্টিক ফ্ৰেমৱৰ্ক। আমি ছয়টা গুৰুত্বপূৰ্ণ মাত্ৰাৰ জৰিয়তে স্বাস্থ্যৰ মেপিং কৰোঁ:",
    vectors: [
      "১. পূৰ্বপুৰুষীয় (এপিজেনেটিক্স)",
      "২. পাৰিপাৰ্শ্বিক (চাপ)",
      "৩. নিউৰ’-বায়’লজিকেল (NF-kB)",
      "৪. ছ’মেটিক মেম’ৰী (ফেচিয়া)",
      "৫. ক’গনিটিভ (মানসিকতা)",
      "৬. কাৰ্যক্ষম (গতিবিধি)"
    ],
    missionTitle: "মিছন ২০৪৭",
    missionBody: "আমাৰ ফাউণ্ডেশ্যন এখন 'যন্ত্ৰণামুক্ত আৰু স্থিতিস্থাপক ভাৰত' গঢ়ি তুলিবলৈ সংকল্পবদ্ধ। ২০৪৭ চনৰ ভিতৰত আমি প্ৰতিখন বিদ্যালয় আৰু কৰ্প’ৰেট কাৰ্যালয়ত ছ’মেটিক শিক্ষা কাৰ্যকৰী কৰাৰ লক্ষ্য ৰাখিছোঁ, যাতে ৰাষ্ট্ৰীয় কৰ্মশক্তিয়ে কেৱল উৎপাদনশীল হোৱাই নহয়, বৰঞ্চ জৈৱিকভাৱে নিয়ন্ত্রিত আৰু ট্ৰমা-ইনফৰ্মড হয়।",
    foundationTitle: "ছ’মেটিক ভাৰত ফাউণ্ডেশ্যন",
    foundationBody: "এক অলাভজনক সংস্থা যি সামাজিক গৱেষণা (TISRI) আৰু বৃত্তিমূলক শিক্ষা (SIBS Academy) ৰ বাবে উৎসৰ্গিত। আমি বিজ্ঞান, সংস্কৃতি আৰু সহানুভূতিৰ জৰিয়তে 'অসমাধানিত বিষৰ মহামাৰী' দূৰ কৰিবলৈ কাম কৰি আছোঁ।"
  },
  en: {
    visionary: "The Visionary",
    founderName: "Manash Protim Das (BPT, LLB, RYT 500)",
    founderBody: "With over 12 years of clinical experience, our founder has bridged the gap between physical therapy, legal advocacy, and ancient somatic wisdom. His journey led to the discovery of the 'Uncut' connection—where unresolved subconscious patterns manifest as physical pain.",
    shatkonaTitle: "The Shatkona 6-Vector Model",
    shatkonaDesc: "Our proprietary diagnostic framework for the 'DNA Audit.' We map health across six vital dimensions:",
    vectors: [
      "1. Ancestral (Epigenetics)",
      "2. Environmental (Stressors)",
      "3. Neuro-Biological (NF-kB)",
      "4. Somatic Memory (Fascia)",
      "5. Cognitive (Mindset)",
      "6. Functional (Movement)"
    ],
    missionTitle: "Mission 2047",
    missionBody: "Our foundation is committed to building a 'Pain-Free & Resilient Bharat.' By 2047, we aim to have implemented somatic literacy in every school and corporate office, ensuring that the national workforce is not just productive, but biologically regulated and trauma-informed.",
    foundationTitle: "Somatic Bharat Foundation",
    foundationBody: "A non-profit entity dedicated to Social Research (TISRI) and Vocational Education (SIBS Academy). We exist to solve the 'Unresolved Pain Epidemic' through science, culture, and compassion."
  }
};

// Defaulting lang to 'as'
export const AboutUs = ({ lang = 'as' }) => {
  const t = translations[lang] || translations.as;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* --- THE FOUNDER --- */}
      <View style={styles.section}>
        <Text style={styles.header}>{t.visionary}</Text>
        <Text style={styles.subHeader}>{t.founderName}</Text>
        <Text style={styles.body}>{t.founderBody}</Text>
      </View>

      {/* --- THE SHATKONA MODEL --- */}
      <View style={styles.shatkonaBox}>
        <Text style={styles.shatkonaTitle}>{t.shatkonaTitle}</Text>
        <Text style={styles.shatkonaDesc}>{t.shatkonaDesc}</Text>
        
        <View style={styles.vectorGrid}>
          {t.vectors.map((vector, index) => (
            <View key={index} style={styles.vectorItem}>
              <Text style={styles.vectorText}>{vector}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* --- MISSION 2047 --- */}
      <View style={styles.missionSection}>
        <Text style={[styles.header, { color: '#C5A059' }]}>{t.missionTitle}</Text>
        <Text style={[styles.body, { color: '#FFF' }]}>{t.missionBody}</Text>
      </View>

      {/* --- THE SOMATIC BHARAT FOUNDATION --- */}
      <View style={styles.foundationSection}>
        <Text style={styles.header}>{t.foundationTitle}</Text>
        <Text style={styles.body}>{t.foundationBody}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  section: { marginBottom: 25 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#002147', marginBottom: 8 },
  subHeader: { fontSize: 14, color: '#C5A059', fontWeight: '700', marginBottom: 10 },
  body: { fontSize: 15, color: '#333', lineHeight: 28, textAlign: 'justify' }, // Increased lineHeight slightly for Assamese script clarity
  
  shatkonaBox: { 
    backgroundColor: '#F9F8F4', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#C5A059'
  },
  shatkonaTitle: { fontSize: 18, fontWeight: 'bold', color: '#002147', textAlign: 'center' },
  shatkonaDesc: { fontSize: 13, color: '#666', textAlign: 'center', marginVertical: 10 },
  
  vectorGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  vectorItem: { 
    width: '48%', 
    backgroundColor: '#FFF', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 10,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: '#EEE'
  },
  vectorText: { fontSize: 11, fontWeight: 'bold', color: '#004D40', textAlign: 'center' },
  
  missionSection: { 
    backgroundColor: '#002147', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 25 
  },
  
  foundationSection: { borderTopWidth: 1, borderColor: '#EEE', paddingTop: 20, marginBottom: 40 }
});