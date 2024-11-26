import { defineStore } from 'pinia';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';

// Initialize Firestore
const db = getFirestore(firebaseApp);

export const useDataUsersStore = defineStore('dataUsers', {
  state: () => ({
    users: [], // Stores the fetched user data
    loading: false, // Tracks loading state
    error: null, // Tracks any errors
  }),

  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;

      try {
        const querySnapshot = await getDocs(collection(db, 'Users'));
        this.users = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (err) {
        this.error = err.message || 'Failed to fetch users';
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    userFullNames: state => state.users.map(user => `${user.firstName} ${user.lastName}`),
  },
});
