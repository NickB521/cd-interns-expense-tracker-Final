import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "./firebase";
const signInFireBase = async (email, password) => {
  try {  
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // setPersistence(auth, browserSessionPersistence)
    // .then(() => {
    //   return signInWithEmailAndPassword(auth, email, password).user;
    //  })
    //  console.log(auth.currentUser);
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
    return null;
  }
};

export default signInFireBase;