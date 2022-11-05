import {initializeApp} from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtit3X9T98G4zCxrgJ-sZ21QT7jR-cHgw",
  authDomain: "d-clothing-db.firebaseapp.com",
  projectId: "d-clothing-db",
  storageBucket: "d-clothing-db.appspot.com",
  messagingSenderId: "295535083461",
  appId: "1:295535083461:web:21f261b61dc4ddd9e755ac",
};

const firebaseApp = initializeApp(firebaseConfig);

const goolgeProvider = new GoogleAuthProvider();

goolgeProvider.setCustomParameters({
  promt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, goolgeProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, goolgeProvider);

export const db = getFirestore();

export const creatUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth);
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {email, displayName, createdAt, ...additionalInfo});
    } catch (error) {
      console.log(`error creating the user$`, error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
