import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/library/firebaseConfig";


export const initUserEntry = async (uid, email) => {
  // Add a new document in collection "cities"
  try {
    await setDoc(doc(db, "users", uid), {
      journals: [],
      activeQuests: [],
      activeSide: [],
      completeQuests: [],
      points: 0,
      activeSide: [],
      completeQuests: [],
      currentStreakDays: 0,
      longestStreakDays: 0,
      lastActive: new Date(),
      calendar: [],
      userName: email,
    });
  } catch (error) {alert(`${error}`);}
};

export const addJournalEntry = async (uid, entry) => {
    try{const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
        journals: arrayUnion(entry)
    });}
    catch(error){alert(`${error}`);};
}
