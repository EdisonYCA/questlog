import { auth, db } from "@/library/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Check if user document already exists
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      const currentDate = new Date().toISOString();
      
      // Create new user document with all required fields
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        lastActive: currentDate,
        journals: [],
        activeQuests: [],
        completedQuests: [],
        streak: 0,
        points: 0,
        longestStreak: 0,
        calendar: []
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error signing up:", error);
    return false;
  }
};

export const logUserIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update last active time
    await setDoc(doc(db, "users", user.uid), {
      lastActive: new Date().toISOString()
    }, { merge: true });
    
    return true;
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
};

export const logUserInGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};