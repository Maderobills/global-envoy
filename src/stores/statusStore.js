import { defineStore } from 'pinia';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';
// Initialize Firestore
const db = getFirestore(firebaseApp);
export const useTrackStore = defineStore('trackStore', {
  state: () => ({
    dataDoc: null, // Store the entire document
    packageDetails: [], // Specifically store PackageDetails
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchTrackingData(docPath) {
      this.isLoading = true;
      this.error = null;

      try {
        // Create a document reference using the doc path
        const docRef = doc(db, docPath);

        // Fetch the document data
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          this.dataDoc = data; // Store the entire document
          this.packageDetails = data.PackageDetails || []; // Extract and store PackageDetails
        } else {
          throw new Error('Document does not exist.');
        }
      } catch (err) {
        this.error = err.message;
        console.error('Error fetching tracking data:', err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});