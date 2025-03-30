import { auth } from "@/library/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const signUpUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // TODO: add user user to database
      return true;
    })
    .catch((error) => {
      // Handle specific error cases
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please sign in instead.');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters long.');
      }
      throw error;
    });
};

export const logUserIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return true;
    })
    .catch((error) => {
      // Handle specific error cases
      if (error.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. Please try again.');
      }
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email. Please sign up first.');
      }
      if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      }
      throw error;
    });
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