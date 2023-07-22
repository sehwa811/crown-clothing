import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8d18rxEKQf6_lrP1-2VX6SdN6bBlRtzU",
  authDomain: "crwn-clothing-db-5304e.firebaseapp.com",
  projectId: "crwn-clothing-db-5304e",
  storageBucket: "crwn-clothing-db-5304e.appspot.com",
  messagingSenderId: "325885066304",
  appId: "1:325885066304:web:2166bdd0745c77c5cf33a5",
  measurementId: "G-TN1615FLT6",
};

initializeApp(firebaseConfig);

//authenticate
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

//authentic data를 firestore에 저장하자
export const db = getFirestore();

//SHOPT_DATA batch하는 func
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.map(docSnapshot => docSnapshot.data());
}


export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  //user 정보 안의 uid가 유저의 고유한 식별정보이다
  //doc는 documentreference instance를 반환

  const userSnapshot = await getDoc(userDocRef);
  //getdoc는 document안의 데이터에 접근

  //if user data doesn't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
      //setdoc는 document안의 데이터를 세팅
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists in db
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
