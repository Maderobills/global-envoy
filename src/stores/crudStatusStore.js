import { defineStore } from 'pinia';
import { getDoc, doc, setDoc, updateDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';

// Initialize Firestore
const db = getFirestore(firebaseApp);

export const useTrackStore = defineStore('trackStore', {
  state: () => ({
    content: null,
    packageId: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTrackingData(docPath) {
      this.loading = true;
      this.error = null;

      const docRef = doc(db, docPath);

      try {
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error('No such document!');
        }

        // Fetch and set the data
        const data = docSnap.data();
        this.content = data;
        this.packageId = data.PackageDetails?.packageId || null; // Optional chaining

        console.log('Fetched data:', data); // Log the fetched data
      } catch (err) {
        this.error = err.message || 'An error occurred while fetching tracking data.';
        console.error('Error fetching tracking data:', err);
      } finally {
        this.loading = false;
      }
    },
    async updateTrackingData(docPath, updateData) {
      this.loading = true;
      this.error = null;
    
      const docRef = doc(db, docPath);
    
      try {
        await updateDoc(docRef, updateData);
        console.log('Document updated:', updateData);
    
        // Optionally fetch the updated data
        await this.fetchTrackingData(docPath);
      } catch (err) {
        this.error = err.message || 'An error occurred while updating tracking data.';
        console.error('Error updating tracking data:', err);
      } finally {
        this.loading = false;
      }
    },
        
    async setTrackingData(docPath, newData) {
      this.loading = true;
      this.error = null;

      const docRef = doc(db, docPath);

      try {
        await setDoc(docRef, newData);
        console.log('Document set:', newData);

        // Optionally fetch the newly set data
        await this.fetchTrackingData(docPath);
      } catch (err) {
        this.error = err.message || 'An error occurred while setting tracking data.';
        console.error('Error setting tracking data:', err);
      } finally {
        this.loading = false;
      }
    },
  },
});
