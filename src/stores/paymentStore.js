import { defineStore } from "pinia";
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe
import { reactive } from "vue";

// Create a store to manage credit card state and logic
export const useCreditCardStore = defineStore("paymentStore", {
  state: () => ({
    stripe: null, // Will hold the Stripe instance
    cardElement: null, // Will hold the card element
    error: null, // To hold validation error messages
    paymentMethodId: null, // The payment method ID (from Stripe)
  }),

  actions: {
    // Initialize Stripe and Stripe Elements
    async initializeStripe() {
      const stripe = await loadStripe("pk_test_51QTBCuGRH1ABoQcEIR4cQiRAkiMHflDo5xRHLbLQCoDX6KH9HZIzZw2mH22Z29ctf10WakXLtEjk8ZdR8RrbnPaK00L1hB6X7I"); // Replace with your Stripe public key
      if (!stripe) {
        this.error = "Stripe failed to load.";
        return;
      }

      // Create an instance of Elements
      const elements = stripe.elements();

      // Create an instance of the Card Element and mount it to the DOM
      this.cardElement = elements.create("card");
      this.cardElement.mount("#card-element"); // Ensure this element exists in your template

      this.stripe = stripe; // Store the stripe instance in the store
    },

    // Validate the credit card details
    async validateCard() {
      if (!this.stripe || !this.cardElement) {
        this.error = "Stripe is not initialized properly.";
        return;
      }

      // Use Stripe to create a payment method (this validates the card)
      const { token, error } = await this.stripe.createToken(this.cardElement);

      if (error) {
        this.error = error.message; // Set the error from Stripe
        return;
      }

      // Successfully validated card and got a token
      this.paymentMethodId = token.id; // Store the token ID or the payment method ID
      return token;
    },

    // Example: Handle the form submission and validation
    async handleSubmit() {
      try {
        // Validate card information with Stripe
        const token = await this.validateCard();
        
        if (!token) {
          throw new Error("Card validation failed.");
        }

        // Proceed with your backend API call to process payment, pass token.id to the backend
        console.log("Card validated. Token:", token.id);
        
        // Proceed with payment processing on your server
        // You can send token.id to your backend for further processing (e.g., charge the card)
        
      } catch (error) {
        console.error("Payment validation failed:", error);
        this.error = error.message || "An error occurred during payment validation.";
      }
    }
  },

  getters: {
    getPaymentError: (state) => state.error,
  },
});
