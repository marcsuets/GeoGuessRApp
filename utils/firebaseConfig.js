// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración obtenida de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCrJ7liGYK8ms2uJg9g54A5757c3OBwmhA",
    authDomain: "goeguessr-3a2d7.firebaseapp.com",
    projectId: "goeguessr-3a2d7",
    storageBucket: "goeguessr-3a2d7.firebasestorage.app",
    messagingSenderId: "20823026806",
    appId: "1:20823026806:web:1a020fe1b6980c8a130357",
    measurementId: "G-KLN706V9BX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
