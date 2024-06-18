import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
const signUpFireBase = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed up
    const user = userCredential.user;
    await updateProfile(user, {displayName: name});
    return user; // Resolve with user
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
    return null;
  }
};

  export default signUpFireBase;