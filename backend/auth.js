import { auth, db } from "@/library/firebaseConfig"
import { initUserEntry, addCurrentStreakDays } from "@/backend/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const getUserUID = () => {
  return auth.currentUser?.uid;
};

export const signUpUser = async (email, password, setUser) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await initUserEntry(user.uid, email);
    setUser(user);
    return true;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error(
        "This email is already registered. Please sign in instead."
      );
    }
    if (error.code === "auth/weak-password") {
      throw new Error("Password should be at least 6 characters long.");
    }
    throw error;
  }
};

export const logUserIn = async (email, password, setUser) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addCurrentStreakDays();
    setUser(user);
    return user;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      throw new Error(
        "No account found with this email. Please sign up first."
      );
    }
    if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password. Please try again.");
    }
    throw error;
  }
};

const provider = new GoogleAuthProvider();

export const logUserInGoogle = async (setUser) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await addCurrentStreakDays();
    setUser(user);
    return user;
  } catch (error) {
    throw new Error("Failed to sign in with Google: " + error.message);
  }
};
