<template>
  <div class="space-y-6">
    <!-- Card Number Section -->
    <div>
      <label class="block text-sm font-medium mb-2">Card Number</label>
      <div id="card-element" class="w-full p-3 border rounded">
        <!-- Stripe Card Element will be mounted here -->
      </div>
      <p v-if="paymentError" class="text-red-500 text-sm mt-1">
        {{ paymentError }}
      </p>
    </div>

    <div class="flex flex-col sm:flex-row justify-between gap-4">
      <button
        @click="handleReset"
        class="bg-gray-500 text-white py-3 px-6 rounded hover:bg-gray-600 transition-colors w-full sm:w-auto"
        :disabled="isLoading"
      >
        Reset
      </button>

      <button
        @click="handleSubmit"
        class="bg-emerald-500 text-white py-3 px-6 rounded hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="flex items-center justify-center">
          <span class="inline-block animate-spin mr-2">⟳</span>
          <span>Submitting...</span>
        </span>
        <span v-else>Submit</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/firebase";

// Import stores and helpers
import { useDestinationStore } from "@/stores/destinationStore";
import { usePackageStore } from "@/stores/packageStore";
import { useAdditionalStore } from "@/stores/additionalStore";
import { useShipmentStore } from "@/stores/shipmentStore";
import { useCalcStore } from "@/stores/calcStore";
import { useFirebaseStore } from "@/stores/firebaseStore";
import { useCreditCardStore } from "@/stores/paymentStore";
import { generateTrackingNumber } from "@/stores/trackGenerator";

const db = getFirestore(firebaseApp);
const router = useRouter();

const isLoading = ref(false);
const paymentError = ref("");

// Stores
const creditCardStore = useCreditCardStore();
const destinationStore = useDestinationStore();
const packageStore = usePackageStore();
const additionalStore = useAdditionalStore();
const shipmentStore = useShipmentStore();
const calcStore = useCalcStore();
const firebaseStore = useFirebaseStore();

// User-related properties
const user = computed(() => firebaseStore.user);
const isLoggedIn = computed(() => !!user.value?.uid);
const userId = computed(() => user.value?.uid);

// Generate tracking numbers
const shipmentId = generateTrackingNumber({ prefix: "GLO", length: 15 });
const customerId = generateTrackingNumber({ prefix: "GLO", length: 8 });

// Validation functions
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

// Mount Stripe Card Element
onMounted(() => {
  creditCardStore.initializeStripe("card-element");
});

// Handle form submission
const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // Validate inputs
    validateDestinationStore();
    validatePackageStore();

    const shipmentDate = new Date().toLocaleString();
    const destinationAddress = `${destinationStore.formData.toCountry}, ${destinationStore.formData.toCity}`;
    const originAddress = `${destinationStore.formData.fromCountry}, ${destinationStore.formData.fromCity}`;
    const estimateDeliveryDate = calcStore.quote.deliveryDate;
    const trackingNumbers = shipmentId;

    const shipmentData = {
      shipmentId,
      customerId,
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
      location: "ORDER AWAITING APPROVAL",
      note: "PROCEESSING",
      date: shipmentDate,
      status: "PENDING",
    };

    const trackingStatus = {
      PackageDetails,
      pendingPackage,
    };

    const token = await creditCardStore.validateCard();
    if (!token) throw new Error("Card validation failed. Please check your card details.");

    const paymentData = {
      paymentMethodId: token.id,
      amount: parseFloat(calcStore.quote.totalCost),
      currency: "usd",
      status: "pending",
      timestamp: shipmentDate,
    };

    // Firestore operations
    if (!userId.value) {
      // Global tracking collection
      await setDoc(doc(db, `Tracking/${shipmentId}`), {
        firstName: customerId,
        lastName: customerId,
        uid: trackingNumbers,
        trackingNumbers: arrayUnion(trackingNumbers),
      }, { merge: true });

      await setDoc(doc(db, `Tracking/${shipmentId}/Shipments/${shipmentId}`), shipmentData, { merge: true });
      await setDoc(doc(db, `Tracking/${shipmentId}/Payments/${shipmentId}`), paymentData, { merge: true });
      await setDoc(doc(db, `Tracking/${shipmentId}/Shipments/${shipmentId}/Tracking/${shipmentId}`), trackingStatus, { merge: true });
    } else {
      // User-specific tracking collection
      await setDoc(doc(db, `Users/${userId.value}`), {
        trackingNumbers: arrayUnion(trackingNumbers),
      }, { merge: true });

      await setDoc(doc(db, `Users/${userId.value}/Shipments/${shipmentId}`), shipmentData, { merge: true });
      await setDoc(doc(db, `Users/${userId.value}/Shipments/${shipmentId}/Payments/${shipmentId}`), paymentData, { merge: true });
      await setDoc(doc(db, `Users/${userId.value}/Shipments/${shipmentId}/Tracking/${shipmentId}`), trackingStatus, { merge: true });
    }

    await Swal.fire({
      icon: "success",
      title: "Shipment created successfully!",
      html: `Tracking Number: <strong>${trackingNumbers}</strong>`,
      confirmButtonText: "Copy Tracking Number",
    }).then(() => navigator.clipboard.writeText(trackingNumbers));

    router.push("/TrackPackage");
  } catch (error) {
    Swal.fire({ icon: "error", title: "Submission Failed", text: error.message });
  } finally {
    isLoading.value = false;
  }
};
</script>
