import { defineStore } from "pinia";
import { firebaseApp } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); // Initialize Firestore

export const useFirebaseStore = defineStore("firebaseStore", {
  state: () => ({
    user: {
      firstName: "Guest", // Default value
      lastName: "User", // Default value
    },
  }),
  actions: {
    async loginWithEmail(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Fetch user profile data from Firestore
        const userProfile = await this.getUserProfile(user.uid);
        this.user.firstName = userProfile.firstName || "User"; // Update firstName
        this.user.lastName = userProfile.lastName || "User"; // Update lastName

        console.log("User logged in:", this.user);
        return this.user; // Return the user object
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

        // Save user profile data to Firestore
        await setDoc(doc(db, "Users", user.uid), {
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          appellation: userProfile.appellation,
          firm: userProfile.firm,
          countryCode: userProfile.countryCode,
          contactNumber: userProfile.contactNumber,
          email: userProfile.email,
          // Add any other fields you want to store
        });

        // Update local user state
        this.user.firstName = userProfile.firstName;
        this.user.lastName = userProfile.lastName;

        console.log("User signed up:", this.user);
        return this.user; // Return the user object
      } catch (error) {
        console.error("Sign up error:", error);
        throw error;
      }
    },

    async getUserProfile(uid) {
      const docRef = doc(db, "Users", uid); // Adjust 'Users' to your Firestore collection name
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data(); // Assuming this contains { firstName, lastName, ... }
      } else {
        console.log("No such document!");
        return {};
      }
    },
  },
});
