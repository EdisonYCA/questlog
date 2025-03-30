import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, getDoc } from "firebase/firestore";
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
      currentStreakDays: 1,
      longestStreakDays: 1,
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

export const addCurrentStreakDays = async () => {
  const uid = getUserUID();
  if (!uid) return;

  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) return;

  const userData = userDoc.data();
  const lastActive = userData.lastActive?.toDate();
  const currentDate = new Date();
  
  // Reset time to midnight for date comparison
  lastActive.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  
  // Calculate days difference
  const daysDiff = Math.floor((currentDate - lastActive) / (1000 * 60 * 60 * 24));
  
  let newStreak = userData.currentStreakDays;
  
  if (daysDiff === 1) {
    // If last active was yesterday, increment streak
    newStreak = userData.currentStreakDays + 1;
    
    // Update longest streak if current streak is higher
    if (newStreak > userData.longestStreakDays) {
      await updateUserData(uid, { longestStreakDays: newStreak });
    }
  } else if (daysDiff > 1) {
    // If more than one day has passed, reset streak to 1
    newStreak = 1;
  }
  
  // Update current streak and last active time
  await updateUserData(uid, {
    currentStreakDays: newStreak,
    lastActive: serverTimestamp()
  });
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