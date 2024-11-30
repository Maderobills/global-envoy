import { defineStore } from 'pinia';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';

const db = getFirestore(firebaseApp);
const CACHE_KEY = 'usersCache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useDataUsersStore = defineStore('dataUsers', {
  state: () => {
    // Try to load cached data from localStorage
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
    async fetchUsers(forceRefresh = false) {
      // Check if we have recently cached data
      if (!forceRefresh && this.lastFetched) {
        const cacheAge = Date.now() - this.lastFetched;
        if (cacheAge < CACHE_DURATION) {
          console.log('Using cached users data');
          return;
        }
      }

      this.loading = true;
      this.error = null;

      try {
        const querySnapshot = await getDocs(collection(db, 'Users'));
        this.users = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Update lastFetched timestamp
        this.lastFetched = Date.now();
        
        // Cache the fetched data
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
    userFullNames: state => state.users.map(user => `${user.firstName} ${user.lastName}`),
    
    getUserById: state => id => state.users.find(user => user.id === id),
    
    getCachedStatus: state => ({
      hasCachedData: state.users.length > 0,
      lastFetched: state.lastFetched,
      cacheAge: state.lastFetched ? Date.now() - state.lastFetched : null,
    })
  },
});