import { defineStore } from 'pinia';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';

// Initialize Firestore
const db = getFirestore(firebaseApp);
const UUID = "Id2ZY2f1xEepqCp9CcnFcQ79gFi2"; // Your specific user UUID

export const useShipmentStore = defineStore('shipment', {
  state: () => ({
    shipments: [],
  }),
  actions: {
    // Fetch shipments based on trackingNumber
    async fetchShipments(trackingNumber = '') {
      try {
        const shipmentsCollection = collection(db, "Users", UUID, 'Shipments');
        let shipmentsQuery;

        if (trackingNumber) {
          // Use startAt/endAt for partial matching
          shipmentsQuery = query(
            shipmentsCollection, 
            where("trackingNumber", ">=", trackingNumber),
            where("trackingNumber", "<=", trackingNumber + '\uf8ff')
          );
        } else {
          // If no tracking number, fetch all shipments
          shipmentsQuery = shipmentsCollection;
        }

        const snapshot = await getDocs(shipmentsQuery);

        this.shipments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching shipments:', error);
        this.shipments = [];
      }
    },

    // Add a new shipment
    async addShipment(shipment) {
      try {
        const shipmentsCollection = collection(db, "Users", UUID, 'Shipments');
        const docRef = await addDoc(shipmentsCollection, shipment);
        this.shipments.push({ id: docRef.id, ...shipment });
      } catch (error) {
        console.error('Error adding shipment:', error);
      }
    },
  },
});