// firebase-conn.js
// Centraliza la conexión y utilidades para Firebase Realtime Database

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, onValue, set, remove, push, onDisconnect, get, child } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyABJmU-UBjqwQiuzVUhpIdUmYsXcHV0P6s",
  authDomain: "loteriafirebase.firebaseapp.com",
  databaseURL: "https://loteriafirebase-default-rtdb.firebaseio.com",
  projectId: "loteriafirebase",
  storageBucket: "loteriafirebase.firebasestorage.app",
  messagingSenderId: "823786320629",
  appId: "1:823786320629:web:c5a6a2ef4507140eaf0bbc",
  measurementId: "G-S988BPJ8EG"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set, remove, push, onDisconnect, get, child };
