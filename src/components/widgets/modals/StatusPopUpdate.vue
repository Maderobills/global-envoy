<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <main>
            <StatusForm :uid="uid" :trackingNum="trackingNum"/>
        </main>
        <button @click="close">Close</button>

      </div>
    </div>
  </template>
  
  <script setup>
import { defineProps, defineEmits, defineOptions } from 'vue';
import StatusForm from '../forms/StatusFormUpdate.vue';
  
  const props = defineProps({
    uid: String,
    trackingNum: String,
  });
  
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
  defineOptions({
  name: 'StatusPopUpdate'
});
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  </style>