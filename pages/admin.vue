<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUpload } from '~/composables/useUpload'
// import { useWebSocketStore } from '~/store/websocket';
// const websocketStore = useWebSocketStore();



const file = ref(null)
const fileUrl = ref(null)
const { uploadFile } = useUpload()
const config = useRuntimeConfig()

import axios from 'axios'
const handleFileUpload = async (event) => {
  file.value = event.target.files[0]
  fileUrl.value = URL.createObjectURL(event.target.files[0])
}

const uploadFileButton = async () => {
  // if (file.value && file.value.type === 'application/pdf') {
  //   const response = await uploadFile(file.value)
  //   if (response.status) {
  //     alert("Upload successful! Processing in background.")
  //   } else {
  //     alert('Upload failed')
  //   }
  // } else {
  //   alert('Please upload a valid PDF file.')
  // }
  const formData = new FormData()
      formData.append('file', file.value)

  try {
        const response = await axios.post(`https://${config.public.api_path}/uploadfile/U1234`, formData, {
          // headers: {
          //   "Content-Type": "application/json",
          // }
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error sending data:", error.response?.data || error.message);
      }
}

// Setup WebSocket connection on mount
// onMounted(() => {
//     websocketStore.connectWebSocket();
// })

// Cleanup WebSocket on unmount
onBeforeUnmount(() => {
  // Ensure WebSocket does not close prematurely on page change
  console.log("WebSocket is still open");
});
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <h2 class="text-xl font-bold mb-4">Upload and View PDF</h2>

    <!-- File Input -->
    <input type="file" @change="handleFileUpload" accept="application/pdf" class="mb-4" />

    <!-- Show PDF if uploaded -->
    <div v-if="fileUrl" class="mt-4">
      <h3 class="text-lg font-semibold mb-2">Preview:</h3>
      <iframe :src="fileUrl" class="w-full h-96 border rounded-md"></iframe>
      <button @click="uploadFileButton">Upload</button>
    </div>
  </div>
</template>

<style scoped>
input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
}
</style>
