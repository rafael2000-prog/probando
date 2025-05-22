import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAK8ngoMKB60S-9HShsY557DX7HwCOpolU",
  authDomain: "prueba-96c4d.firebaseapp.com",
  projectId: "prueba-96c4d",
  storageBucket: "prueba-96c4d.firebasestorage.app",
  messagingSenderId: "109504273151",
  appId: "1:109504273151:web:676e380166c46e46e60aca",
  measurementId: "G-KXFBFP1PJR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };