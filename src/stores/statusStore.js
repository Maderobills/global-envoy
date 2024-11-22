import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

export const useStatusStore = defineStore('status', () => {
  const packagingData = ref({});

  const fetchPackagingData = async () => {
    const db = getDatabase();
    const path = '/Users/Id2ZY2f1xEepqCp9CcnFcQ79gFi2/Shipments/Id2ZY2f1xEepqCp9CcnFcQ79gFi2/Tracking/12345678/';
    const packagingRef = dbRef(db, path);
    
    onValue(packagingRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        packagingData.value = Object.entries(data).map(([packaging, status]) => ({
          location,
          packaging,
          status,
        }));
      } else {
        console.log('No data available');
      }
    }, {
      onlyOnce: true // Fetch data only once
    });
  };

  return {
    packagingData,
    fetchPackagingData,
  };
});