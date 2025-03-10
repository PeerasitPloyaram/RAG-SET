<template>
    <div class="fixed top-18 right-5 flex flex-col gap-2 w-full z-40">
        <ToastNotification
            v-for="(toast, index) in toasts"
            :key="toast.id"
            :title="toast.title"
            :message="toast.message"
            :type="toast.type"
            :style="{ top: `${index * 120}px` }" 
            @close="removeToast(toast.id)"/>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import ToastNotification from "~/components/ToastNotification.vue";

const toasts = ref<{ id: number; title: string; message: string; type:string }[]>([]);
const addToast = (title: string, message: string, type: string) => {
    const id = Date.now();
    toasts.value.push({ id, title, message, type });
    setTimeout(() => {
        removeToast(id);
    }, 10000);
};
  

const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

defineExpose({ addToast });
</script>
  