// src/stores/calcStore.js
import { defineStore } from 'pinia';

// Example rates and country adjustments (similar to previous implementation)
const shippingRates = {
  'Box': 5,  // rate per kg for Box
  'Pallet': 10, // rate per kg for Pallet
  'Document': 2,  // rate per kg for Document
};

const countryAdjustments = {
    // Existing adjustments
    'United States': 1.1,    // 10% additional cost
    'Canada': 1.05,         // 5% additional cost
    'Germany': 1.2,         // 20% additional cost
  
    // Western Europe (higher costs)
    'United Kingdom': 1.15,  // 15% additional cost
    'France': 1.15,
    'Italy': 1.15,
    'Spain': 1.15,
    'Netherlands': 1.15,
    'Belgium': 1.15,
    'Switzerland': 1.25,    // 25% additional cost (high cost of living)
    'Austria': 1.15,
    'Ireland': 1.15,
    'Luxembourg': 1.2,
    'Monaco': 1.25,
    'Norway': 1.2,
    'Sweden': 1.15,
    'Denmark': 1.15,
    'Finland': 1.15,
    'Iceland': 1.15,
  
    // Asia Pacific Developed
    'Japan': 1.15,
    'South Korea': 1.1,
    'Singapore': 1.15,
    'Australia': 1.1,
    'New Zealand': 1.1,
  
    // Eastern Europe (moderate adjustments)
    'Poland': 1.05,
    'Hungary': 1.05,
    'Czech Republic': 1.05,
    'Slovakia': 1.05,
    'Slovenia': 1.05,
    'Croatia': 1.05,
    'Estonia': 1.05,
    'Latvia': 1.05,
    'Lithuania': 1.05,
    'Romania': 1.03,
    'Bulgaria': 1.03,
  
    // Middle East
    'United Arab Emirates': 1.1,
    'Saudi Arabia': 1.1,
    'Qatar': 1.15,
    'Kuwait': 1.1,
    'Bahrain': 1.1,
    'Oman': 1.05,
    'Israel': 1.1,
  
    // BRICS and Large Emerging Markets
    'China': 1.05,
    'India': 1.02,
    'Brazil': 1.05,
    'Russia': 1.05,
    'South Africa': 1.03,
    'Mexico': 1.05,
    'Indonesia': 1.02,
    'Turkey': 1.03,
  
    // Rest of Asia (default lower adjustments)
    'Thailand': 1.02,
    'Vietnam': 1.02,
    'Malaysia': 1.03,
    'Philippines': 1.02,
    'Pakistan': 1.01,
    'Bangladesh': 1.01,
    'Sri Lanka': 1.01,
    'Nepal': 1.01,
    'Cambodia': 1.01,
    'Myanmar': 1.01,
    'Laos': 1.01,
    'Mongolia': 1.01,
  
    // South & Central America
    'Argentina': 1.03,
    'Chile': 1.05,
    'Colombia': 1.02,
    'Peru': 1.02,
    'Venezuela': 1.01,
    'Uruguay': 1.03,
    'Paraguay': 1.02,
    'Bolivia': 1.01,
    'Ecuador': 1.02,
    'Panama': 1.03,
    'Costa Rica': 1.03,
  
    // Africa (generally lower adjustments due to development levels)
    'Nigeria': 1.02,
    'Kenya': 1.01,
    'Ghana': 1.01,
    'Ethiopia': 1.01,
    'Tanzania': 1.01,
    'Uganda': 1.01,
    'Rwanda': 1.01,
    'Senegal': 1.01,
    'Ivory Coast': 1.01,
    'Morocco': 1.02,
    'Egypt': 1.02,
  };

  export const useCalcStore = defineStore('calcStore', {
    state: () => ({
      originCountry: '',
      destinationCountry: '',
      packageType: 'Box',
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      quote: {
        totalPrice: '0.00',
        deliveryDate: ''
      }
    }),
  
    actions: {
      calculateBasePrice() {
        // Ensure all numbers are valid
        if (!this.weight || isNaN(this.weight) || this.weight <= 0) {
          return 0;
        }
  
        const baseRate = shippingRates[this.packageType] || 0;
        const destAdjustment = countryAdjustments[this.destinationCountry] || 1;
        const originAdjustment = countryAdjustments[this.originCountry] || 1;
  
        return Number(baseRate) * Number(this.weight) * Number(destAdjustment) * Number(originAdjustment);
      },
  
      calculateDeliveryDate() {
        const estimatedDays = 7;
        const randomDelay = Math.floor(Math.random() * 5);
        return new Date(Date.now() + (estimatedDays + randomDelay) * 24 * 60 * 60 * 1000);
      },
  
      calculateQuote() {
        // Validate and convert input values to numbers
        const length = Math.max(0, Number(this.length) || 0);
        const width = Math.max(0, Number(this.width) || 0);
        const height = Math.max(0, Number(this.height) || 0);
        const weight = Math.max(0, Number(this.weight) || 0);
      
        try {
          // Validate required inputs before calculation
          if (!this.originCountry || !this.destinationCountry) {
            throw new Error('Origin and destination countries are required');
          }
      
          // Calculate base shipping price with country adjustments
          const basePrice = this.calculateBasePrice();
          console.log('Base Price:', basePrice);
          
          // Calculate volumetric weight
          const volumetricWeight = (this.length * this.width * this.height) / 5000;
          console.log('Volumetric Weight:', volumetricWeight);
          
          // Calculate final weight (max of actual weight and volumetric weight)
          const finalWeight = Math.max(this.weight, volumetricWeight);
          console.log('Final Weight:', finalWeight);
          
          // Calculate shipping cost (using a multiplier of 2)
          const shippingCost = finalWeight * 2;
          console.log('Shipping Cost:', shippingCost);
          
          // Calculate insurance cost (10% of base price)
          const insuranceCost = basePrice * 0.1;
          console.log('Insurance Cost:', insuranceCost);
          
          // Calculate subtotal (base price + shipping cost + insurance cost)
          const subtotal = basePrice + shippingCost + insuranceCost;
          console.log('Subtotal:', subtotal);
          
          // Calculate total price including tax
          const totalPrice = subtotal;
          console.log('Total Price:', totalPrice);
          
          
          // Update quote with validated values
          this.quote = {
            totalPrice: Number(totalPrice).toFixed(2),
            deliveryDate: this.calculateDeliveryDate().toLocaleDateString()
          };
        } catch (error) {
          console.error('Quote calculation error:', error);
          this.quote = {
            totalPrice: '0.00',
            deliveryDate: ''
          };
        }
      }
    }
  });