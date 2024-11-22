// src/stores/shipmentStore.js
import { defineStore } from 'pinia';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';

// Initialize Firestore
const db = getFirestore(firebaseApp);

export const useShipmentStore = defineStore('shipment', {
    state: () => ({
        shipmentData: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchShipmentData(userId, shipmentId) {
            this.loading = true;
            this.error = null;

            try {
                const docRef = doc(db, `Users/${userId}/Shipments/${shipmentId}`);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.shipmentData = docSnap.data();
                } else {
                    this.error = 'No such document!';
                }
            } catch (err) {
                this.error = `Error fetching shipment data: ${err.message}`;
            } finally {
                this.loading = false;
            }
        },
    },
});