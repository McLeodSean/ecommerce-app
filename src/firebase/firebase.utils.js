import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC73G6TPAdGv7dFJAIUF4FpI8sP0DuT37A",
  authDomain: "ecommerce-app-b7a4f.firebaseapp.com",
  databaseURL: "https://ecommerce-app-b7a4f.firebaseio.com",
  projectId: "ecommerce-app-b7a4f",
  storageBucket: "ecommerce-app-b7a4f.appspot.com",
  messagingSenderId: "934247000586",
  appId: "1:934247000586:web:b64efc775f53e954578df3",
  measurementId: "G-FJ08ZQKL2E"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.lof('error creating user', error.message);
    }
  }

  return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;