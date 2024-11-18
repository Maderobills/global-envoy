import { defineStore } from 'pinia';
import { firebaseApp } from '../firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export const useFirebaseStore = defineStore('firebaseStore', {
  actions: {
    async loginWithEmail(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        return userCredential.user;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
  },
});
