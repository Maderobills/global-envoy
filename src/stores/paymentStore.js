// stores/creditCardStore.js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCreditCardStore = defineStore('creditCard', () => {
  // State
  const formData = ref({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const errors = ref({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  // Getters
  const isValid = computed(() => {
    return !errors.value.cardNumber && !errors.value.expiryDate && !errors.value.cvv
  })

  // Helper functions
  function luhnCheck(cardNumber) {
    const digits = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }

    return parts.join(' ');
  }

  function formatExpiryDate(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  }

  // Actions
  function validateForm() {
    errors.value = {
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }

    // Validate Card Number
    const cardNumber = formData.value.cardNumber.replace(/\s/g, '');
    if (!cardNumber) {
      errors.value.cardNumber = 'Card number is required';
    } else if (!/^\d{13,19}$/.test(cardNumber)) {
      errors.value.cardNumber = 'Card number must be between 13 and 19 digits';
    } else if (!luhnCheck(cardNumber)) {
      errors.value.cardNumber = 'Invalid card number';
    }

    // Validate Expiry Date
    const expiry = formData.value.expiryDate;
    if (!expiry) {
      errors.value.expiryDate = 'Expiry date is required';
    } else {
      const [month, year] = expiry.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        errors.value.expiryDate = 'Use MM/YY format';
      } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        errors.value.expiryDate = 'Invalid month';
      } else if (
        parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        errors.value.expiryDate = 'Card has expired';
      }
    }

    // Validate CVV
    if (!formData.value.cvv) {
      errors.value.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.value.cvv)) {
      errors.value.cvv = 'CVV must be 3 or 4 digits';
    }

    return isValid.value;
  }

  function updateField(field, value) {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    formData.value[field] = formattedValue;
    errors.value[field] = '';
  }

  function resetForm() {
    formData.value = {
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
    errors.value = {
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  }

  return {
    formData,
    errors,
    isValid,
    validateForm,
    updateField,
    resetForm
  }
})