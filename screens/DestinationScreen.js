import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DEEP_BLUE = '#002147';
const MATTE_GOLD = '#C5A059';
const BG_CREAM = '#F9F8F4';

// --- TRANSLATION DICTIONARY ---
const translations = {
  en: {
    brand: "SOMATIC BHARAT",
    waitlistTitle: "You're on the Waitlist!",
    waitlistSubtitle: "Your audit indicates a mild-to-moderate foundational strain. You are a perfect candidate for our upcoming guided protocols on the ShatkonaLife app.",
    clinicalTitle: "Clinical Attention Recommended",
    clinicalSubtitle: "Your audit reveals a high systemic load across your vectors. Specialized professional guidance is recommended to help restore your nervous system baseline.",
    scoreLabel: "Your Systemic Load Score:",
    whatsappBtn: "Join WhatsApp Community",
    whatsappHint: "Get direct somatic tips, early beta access, and connect with fellow practitioners in Assam.",
    inPersonBtn: "Book In-Person Visit (Bhetapara Center)",
    teleconBtn: "Book Expert Teleconsultation",
    clinicalHint: "Shatkona Center / Tanman Physiotherapy Clinic, Bhetapara, Guwahati.",
    resetText: "Retake Audit",
  },
  as: {
    brand: "ছ’মেটিক ভাৰত",
    waitlistTitle: "আপুনি ৱেইটলিষ্টত আছে!",
    waitlistSubtitle: "আপোনাৰ অডিটত মৃদুৰ পৰা মজলীয়া চাপ ধৰা পৰিছে। আপুনি ShatkonaLife এপৰ অহা নিৰ্দেশনাৱলীসমূহৰ বাবে উপযুক্ত প্ৰাৰ্থী।",
    clinicalTitle: "চিকিৎসাগত পৰামৰ্শ প্ৰয়োজনীয়",
    clinicalSubtitle: "আপোনাৰ অডিটত উচ্চ প্ৰণালীবদ্ধ চাপ দেখা গৈছে। আপোনাৰ স্নায়ুতন্ত্ৰৰ ভাৰসাম্য পুনৰ ঘূৰাই আনিবলৈ বিশেষ পেছাদাৰী পৰামৰ্শ ল’বলৈ অনুৰোধ জনোৱা হ’ল।",
    scoreLabel: "আপোনাৰ চিষ্টেমিক ল’ড স্ক’ৰ:",
    whatsappBtn: "হোৱাটছএপ কমিউনিটিত যোগ দিয়ক",
    whatsappHint: "পোনপটীয়াকৈ ছ’মেটিক টিপছ লাভ কৰক, আগতীয়াকৈ বিটা এক্সেছ লওক, আৰু অসমৰ অন্যান্য সদস্যসকলৰ সৈতে সংযোগ স্থাপন কৰক।",
    inPersonBtn: "ব্যক্তিগত সাক্ষাৎ বুক কৰক (ভেটাপাৰা কেন্দ্ৰ)",
    teleconBtn: "বিশেষজ্ঞৰ দ্বাৰা টেলি-কনচাল্টেচন বুক কৰক",
    clinicalHint: "ছকোনা কেন্দ্ৰ / তনমন ফিজিঅ’থেৰাপী ক্লিনিক, ভেটাপাৰা, গুৱাহাটী।",
    resetText: "অডিট পুনৰ কৰক",
  }
};

// --- WHATSAPP COMMUNITY LINK ---
const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/KmsMlhwZDrE69Hcr98pEy7?s=hd&p=i&mlu=4';

export default function DestinationScreen({ destination, scores, onReset, currentLang = 'en' }) {
  // Select translation dictionary based on currentLang (defaults to 'en')
  const t = translations[currentLang] || translations.en;

  // Calculate total score just for display reference
  const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);

  const handleWhatsAppJoin = () => {
    Linking.openURL(WHATSAPP_COMMUNITY_URL).catch(() => {
      alert("Unable to open WhatsApp link.");
    });
  };

  const handleBookingRedirect = (type) => {
    if (type === 'IN_PERSON') {
      Linking.openURL('https://shatkonalife.com/book-in-person');
    } else {
      Linking.openURL('https://shatkonalife.com/teleconsult');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <Text style={styles.brandTitle}>{t.brand}</Text>
          <View style={styles.goldDivider} />
        </View>

        {destination === 'APP_WAITLIST_AND_COMMUNITY' ? (
          /* --- PATH A: LOW TO MODERATE LOAD (WAITLIST & COMMUNITY) --- */
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="account-group" size={40} color={MATTE_GOLD} />
            </View>
            <Text style={styles.cardTitle}>{t.waitlistTitle}</Text>
            <Text style={styles.cardSubtitle}>{t.waitlistSubtitle}</Text>

            <View style={styles.scoreSummaryBox}>
              <Text style={styles.scoreSummaryLabel}>{t.scoreLabel} {totalScore} / 180</Text>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleWhatsAppJoin}>
              <MaterialCommunityIcons name="whatsapp" size={22} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.primaryBtnText}>{t.whatsappBtn}</Text>
            </TouchableOpacity>
            
            <Text style={styles.communityHint}>{t.whatsappHint}</Text>
          </View>
        ) : (
          /* --- PATH B: HIGH SYSTEM LOAD (CLINICAL INTERVENTION) --- */
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="stethoscope" size={40} color="#D32F2F" />
            </View>
            <Text style={styles.cardTitle}>{t.clinicalTitle}</Text>
            <Text style={styles.cardSubtitle}>{t.clinicalSubtitle}</Text>

            <View style={styles.scoreSummaryBox}>
              <Text style={styles.scoreSummaryLabel}>{t.scoreLabel} {totalScore} / 180</Text>
            </View>

            {destination === 'IN_PERSON_VISIT' ? (
              <TouchableOpacity style={styles.clinicalBtn} onPress={() => handleBookingRedirect('IN_PERSON')}>
                <MaterialCommunityIcons name="map-marker-radius" size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.primaryBtnText}>{t.inPersonBtn}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.clinicalBtn} onPress={() => handleBookingRedirect('TELECON')}>
                <MaterialCommunityIcons name="video-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.primaryBtnText}>{t.teleconBtn}</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.communityHint}>{t.clinicalHint}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetText}>{t.resetText}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_CREAM },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  brandHeader: { alignItems: 'center', marginBottom: 30 },
  brandTitle: { fontSize: 13, fontWeight: '900', color: MATTE_GOLD, letterSpacing: 3 },
  goldDivider: { width: 50, height: 2, backgroundColor: MATTE_GOLD, marginTop: 6 },
  card: { 
    width: '100%', maxWidth: 450, backgroundColor: '#FFF', 
    borderRadius: 16, padding: 30, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10,
    elevation: 6, borderWidth: 1, borderColor: '#E6DFD5'
  },
  iconContainer: { 
    width: 70, height: 70, borderRadius: 35, backgroundColor: '#F4F1EA', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 20 
  },
  cardTitle: { fontSize: 22, fontWeight: '800', color: DEEP_BLUE, textAlign: 'center', marginBottom: 12 },
  cardSubtitle: { fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  scoreSummaryBox: { backgroundColor: '#F9F8F4', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginBottom: 25, width: '100%', alignItems: 'center' },
  scoreSummaryLabel: { color: DEEP_BLUE, fontWeight: '700', fontSize: 13 },
  primaryBtn: { 
    flexDirection: 'row', backgroundColor: '#25D366', paddingVertical: 14, paddingHorizontal: 20, 
    borderRadius: 10, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 12 
  },
  clinicalBtn: { 
    flexDirection: 'row', backgroundColor: DEEP_BLUE, paddingVertical: 14, paddingHorizontal: 20, 
    borderRadius: 10, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 12 
  },
  primaryBtnText: { color: '#FFF', fontWeight: '800', fontSize: 14, textAlign: 'center' },
  communityHint: { fontSize: 11, color: '#777', textAlign: 'center', marginTop: 8, lineHeight: 16 },
  resetBtn: { marginTop: 25, padding: 10 },
  resetText: { color: DEEP_BLUE, fontWeight: '700', fontSize: 13, textDecorationLine: 'underline' }
});