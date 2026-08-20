import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const translations = {
  as: {
    visionary: "প্ৰতিষ্ঠাপক",
    founderName: "ডাঃ এম. পি. দাস পিটি,(BPT, LLB, RYT 500)",
    founderBody: "১২ বছৰৰো অধিক ক্লিনিকেল অভিজ্ঞতাৰ সৈতে (NIMHANS/Apollo), আমাৰ প্ৰতিষ্ঠাপকে ফিজিঅ’থেৰাপী, আইনী ওকালতি আৰু ছ’মেটিক জ্ঞানৰ মাজত এক নতুন যোগসূত্ৰ স্থাপন কৰিছে। তেখেতৰ যাত্ৰাই 'Uncut' সংযোগ আৱিষ্কাৰ কৰিছিল—য’ত সমাধান নোহোৱা অৱচেতন মনেই শৰীৰত 'অদৃশ্য জুই' বা দীৰ্ঘদিনীয়া বিষ হিচাপে প্ৰকাশ পায়।",
    shatkonaTitle: "ষটকোণ ৬-ভেক্টৰ মেপিং",
    shatkonaDesc: "আমাৰ স্বকীয় ডায়েগনষ্টিক ফ্ৰেমৱৰ্ক। আমি আপোনাৰ 'ছ’মেটিক অডিট' (Somatic Audit) কৰোঁ আৰু বিষৰ উৎস তলত দিয়া ছয়টা গুৰুত্বপূৰ্ণ ভেক্টৰৰ জৰিয়তে মেপিং কৰোঁ:",
    vectors: [
      { n: "১. যান্ত্ৰিক (Mechanical)", d: "গাঁঠি আৰু কলাৰ চাপ" },
      { n: "২. পূৰ্বপুৰুষীয় (Ancestral)", d: "এপিজেনেটিক্সৰ প্ৰভাৱ" },
      { n: "৩. স্নায়ৱিক (Neural)", d: "স্নায়ুতন্ত্ৰৰ অতি-সক্ৰিয়তা" },
      { n: "৪. পাৰিপাৰ্শ্বিক (Atmospheric)", d: "পৰিৱেশগত চাপ" },
      { n: "৫. গাথঁনিগত (Structural)", d: "ফেচিয়েল এলাইনমেন্ট" },
      { n: "৬. হিউমৰেল (Humoral)", d: "প্ৰণালীবদ্ধ বিষাক্ততা" }
    ],
    missionTitle: "মিছন ২০৩০: এক সুদৃঢ় স্নায়ৱিক ভাৰত",
    missionBody: "আমাৰ লক্ষ্য এখন 'যন্ত্ৰণামুক্ত আৰু স্নায়ৱিকভাৱে সুদৃঢ় ভাৰত' গঢ়ি তোলা। ২০৩০ চনৰ ভিতৰত আমি প্ৰতিখন বিদ্যালয় আৰু কৰ্প’ৰেট কাৰ্যালয়ত ছ’মেটিক শিক্ষা (Somatic Literacy) কাৰ্যকৰী কৰিব বিচাৰোঁ, যাতে ৰাষ্ট্ৰীয় কৰ্মশক্তিয়ে কেৱল উৎপাদনশীল হোৱাই নহয়, বৰঞ্চ জৈৱিকভাৱে নিয়ন্ত্রিত আৰু ট্ৰমা-ইনফৰ্মড হয়।",
    foundationTitle: "ছ’মেটিক ভাৰত MOVEMENT",
    foundationBody: "এক অলাভজনক সংস্থা যি সামাজিক গৱেষণা (TISRI) আৰু বৃত্তিমূলক শিক্ষা (SIBS Academy) ৰ বাবে উৎসৰ্গিত। আমি বিজ্ঞান, সংস্কৃতি আৰু সহানুভূতিৰ জৰিয়তে 'অসমাধানিত বিষৰ মহামাৰী' দূৰ কৰিবলৈ সংকল্পবদ্ধ।"
  },
  en: {
    visionary: "The Visionary",
    founderName: "Dr. MP Das PT,(BPT, LLB, RYT 500)",
    founderBody: "With over 12 years of clinical exposure (NIMHANS/Apollo), our founder has bridged the gap between physical therapy, legal advocacy, and somatic wisdom. His journey led to the discovery of the 'Uncut' connection—where unresolved subconscious patterns manifest as 'Invisible Fire' or chronic physical pain.",
    shatkonaTitle: "Shatkona 6-Vector Model",
    shatkonaDesc: "Our proprietary diagnostic framework for the 'Somatic Audit.' We map the roots of your pain across six vital dimensions:",
    vectors: [
      { n: "1. Mechanical", d: "Joint & Tissue Load" },
      { n: "2. Ancestral", d: "Epigenetic Imprints" },
      { n: "3. Neural", d: "Nervous Overdrive" },
      { n: "4. Atmospheric", d: "Environmental Stress" },
      { n: "5. Structural", d: "Fascial Alignment" },
      { n: "6. Humoral", d: "Systemic Toxicity" }
    ],
    missionTitle: "Mission 2030: Neuro-Resilient Bharat",
    missionBody: "We are committed to building a 'Pain-Free & Neuro-Resilient India.' By 2030, we aim to implement somatic literacy across every school and corporate space, ensuring a national workforce that is not just productive, but biologically regulated and trauma-informed.",
    foundationTitle: "Somatic Bharat Movement",
    foundationBody: "A non-profit entity dedicated to Social Research (TISRI) and Vocational Education (SIBS Academy). We exist to solve the 'Unresolved Pain Epidemic' through science, culture, and compassion."
  }
};

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
              <Text style={styles.vectorName}>{vector.n}</Text>
              <Text style={styles.vectorDesc}>{vector.d}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* --- MISSION 2030 --- */}
      <View style={styles.missionSection}>
        <Text style={[styles.header, { color: '#C5A059' }]}>{t.missionTitle}</Text>
        <Text style={[styles.body, { color: '#FFF' }]}>{t.missionBody}</Text>
      </View>

      {/* --- THE SOMATIC BHARAT MOVEMENT --- */}
      <View style={styles.foundationSection}>
        <Text style={styles.header}>{t.foundationTitle}</Text>
        <Text style={styles.body}>{t.foundationBody}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 15 },
  section: { marginBottom: 25 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#002147', marginBottom: 8 },
  subHeader: { fontSize: 14, color: '#C5A059', fontWeight: '700', marginBottom: 10 },
  body: { fontSize: 15, color: '#333', lineHeight: 26, textAlign: 'justify' }, 
  
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
    padding: 8, 
    borderRadius: 8, 
    marginBottom: 10,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: '#EEE',
    alignItems: 'center'
  },
  vectorName: { fontSize: 10, fontWeight: 'bold', color: '#004D40', textAlign: 'center' },
  vectorDesc: { fontSize: 9, color: '#777', textAlign: 'center', marginTop: 2 },
  
  missionSection: { 
    backgroundColor: '#002147', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 25 
  },
  
  foundationSection: { borderTopWidth: 1, borderColor: '#EEE', paddingTop: 20, marginBottom: 40 }
});