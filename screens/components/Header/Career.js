import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your Firebase Configuration for shatkonalife-saas
const firebaseConfig = {
  apiKey: "AIzaSyBXD3yyuKWNsn4bAZaLBrXucl_9Z-eauF0",
  authDomain: "shatkonalife-saas.firebaseapp.com",
  projectId: "shatkonalife-saas",
  storageBucket: "shatkonalife-saas.firebasestorage.app",
  messagingSenderId: "491921572098",
  appId: "1:491921572098:web:2d3db9b80a48cb89e6421b"
};

// Initialize Firebase safely (prevents duplicate app initialization error in React Native)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const translations = {
  en: {
    header: "Join the Somatic Movement",
    subHeader: "Building the Future of Bharat's Somatic Literacy",
    introText: "At Somatic Bharat, we don't just hire employees; we recruit pioneers. Whether you are a clinician, a researcher, or a technologist, your work here contributes directly to Mission 2030.",
    roles: [
      {
        badge: "Clinical",
        badgeBg: '#F2F2F2',
        badgeColor: '#666',
        title: "Somatic Practitioner (MPT/BPT)",
        desc: "Join the SHATKONA CENTER wing. You will be trained in the proprietary Shatkona Somatic Protocol to treat chronic pain, Fibromyalgia, and CS.",
        req: "• Specialization in Musculoskeletal/Neuro preferred.",
      },
      {
        badge: "TISRI Research",
        badgeBg: '#E8F0FE',
        badgeColor: '#1967D2',
        title: "Biosomatic Research Fellow",
        desc: "Help us map the roots of pain. You will work on social research projects and curate global archives on NF-kB and Epigenetics.",
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
    applyBody: "Fill out our quick application form below to connect with our recruitment team.",
    cta: "Apply Now",
    formModalTitle: "Job Application",
    namePlaceholder: "Full Name",
    emailPlaceholder: "Email Address",
    phonePlaceholder: "Phone Number",
    notePlaceholder: "Brief note on how you align with Mission 2030",
    submitCta: "Submit Application",
    cancelCta: "Cancel"
  },
  as: {
    header: "ছ’মেটিক আন্দোলনত যোগদান কৰক",
    subHeader: "ভাৰতৰ ছ’মেটিক সাক্ষৰতাৰ ভৱিষ্যত গঢ়ি তোলা",
    introText: "ছ’মেটিক ভাৰতত আমি কেৱল কৰ্মচাৰী নিয়োগ নকৰো; আমি অগ্ৰগামী বিপ্লৱী বিচাৰো। আপুনি এজন চিকিৎসক, গৱেষক বা প্ৰযুক্তিবিদে নহওক কিয়, আপোনাৰ কামে পোনপটীয়াকৈ 'মিছন ২০৩০'ত অৰিহণা যোগাব।",
    roles: [
      {
        badge: "ক্লিনিকেল",
        badgeBg: '#F2F2F2',
        badgeColor: '#666',
        title: "ছ’মেটিক প্ৰেকটিচনাৰ (MPT/BPT)",
        desc: "ষটকোন ক্লিনিকেল উইঙত যোগদান কৰক। আপোনাক দীৰ্ঘদিনীয়া বিষ আৰু ফাইব্ৰ’মায়েলজিয়াৰ চিকিৎসাৰ বাবে ষটকোণ MSR প্ৰটোকলত প্ৰশিক্ষণ দিয়া হ'ব।",
        req: "• মাস্কুলোস্কেলিটেল/নিউৰ’ বিভাগত বিশেষজ্ঞতা থকাটো অগ্ৰাধিকাৰযোগ্য।",
      },
      {
        badge: "TISRI গৱেষণা",
        badgeBg: '#E8F0FE',
        badgeColor: '#1967D2',
        title: "বায়োছ’মেটিক গৱেষণা ফেল’",
        desc: "বিষৰ মূল চিনাক্ত কৰাত আমাক সহায় কৰক। আপুনি সামাজিক গৱেষণা প্ৰকল্প আৰু এপিজেনেটিক্সৰ গোলকীয় আৰ্কাইভৰ কামত জড়িত হ'ব।",
        req: "• সমাজ বিজ্ঞান, জীৱবিজ্ঞান বা ডাটা এনালিটিক্সৰ জ্ঞান থকাটো প্ৰয়োজনীয়।",
      },
      {
        badge: "SIBS একাডেমী",
        badgeBg: '#FFF4ED',
        badgeColor: '#B34700',
        title: "ছ’মেটিক লিটাৰেচি এডুকেটৰ",
        desc: "যুৱ প্ৰজন্ম আৰু কৰ্পোৰেট অংশীদাৰসকলৰ বাবে NSDC-সংলগ্ন পাঠ্যক্ৰম প্ৰস্তুত কৰক। সমগ্ৰ ভাৰতত ছ’মেটিক শিক্ষা বিস্তাৰ কৰাত সহায় কৰক।",
        req: "• শিক্ষকতা, যোগ বা ৱেলনেছ কোচিংত অভিজ্ঞতা থকাটো প্ৰয়োজনীয়।",
      }
    ],
    applyTitle: "আপুনি পৰিৱৰ্তন আনিবলৈ সাজুনে?",
    applyBody: "আমাক আপোনাৰ বিৱৰণ পঠিয়াবলৈ তলৰ আবেদন পত্ৰখন পূৰণ কৰক।",
    cta: "এতিয়াই আবেদন কৰক",
    formModalTitle: "চাকৰিৰ বাবে আবেদন",
    namePlaceholder: "সম্পূৰ্ণ নাম",
    emailPlaceholder: "ইমেইল ঠিকনা",
    phonePlaceholder: "ফোন নম্বৰ",
    notePlaceholder: "মিছন ২০৩০ ৰ সৈতে আপুনি কেনেকৈ সংগতি ৰাখে",
    submitCta: "আবেদন জমা দিয়ক",
    cancelCta: "বাতিল কৰক"
  }
};

export const Career = ({ lang }) => {
  const t = translations[lang] || translations.as;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleOpenForm = (roleTitle) => {
    setSelectedRole(roleTitle);
    setModalVisible(true);
  };

  const handleSubmitApplication = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Please fill in your name and email.");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "job_applications"), {
        role: selectedRole || "General Application",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        note: note.trim(),
        createdAt: serverTimestamp()
      });

      Alert.alert("Success", "Your application has been submitted successfully!");
      setName('');
      setEmail('');
      setPhone('');
      setNote('');
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving application: ", error);
      Alert.alert("Error", "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
          
          <TouchableOpacity 
            style={styles.cardApplyButton}
            onPress={() => handleOpenForm(role.title)}
          >
            <Text style={styles.cardApplyButtonText}>{t.cta}</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* --- APPLICATION CTA SECTION --- */}
      <View style={styles.applySection}>
        <Text style={styles.applyTitle}>{t.applyTitle}</Text>
        <Text style={styles.applyBody}>{t.applyBody}</Text>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => handleOpenForm('General Application')}
          activeOpacity={0.8}
        >
          <Text style={styles.applyButtonText}>{t.cta}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 30 }} />

      {/* --- FORM MODAL --- */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.formModalTitle}</Text>
            {selectedRole ? <Text style={styles.modalSubTitle}>{selectedRole}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder={t.namePlaceholder}
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder={t.emailPlaceholder}
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={t.phonePlaceholder}
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={t.notePlaceholder}
              placeholderTextColor="#888"
              multiline
              numberOfLines={4}
              value={note}
              onChangeText={setNote}
            />

            <TouchableOpacity 
              style={[styles.submitButton, submitting && { opacity: 0.7 }]}
              onPress={handleSubmitApplication}
              disabled={submitting}
            >
              <Text style={styles.submitButtonText}>{submitting ? "Submitting..." : t.submitCta}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>{t.cancelCta}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 15 },
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
  requirement: { fontSize: 12, color: '#888', fontStyle: 'italic', marginBottom: 15 },
  
  cardApplyButton: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  cardApplyButtonText: { color: '#FFF', fontWeight: '600', fontSize: 14 },

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
  applyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    elevation: 5
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#003366', textAlign: 'center' },
  modalSubTitle: { fontSize: 14, color: '#B34700', textAlign: 'center', marginBottom: 15, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
    color: '#333'
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top'
  },
  submitButton: {
    backgroundColor: '#B34700',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5
  },
  submitButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  cancelButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8
  },
  cancelButtonText: { color: '#666', fontSize: 14 }
});