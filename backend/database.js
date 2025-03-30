import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/library/firebaseConfig";
import { getUserUID } from "@/backend/auth";

const updateUserData = async (uid, data) => {
  const userRef = doc(db, "users", uid);

  try {
    await updateDoc(userRef, data);
  } catch (error) {
    alert(error);
  }
};

export const initUserEntry = async (uid, email) => {
  try {
    await setDoc(doc(db, "users", uid), {
      journals: [],
      interests: [],
      activeMainQuests: [],
      activeSideQuests: [],
      completeQuests: [],
      points: 0,
      currentStreakDays: 0,
      longestStreakDays: 0,
      lastActive: serverTimestamp(),
      calendar: [],
      userName: email,
    });
  } catch (error) {
    alert(error);
  }
};

export const getJournalEntries = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().journals || [];
    }
    return [];
  } catch (error) {
    console.error("Error getting journal entries:", error);
    return [];
  }
};

export const addJournalEntry = async (uid, entry) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }

    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newEntry = {
      id: Date.now(),
      title: entry.title,
      body: entry.body,
      date: currentDate,
      timestamp: new Date().toISOString(),
    };

    await updateDoc(userRef, {
      journals: arrayUnion(newEntry)
    });

    return newEntry;
  } catch (error) {
    console.error("Error adding journal entry:", error);
    throw error;
  }
};

export const removeJournalEntry = async (entry) => {
  updateUserData(getUserUID(), { journals: arrayRemove(entry) });
};

export const addActiveSideQuest = async (quest) => {
  updateUserData(getUserUID(), { activeSideQuests: arrayUnion(quest) });
};

export const removeActiveSideQuest = async (quest) => {
  updateUserData(getUserUID(), { activeSideQuests: arrayRemove(quest) });
};

export const addActiveMainQuest = async (quest) => {
  updateUserData(getUserUID(), { activeMainQuests: arrayUnion(quest) });
};

export const removeActiveMainQuest = async (quest) => {
  updateUserData(getUserUID(), { activeMainQuests: arrayRemove(quest) });
};

export const addCompleteQuest = async (quest) => {
  updateUserData(getUserUID(), { completeQuests: arrayUnion(quest) });
};

export const addPoints = async (points) => {
  updateUserData(getUserUID(), { points });
};

export const addCurrentStreakDays = async (days) => {
  updateUserData(getUserUID(), { currentStreakDays: days });
};

export const addLongestStreakDays = async (days) => {
  updateUserData(getUserUID(), { longestStreakDays: days });
};

export const addCalendar = async (calendar) => {
  updateUserData(getUserUID(), { calendar });
};

export const addUserName = async (userName) => {
  updateUserData(getUserUID(), { userName });
};

export const addLastActive = async (lastActive) => {
  updateUserData(getUserUID(), { lastActive });
};

export const addInterests = async (interests) => {
  updateUserData(getUserUID(), { interests });
};

export const getCalendar = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().calendar || [];
    }
    return [];
  } catch (error) {
    console.error("Error getting calendar data:", error);
    return [];
  }
};
