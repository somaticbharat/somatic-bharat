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
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK493232/'
      },
      {
        title: "The Biology of Chronic Inflammation",
        text: "The role of NF-kB signaling pathways in widespread pain and neuro-inflammation in Fibromyalgia.",
        link: "Read: NF-kB & Central Sensitization →",
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4683208/'
      },
      {
        title: "Ancestral Trauma & Epigenetics",
        text: "How generational stress impacts the nervous system’s pain threshold (Mission 2047 Vision).",
        link: "Read: Transgenerational Stress Legacy →",
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6322092/'
      },
      {
        title: "Central Sensitization & Neural Plasticity",
        text: "Clinical insights into central nervous system mechanisms underlying persistent, unexplained musculoskeletal pain syndromes.",
        link: "Read PubMed Study 37325101 →",
        url: 'https://pubmed.ncbi.nlm.nih.gov/37325101/'
      },
      {
        title: "Work Productivity & Mental Health",
        text: "An observational study from South India analyzing work productivity, absenteeism, and presenteeism in persons with common mental disorders.",
        link: "Read PubMed Study on Work Productivity →",
        url: 'https://pubmed.ncbi.nlm.nih.gov/37325101/'
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
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK493232/'
      },
      {
        title: "দীৰ্ঘদিনীয়া প্ৰদাহৰ জীৱবিজ্ঞান",
        text: "ফাইব্ৰ’মায়েলজিয়াত বিষ আৰু নিউৰ’-প্ৰদাহৰ ক্ষেত্ৰত NF-kB সংকেত পথৰ ভূমিকা।",
        link: "পঢ়ক: NF-kB আৰু চেণ্ট্ৰেল চেন্সিটাইজেচন →",
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4683208/'
      },
      {
        title: "পূৰ্বপুৰুষীয় আঘাত আৰু এপিজেনেটিক্স",
        text: "বংশানুক্ৰমিক মানসিক চাপে কেনেকৈ স্নায়ুতন্ত্ৰৰ বিষ সহনশীলতাক প্ৰভাৱিত কৰে (মিছন ২০৪৭ ভিজন)।",
        link: "পঢ়ক: বংশানুক্ৰমিক মানসিক চাপৰ উত্তৰাধিকাৰ →",
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6322092/'
      },
      {
        title: "চেণ্ট্ৰেল চেন্সিটাইজেচন আৰু নিউৰেল প্লাষ্টিচিটি",
        text: "ব্যাখ্যাতীত দীৰ্ঘদিনীয়া মাংসপেশীৰ বিষৰ অন্তৰ্নিহিত কেন্দ্ৰীয় স্নায়ুতন্ত্ৰৰ কাৰিকৰী বিশ্লেষণ।",
        link: "পঢ়ক পাবমেড অধ্যয়ন ৩৭ ২০২৩৫১০১ →",
        url: 'https://pubmed.ncbi.nlm.nih.gov/37325101/'
      },
      {
        title: "কৰ্মক্ষমতা আৰু মানসিক স্বাস্থ্য",
        text: "দক্ষিণ ভাৰতৰ সাধাৰণ মানসিক বিকাৰগ্ৰস্ত ব্যক্তিসকলৰ কৰ্মক্ষমতা, অনুপস্থিতি আৰু কাৰ্যালয়ত উপস্থিত থাকিও কাম কৰিব নোৱাৰা অৱস্থাৰ ওপৰত এক পৰ্যবেক্ষণমূলক অধ্যয়ন।",
        link: "পঢ়ক কৰ্মক্ষমতা সম্পৰ্কীয় পাবমেড অধ্যয়ন →",
        url: 'https://pubmed.ncbi.nlm.nih.gov/37325101/'
      }
    ]
  }
};

export const TISRI = ({ lang }) => {
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