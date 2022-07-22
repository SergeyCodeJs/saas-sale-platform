import { initializeApp } from 'firebase/app'
import {
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDFXzGKzW4RDMoWblwS1g1m7i5ca44M79E",
    authDomain: "saas-store-d.firebaseapp.com",
    projectId: "saas-store-d",
    storageBucket: "saas-store-d.appspot.com",
    messagingSenderId: "547997260522",
    appId: "1:547997260522:web:8e291544ad2a5ed7b45593"
};

export const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);