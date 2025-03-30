import { auth } from "@/library/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signUpUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // TODO: add user user to database
      return true;
    })
    .catch((error) => {
    // TODO: handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      return false;
    });
};
