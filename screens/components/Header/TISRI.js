import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const translations = {
  en: {
    header: "TISRI Social Research Archive",
    description: "Mapping the \"Lukuwa Xipa\" (Hidden Roots) of Chronic Pain through Global Science.",
    cards: [
      {
        title: "Fascia: The Body's Memory Bank",
        text: "Research on how the fascial system stores emotional trauma and stress as physical tension.",
        link: "Read: Fascia as a Sensory Organ →",
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8364443/'
      },
      {
        title: "The Biology of Chronic Inflammation",
        text: "The role of NF-kB signaling pathways in widespread pain and neuro-inflammation in Fibromyalgia.",
        link: "Read: NF-kB & Central Sensitization →",
        url: 'https://pubmed.ncbi.nlm.nih.gov/33148419/'
      },
      {
        title: "Ancestral Trauma & Epigenetics",
        text: "How generational stress impacts the nervous system’s pain threshold (Mission 2047 Vision).",
        link: "Read: Transgenerational Stress Legacy →",
        url: 'https://www.nature.com/articles/s41386-018-0096-9'
      }
    ]
  },
  as: {
    header: "TISRI সামাজিক গৱেষণা আৰ্কাইভ",
    description: "গোলকীয় বিজ্ঞানৰ জৰিয়তে দীৰ্ঘদিনীয়া বিষৰ \"লুকুৱা শিপা\" (Hidden Roots) চিনাক্তকৰণ।",
    cards: [
      {
        title: "ফেচিয়া: শৰীৰৰ মেম’ৰী বেংক",
        text: "আৱেগিক আঘাত আৰু মানসিক চাপে কেনেকৈ ফেচিয়েলত শাৰীৰিক উত্তেজনা হিচাপে জমা হয় তাৰ ওপৰত গৱেষণা।",
        link: "পঢ়ক: সংবেদনশীল অংগ হিচাপে ফেচিয়া →",
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8364443/'
      },
      {
        title: "দীৰ্ঘদিনীয়া প্ৰদাহৰ জীৱবিজ্ঞান",
        text: "ফাইব্ৰ’মায়েলজিয়াত বিষ আৰু নিউৰ’-প্ৰদাহৰ ক্ষেত্ৰত NF-kB সংকেত পথৰ ভূমিকা।",
        link: "পঢ়ক: NF-kB আৰু চেণ্ট্ৰেল চেন্সিটাইজেচন →",
        url: 'https://pubmed.ncbi.nlm.nih.gov/33148419/'
      },
      {
        title: "পূৰ্বপুৰুষীয় আঘাত আৰু এপিজেনেটিক্স",
        text: "বংশানুক্ৰমিক মানসিক চাপে কেনেকৈ স্নায়ুতন্ত্ৰৰ বিষ সহনশীলতাক প্ৰভাৱিত কৰে (মিছন ২০৪৭ ভিজন)।",
        link: "পঢ়ক: বংশানুক্ৰমিক মানসিক চাপৰ উত্তৰাধিকাৰ →",
        url: 'https://www.nature.com/articles/s41386-018-0096-9'
      }
    ]
  }
};

export const TISRI = ({ lang }) => {
  // Use the lang prop or default to English/Assamese
  const t = translations[lang] || translations.as;
  const openLink = (url) => Linking.openURL(url);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t.header}</Text>
      <Text style={styles.description}>{t.description}</Text>

      {t.cards.map((card, index) => (
        <View key={index} style={styles.linkCard}>
          <Text style={styles.linkTitle}>{card.title}</Text>
          <Text style={styles.linkText}>{card.text}</Text>
          <TouchableOpacity onPress={() => openLink(card.url)}>
            <Text style={styles.urlText}>{card.link}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  description: { fontSize: 14, color: '#666', marginBottom: 20, lineHeight: 22 },
  linkCard: { 
    backgroundColor: '#F0F4F8', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#003366'
  },
  linkTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  linkText: { fontSize: 13, color: '#555', marginVertical: 8, lineHeight: 18 },
  urlText: { fontSize: 14, color: '#B34700', fontWeight: 'bold' }
});