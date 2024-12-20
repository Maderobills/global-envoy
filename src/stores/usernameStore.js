import { defineStore } from 'pinia';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';

const db = getFirestore(firebaseApp);
const CACHE_KEY = 'usersCache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useDataUsersStore = defineStore('dataUsers', {
  state: () => {
    // Load cached data from localStorage
    const cached = localStorage.getItem(CACHE_KEY);
    const initialState = cached ? JSON.parse(cached) : null;

    return {
      users: initialState?.users || [],
      loading: false,
      error: null,
      lastFetched: initialState?.lastFetched || null,
    };
  },

  actions: {
    async fetchUsers(forceRefetch = true) { // Changed from 'forceRefresh' to 'forceRefetch'
      // Check cache validity
      if (!forceRefetch && this.lastFetched) {
        const cacheAge = Date.now() - this.lastFetched;
        if (cacheAge < CACHE_DURATION) {
          console.log('Using cached users data');
          return;
        }
      }

      this.loading = true;
      this.error = null;

      try {
        // Fetch data from the 'Tracking' collection
        const querySnapshot1 = await getDocs(collection(db, 'Tracking'));
        const newUsersFromTracking = querySnapshot1.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch data from the 'Users' collection
        const querySnapshot2 = await getDocs(collection(db, 'Users'));
        const newUsersFromUsers = querySnapshot2.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Merge new users from both collections
        const validUsers = this.users.filter(user => user && user.id); // Ensure users in state are valid
        const userMap = new Map([
          ...validUsers.map(user => [user.id, user]),
          ...newUsersFromTracking
            .filter(user => user && user.id)
            .map(user => [user.id, user]),
          ...newUsersFromUsers
            .filter(user => user && user.id)
            .map(user => [user.id, user]),
        ]);

        this.users = Array.from(userMap.values());
        console.log("New users from tracking:", newUsersFromTracking);
        console.log("New users from users:", newUsersFromUsers);

        // Update lastFetched timestamp and cache
        this.lastFetched = Date.now();
        this.cacheUsers();
      } catch (err) {
        this.error = err.message || 'Failed to fetch users';
        console.error('Error fetching users:', err);
      } finally {
        this.loading = false;
      }
    },

    cacheUsers() {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          users: this.users,
          lastFetched: this.lastFetched,
        }));
      } catch (err) {
        console.error('Error caching users data:', err);
      }
    },

    clearCache() {
      try {
        localStorage.removeItem(CACHE_KEY);
        this.users = [];
        this.lastFetched = null;
      } catch (err) {
        console.error('Error clearing users cache:', err);
      }
    }
  },

  getters: {
    userFullNames: state => state.users.map(user => {
      // Check if user is defined before accessing properties
      if (!user) {
        return ''; // Or handle this case appropriately
      }

      const firstName = user.firstName || '';
      const lastName = user.lastName || '';
      return `${firstName} ${lastName}`.trim();
    }),

    getUserById: state => id => state.users.find(user => user.id === id),

    getCachedStatus: state => ({
      hasCachedData: state.users.length > 0,
      lastFetched: state.lastFetched,
      cacheAge: state.lastFetched ? Date.now() - state.lastFetched : null,
    })
  },
});
