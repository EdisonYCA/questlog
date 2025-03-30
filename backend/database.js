import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/library/firebaseConfig";
import { getUserUID } from "@/backend/auth";
// Helper function to update user document data
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

export const addJournalEntry = async (entry) => {
  updateUserData(getUserUID(), { journals: arrayUnion(...entry) });
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

//testt
