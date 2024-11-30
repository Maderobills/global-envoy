import { defineStore } from "pinia";
import { firebaseApp } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const useFirebaseStore = defineStore("firebaseStore", {
  state: () => {
    // Try to load persisted state from localStorage
    const savedUser = localStorage.getItem('userData');
    return {
      user: savedUser ? JSON.parse(savedUser) : {
        uid: "",
        firstName: "Guest",
        lastName: "User",
      },
      initialized: false
    };
  },

  actions: {
    async initializeAuthListener() {
      if (this.initialized) return;
      
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // User is signed in
            const userProfile = await this.getUserProfile(firebaseUser.uid);
            this.updateUserState({
              uid: firebaseUser.uid,
              firstName: userProfile.firstName || "User",
              lastName: userProfile.lastName || "User",
              ...userProfile // Include other profile data
            });
          } else {
            // User is signed out
            this.updateUserState({
              uid: "",
              firstName: "Guest",
              lastName: "User"
            });
          }
          this.initialized = true;
          resolve();
        });
      });
    },

    updateUserState(userData) {
      this.user = userData;
      // Persist to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
    },

    async loginWithEmail(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const userProfile = await this.getUserProfile(user.uid);
        const userData = {
          uid: user.uid,
          firstName: userProfile.firstName || "User",
          lastName: userProfile.lastName || "User",
          ...userProfile
        };
        
        this.updateUserState(userData);
        console.log("User logged in:", this.user);
        return this.user;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },

    async signUpWithEmail(email, password, userProfile) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "Users", user.uid), {
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          appellation: userProfile.appellation,
          firm: userProfile.firm,
          countryCode: userProfile.countryCode,
          contactNumber: userProfile.contactNumber,
          email: userProfile.email,
        });

        const userData = {
          uid: user.uid,
          ...userProfile
        };
        
        this.updateUserState(userData);
        console.log("User signed up:", this.user);
        return this.user;
      } catch (error) {
        console.error("Sign up error:", error);
        throw error;
      }
    },

    async getUserProfile(uid) {
      const docRef = doc(db, "Users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return {};
      }
    },

    async signOut() {
      try {
        await auth.signOut();
        this.updateUserState({
          uid: "",
          firstName: "Guest",
          lastName: "User"
        });
      } catch (error) {
        console.error("Sign out error:", error);
        throw error;
      }
    },
  },
});