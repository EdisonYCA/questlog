import { auth } from "@/library/firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { initUserEntry } from "./database";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Initialize user data in database
    await initUserEntry(user.uid, {
      email: user.email,
      displayName: user.displayName || email.split('@')[0],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      settings: {
        theme: 'dark',
        notifications: true
      }
    });

    return { success: true, user };
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, error: error.message };
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if this is a new user and initialize their data
    const isNewUser = userCredential._tokenResponse?.isNewUser;
    if (isNewUser) {
      await initUserEntry(user.uid, {
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        settings: {
          theme: 'dark',
          notifications: true
        }
      });
    }

    return { success: true, user };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
};

export const initializeUserData = async (uid, email) => {
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
    console.error("Error initializing user data:", error);
    throw error;
  }
};