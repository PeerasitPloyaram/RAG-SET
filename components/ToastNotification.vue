<template>
    <div v-if="isActive" class="absolute top-6 right-8 rounded-lg bg-white p-5 shadow-lg overflow-hidden transition-all duration-500 ease-out">
      <div class="toast-content flex items-center">
        <!-- Icon -->
        <i class="fas fa-solid fa-check check bg-blue-600 text-white text-lg rounded-full flex items-center justify-center h-9 w-9"></i>
        
        <!-- Message content -->
        <div class="message ml-5 flex flex-col">
          <span class="text text-1 font-semibold text-gray-800">{{ title }}</span>
          <span class="text text-2 text-sm font-normal text-gray-500">{{ message }}</span>
        </div>
      </div>
      
      <!-- Close button -->
      <i class="fa-solid fa-xmark close absolute top-3 right-4 p-1 cursor-pointer opacity-70 hover:opacity-100" @click="closeToast"></i>
      
      <!-- Progress bar -->
      <div v-if="isProgressActive" class="progress absolute bottom-0 left-0 h-1 w-full bg-blue-600 transition-opacity duration-500"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Props for title and message
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  });
  
  // Reactive state for showing and hiding the toast
  const isActive = ref(false);
  const isProgressActive = ref(false);
  
  // Timer variables for handling the toast display
  let timer1: NodeJS.Timeout | null = null;
  let timer2: NodeJS.Timeout | null = null;
  
  // Method to show the toast
  const showToast = () => {
    isActive.value = true;
    isProgressActive.value = true;
  
    timer1 = setTimeout(() => {
      isActive.value = false;
    }, 5000);
  
    timer2 = setTimeout(() => {
      isProgressActive.value = false;
    }, 5300);
  };
  
  // Method to close the toast manually
  const closeToast = () => {
    isActive.value = false;
    isProgressActive.value = false;
  
    if (timer1) clearTimeout(timer1);
    if (timer2) clearTimeout(timer2);
  };
  
  // Automatically show the toast when the component is mounted
  onMounted(() => {
    showToast();
  });
  </script>
  
  <style scoped>
  .toast {
    /* Optional styling */
    transition: transform 0.5s ease-out;
  }
  
  .progress {
    transition: opacity 0.5s ease-out;
  }
  </style>
  