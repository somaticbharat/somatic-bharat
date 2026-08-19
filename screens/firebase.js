import { db } from './firebase'; // Import your Firebase initialization
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Inside AuditScreen component:
const handleAnswer = async (val) => {
  const vector = QUESTIONS[current].v;
  const newScores = { ...scores, [vector]: scores[vector] + val };
  setHistory([...history, val]);

  if (current < QUESTIONS.length - 1) {
    setScores(newScores);
    setCurrent(current + 1);
  } else {
    // Save audit submission directly to Firestore
    try {
      await addDoc(collection(db, "audit_submissions"), {
        scores: newScores,
        completedAt: serverTimestamp(),
        language: lang,
        platform: 'mobile'
      });
    } catch (e) {
      console.error("Failed to save audit results:", e);
    }

    onComplete(newScores); 
  }
};