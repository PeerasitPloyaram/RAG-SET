<template>
    <div v-if="isActive" class="absolute top-6 right-8 rounded-lg p-5 shadow-lg overflow-hidden transition-all duration-500 ease-out" :class="setBackground">
        <div class="toast-content flex items-center">
            <!-- Icon -->
            <div class="text-white text-lg rounded-full flex items-center justify-center h-9 w-9" :class="setIconBackground">
                <i :class=iconToast></i>
            </div>
            
            <!-- Message content -->
            <div class="message ml-5 flex flex-col">
                <span class="text text-1 font-semibold text-neutral-800">{{ title }}</span>
                <span class="text text-2 text-sm font-normal text-white">{{ message }}</span>
            </div>
        </div>
      
        <!-- Close button -->
        <i class="fa-solid fa-xmark close absolute top-1 right-1 p-1 cursor-pointer opacity-70 transition-all hover:opacity-100" @click="closeToast"></i>
      
        <!-- Progress bar -->
        <div v-if="isProgressActive" class="absolute bottom-0 left-0 h-1 transition-colors rounded-lg duration-500" :class="setProgressBarBackground"
        :style="{ width: progressWidth + '%' }">
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
  

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
});

  

const isActive = ref(false);
const isProgressActive = ref(false);
const progressWidth = ref(0)
const iconToast = ref<string>("fas fa-solid fa-check check")
const setBackground = ref<string>("bg-[#799f73]")
const setIconBackground = ref<string>("bg-green-600")
const setProgressBarBackground = ref<string>("bg-green-600")

let timer1: NodeJS.Timeout | null = null;
let timer2: NodeJS.Timeout | null = null;

if (props.type == "error"){
    iconToast.value = "fa-solid fa-x"
    setIconBackground.value = "bg-red-500"
    setProgressBarBackground.value = "bg-red-500"
    setBackground.value = "bg-[#ec8065]"
}
  

const showToast = () => {
    isActive.value = true;
    isProgressActive.value = true;
  
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressWidth.value = progress;
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                isActive.value = false
                isProgressActive.value = false;
                progressWidth.value = 0;
            }, 500);
        }
    }, 200);
};
  
const closeToast = () => {
    isActive.value = false;
    isProgressActive.value = false;

    if (timer1) clearTimeout(timer1);
    if (timer2) clearTimeout(timer2);
};
  

onMounted(() => {
    showToast();
});
</script>

<style scoped>
.toast {
    transition: transform 0.5s ease-out;
}

.progress {
    transition: opacity 0.5s ease-out;
}
</style>
  