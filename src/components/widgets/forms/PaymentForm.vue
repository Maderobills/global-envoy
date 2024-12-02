<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium mb-2">Card Number</label>
      <input
        :value="store.formData.cardNumber"
        @input="store.updateField('cardNumber', $event.target.value)"
        type="text"
        maxlength="19"
        class="w-full p-3 border rounded"
        :class="{ 'border-red-500': store.errors.cardNumber }"
        placeholder="**** **** **** ****"
      />
      <p v-if="store.errors.cardNumber" class="text-red-500 text-sm mt-1">
        {{ store.errors.cardNumber }}
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2">Expiry Date</label>
        <input
          :value="store.formData.expiryDate"
          @input="store.updateField('expiryDate', $event.target.value)"
          type="text"
          maxlength="5"
          class="w-full p-3 border rounded"
          :class="{ 'border-red-500': store.errors.expiryDate }"
          placeholder="MM/YY"
        />
        <p v-if="store.errors.expiryDate" class="text-red-500 text-sm mt-1">
          {{ store.errors.expiryDate }}
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">CVV</label>
        <input
          :value="store.formData.cvv"
          @input="store.updateField('cvv', $event.target.value)"
          type="text"
          maxlength="4"
          class="w-full p-3 border rounded"
          :class="{ 'border-red-500': store.errors.cvv }"
          placeholder="***"
        />
        <p v-if="store.errors.cvv" class="text-red-500 text-sm mt-1">
          {{ store.errors.cvv }}
        </p>
      </div>
    </div>

    <div class="flex space-x-4">
      <div class="w-full flex justify-between gap-4">
        <button
          @click="store.resetForm"
          class="bg-gray-500 text-white py-3 px-6 rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button
          @click="handleSubmit"
          class="bg-emerald-500 text-white py-3 px-6 rounded hover:bg-emerald-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCreditCardStore } from "@/stores/paymentStore";
import { useDestinationStore } from "@/stores/destinationStore";
import { usePackageStore } from "@/stores/packageStore";
import { useAdditionalStore } from "@/stores/additionalStore";
import { useShipmentStore } from "@/stores/shipmentStore";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/firebase";
import { useCalcStore } from "@/stores/calcStore";
import { generateTrackingNumber } from "@/stores/trackGenerator.js";
import { computed } from "vue";
import { useFirebaseStore } from "@/stores/firebaseStore";

const db = getFirestore(firebaseApp);
const store = useCreditCardStore();
const destinationStore = useDestinationStore();
const packageStore = usePackageStore();
const additionalStore = useAdditionalStore();
const shipmentStore = useShipmentStore();
const calcStore = useCalcStore();

const shipmentId = generateTrackingNumber({
  prefix: "GLO", // Custom prefix for shipment ID
  length: 15, // Custom length for the tracking number
});

const firebaseStore = useFirebaseStore()


const user = computed(() => firebaseStore.user)
const isLoggedIn = computed(() => user.value?.uid)
const userId = user.value?.uid

const handleSubmit = async () => {
  try {
    // Extract the required fields
    const destinationAddress =
      destinationStore.formData.toCountry +
      ", " +
      destinationStore.formData.fromCity;
    const originAddress =
      destinationStore.formData.fromCountry +
      ", " +
      destinationStore.formData.toCity;
    const shipmentDate = new Date().toLocaleString();
    const estimateDeliveryDate = calcStore.quote.deliveryDate;

    const trackingNumbers = shipmentId;

    const shipmentData = {
      shipmentId,
      destinationAddress,
      originAddress,
      shipmentDate,
      estimateDeliveryDate,
    };

    const PackageDetails = {
  packageType: packageStore.formData.packageType,
  description: packageStore.formData.description,
  width: packageStore.formData.width,
  length: packageStore.formData.length,
  weight: packageStore.formData.weight,
  height: packageStore.formData.height,
};

const pendingPackage = {
  location: "Order awaiting approval",
  note: "proccessing",
  date: shipmentDate,
  status: "pending",
};

const trackingStatus = {
  PackageDetails,
  pendingPackage,
};





    console.log("Data to be saved:", shipmentData);

    const docR = doc(db, `Users/${userId}`);
    await setDoc(
      docR,
      { trackingNumbers: arrayUnion(trackingNumbers) }, // Add to the list
      { merge: true } // Merge with existing fields
    );
    // Save the data to Firestore
    const docRef = doc(db, `Users/${userId}/Shipments/${shipmentId}`);
    await setDoc(docRef, shipmentData, { merge: true });

    const docTrack = doc(db, `Users/${userId}/Shipments/${shipmentId}/Tracking/${shipmentId}`);
    await setDoc(docTrack, trackingStatus, { merge: true });

    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error submitting form:", error.message);
  }
};
</script>
