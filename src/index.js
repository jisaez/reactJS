import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBprEPBMq--kt0uiv7F3cDCisiFFOcXw9E",
  authDomain: "derlaschbier.firebaseapp.com",
  projectId: "derlaschbier",
  storageBucket: "derlaschbier.appspot.com",
  messagingSenderId: "38696493881",
  appId: "1:38696493881:web:48e4358c77e01666d9bee8"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
