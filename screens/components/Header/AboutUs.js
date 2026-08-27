import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const translations = {
  as: {
    disclaimer: "স্বীকাৰোক্তি (Disclaimer): এই এপ্লিকেচনটো কেৱল শিক্ষা, ছ’মেটিক সজাগতা আৰু আত্ম-মূল্যায়নৰ (Self-Assessment) বাবে প্ৰস্তুত কৰা হৈছে। ই কোনো আনুষ্ঠানিক চিকিৎসা নিদান (Medical Diagnosis) বা চিকিৎসা সেৱা আগবঢ়োৱা নহয়।",
    visionary: "প্ৰতিষ্ঠাপক",
    founderName: "ডাঃ এম. পি. দাস পি.টি., (BPT, LLB, RYT 500)",
    clinicalExp: "ক্লিনিকেল অভিজ্ঞতা @ NIMHANS | Apollo Blore",
    founderBody: "১২ বছৰৰো অধিক ক্লিনিকেল অভিজ্ঞতাৰ জৰিয়তে ৩০,০০০ তকৈও অধিক দীৰ্ঘদিনীয়া বিষত আক্ৰান্ত ৰোগীৰ চিকিৎসা কৰি, আমাৰ প্ৰতিষ্ঠাপকে এই মিছন আৰু 'ছ’মেটিক অডিট' (Somatic Audit) ব্যৱস্থাটো প্ৰস্তুত কৰিছে। তেখেতৰ চিকিৎসা আৰু গৱেষণাই এনে এক প্ৰটোকল সৃষ্টি কৰিছে যিয়ে আমাৰ সমাজৰ এক নিৰৱ মহামাৰীক মোকাবিলা কৰিবলৈ সক্ষম। আজি ভাৰতৰ প্ৰায় ২০ কোটি লোক এনে বিষত আক্ৰান্ত, যাৰ ফলত কাৰ্যকৰী কৰ্মশক্তিত কৰ্মস্থানৰ পৰা অনুপস্থিতি (Absenteeism) তকৈ ২-৪ গুণ বেছি আৰ্থিক ক্ষতি (Presenteeism) হৈছে। বিশেষকৈ ৯০% মহিলা ফাইব্ৰ’মায়েলজিয়া (Fibromyalgia) আৰু ছ’মেট’ফৰ্ম বিষৰ ভুক্তভোগী। এই প্ৰটোকলৰ লক্ষ্য হ’ল সেই 'অদৃশ্য জুই' নুমুৱাই সমাজক পুনৰ সবল কৰি তোলা।",
    shatkonaTitle: "ষটকোণ ৬-ভেক্টৰ মেপিং",
    shatkonaDesc: "আমাৰ স্বকীয় এনালাইটিকেল ফ্ৰেমৱৰ্ক। আমি আপোনাৰ 'ছ’মেটিক অডিট' কৰোঁ আৰু বিষৰ মূল উৎস তলত দিয়া ছয়টা গুৰুত্বপূৰ্ণ ভেক্টৰৰ জৰিয়তে মেপিং কৰোঁ:",
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
    foundationTitle: "ছ’মেটিক ভাৰত মুভমেণ্ট",
  },
  en: {
    disclaimer: "Disclaimer: This platform and its somatic audits are strictly for educational, self-awareness, and informational purposes. They do not constitute formal medical diagnosis, treatment, or clinical advice.",
    visionary: "The Visionary",
    founderName: "Dr. M. P. Das PT, (BPT, LLB, RYT 500)",
    clinicalExp: "Clinical exposure @ NIMHANS | Apollo Blore",
    founderBody: "With over 12 years of clinical exposure and having managed more than 30,000 chronic pain cases, our founder developed this mission and the somatic audit system to address the silent epidemic affecting over 200 million Indians. This condition causes 2 to 4 times more financial damage to the nation through presenteeism than absenteeism in the workforce due to somatoform pain and chronic stress, with females representing 90% of fibromyalgia victims.",
    shatkonaTitle: "Shatkona 6-Vector Model",
    shatkonaDesc: "Our proprietary analytical framework for the 'Somatic Audit.' We map the roots of your pain across six vital dimensions:",
    vectors: [
      { n: "1. Mechanical", d: "Joint & Tissue Load" },
      { n: "2. Ancestral", d: "Epigenetic Imprints" },
      { n: "3. Neural", d: "Nervous OverDrive" },
      { n: "4. Atmospheric", d: "Environmental Stress" },
      { n: "5. Structural", d: "Fascial Alignment" },
      { n: "6. Humoral", d: "Systemic Toxicity" }
    ],
    missionTitle: "Mission 2030: Neuro-Resilient Bharat",
    missionBody: "We are committed to building a 'Somato Pain-Free & Neuro-Resilient India.' By 2030, we aim to implement somatic literacy across every school and corporate space, ensuring a national workforce that is not just productive, but biologically regulated and trauma-informed.",
    foundationTitle: "Somatic Bharat Movement",
  }
};

export const AboutUs = ({ lang = 'as' }) => {
  const t = translations[lang] || translations.as;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* --- NON-MEDICAL EDUCATIONAL DISCLAIMER --- */}
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>{t.disclaimer}</Text>
      </View>

      {/* --- THE FOUNDER --- */}
      <View style={styles.section}>
        <Text style={styles.header}>{t.visionary}</Text>
        
        {/* Founder Image & Credentials */}
        <View style={styles.founderCard}>
          <Image 
            source={require('../../../assets/dr-mp-das.png')} 
            style={styles.founderImg} 
            resizeMode="cover" 
          />
          <Text style={styles.subHeader}>{t.founderName}</Text>
          <Text style={styles.clinicalExp}>{t.clinicalExp}</Text>
        </View>

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
  disclaimerBox: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFEEBA',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 10,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 14,
  },
  section: { marginBottom: 25 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#002147', marginBottom: 12 },
  
  founderCard: { 
    alignItems: 'center', 
    backgroundColor: '#F9F8F4', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  founderImg: { width: 100, height: 130, borderRadius: 8, marginBottom: 12 },
  subHeader: { fontSize: 13, color: '#002147', fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  clinicalExp: { fontSize: 10, color: '#C5A059', fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  
  body: { fontSize: 14, color: '#333', lineHeight: 24, textAlign: 'justify' }, 
  
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