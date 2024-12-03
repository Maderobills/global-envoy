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
import Swal from "sweetalert2";


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

const firebaseStore = useFirebaseStore();

const user = computed(() => firebaseStore.user);
const isLoggedIn = computed(() => !!user.value?.uid);
const userId = computed(() => user.value?.uid);

const validateDestinationStore = () => {
  const { toCountry, toCity, fromCountry, fromCity } = destinationStore.formData;

  if (!toCountry || !toCity || !fromCountry || !fromCity) {
    throw new Error("Please complete all fields in the destination form.");
  }

  if (toCountry === fromCountry && toCity === fromCity) {
    throw new Error("Destination and origin cannot be the same.");
  }
};

const validatePackageStore = () => {
  const { packageType, description, width, length, weight, height } = packageStore.formData;

  if (!packageType || !description || !width || !length || !weight || !height) {
    throw new Error("Please complete all fields in the package form.");
  }

  if (width <= 0 || length <= 0 || height <= 0 || weight <= 0) {
    throw new Error("Package dimensions and weight must be positive values.");
  }
};


const handleSubmit = async () => {
  try {
    // Validate form data
    validateDestinationStore();
    validatePackageStore();

    // Format the current date and time
    const shipmentDate = new Date().toLocaleString();

    // Construct destination and origin addresses
    const destinationAddress =
      `${destinationStore.formData.toCountry}, ${destinationStore.formData.toCity}`;
    const originAddress =
      `${destinationStore.formData.fromCountry}, ${destinationStore.formData.fromCity}`;

    // Extract other data
    const estimateDeliveryDate = calcStore.quote.deliveryDate;
    const trackingNumbers = shipmentId;

    // Construct the shipment data object
    const shipmentData = {
      shipmentId,
      destinationAddress,
      originAddress,
      shipmentDate,
      estimateDeliveryDate,
    };

    // Construct package details
    const PackageDetails = {
      packageType: packageStore.formData.packageType,
      description: packageStore.formData.description,
      width: packageStore.formData.width,
      length: packageStore.formData.length,
      weight: packageStore.formData.weight,
      height: packageStore.formData.height,
    };

    // Construct tracking status
    const pendingPackage = {
      location: "Order awaiting approval",
      note: "Processing",
      date: shipmentDate,
      status: "pending",
    };

    const trackingStatus = {
      PackageDetails,
      pendingPackage,
    };

    console.log("Data to be saved:", { shipmentData, trackingStatus });

    // Check user login state and save to appropriate Firestore path
    if (!userId.value) {
      // Save to global tracking collection if user is not logged in
      const docRall = doc(db, `Tracking/${shipmentId}`);
      const docRefall = doc(db, `Tracking/${shipmentId}/Shipments/${shipmentId}`);
      const docTrackall = doc(
        db,
        `Tracking/${shipmentId}/Shipments/${shipmentId}/Tracking/${shipmentId}`
      );

      await setDoc(docRall, { trackingNumbers: arrayUnion(trackingNumbers) }, { merge: true });
      await setDoc(docRefall, shipmentData, { merge: true });
      await setDoc(docTrackall, trackingStatus, { merge: true });
    } else {
      // Save to user-specific tracking collection
      const docR = doc(db, `Users/${userId.value}`);
      const docRef = doc(db, `Users/${userId.value}/Shipments/${shipmentId}`);
      const docTrack = doc(
        db,
        `Users/${userId.value}/Shipments/${shipmentId}/Tracking/${shipmentId}`
      );

      await setDoc(docR, { trackingNumbers: arrayUnion(trackingNumbers) }, { merge: true });
      await setDoc(docRef, shipmentData, { merge: true });
      await setDoc(docTrack, trackingStatus, { merge: true });
    }

    // Show success alert using SweetAlert2
    await Swal.fire({
      icon: 'success',
      title: 'Shipment created successfully!',
      html: `Please copy your tracking number: <strong>${trackingNumbers}</strong>`,
      showCancelButton: true,
      confirmButtonText: 'Copy Tracking Number',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        // Copy the tracking number to clipboard
        navigator.clipboard.writeText(trackingNumbers).then(() => {
          Swal.fire('Copied!', 'Tracking number has been copied to clipboard.', 'success');
        }).catch((err) => {
          Swal.fire('Error', 'Failed to copy tracking number. Please copy it manually.', 'error');
        });
      }
    });

    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error submitting form:", error.message);

    // Show error alert using SweetAlert2
    await Swal.fire({
      icon: 'error',
      title: 'Submission failed!',
      text: `An error occurred: ${error.message}`,
    });
  }
};


</script>
