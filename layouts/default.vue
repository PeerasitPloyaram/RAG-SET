<template>
    <div>
      <ToastNotification v-if="isToastVisible" :title="toastTitle" :message="toastMessage" />
      <slot />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ToastNotification from "~/components/ToastNotification.vue";
const { $bus } = useNuxtApp();

const isToastVisible = ref(false);
const toastTitle = ref("");
const toastMessage = ref("");

if (!$bus) {
  throw new Error("Event bus not found! Make sure the plugin is registered.");
}

$bus.on("toast", (data) => {
    toastTitle.value = data.title;
    toastMessage.value = data.message;
    isToastVisible.value = true;

    setTimeout(() => {
    isToastVisible.value = false;
    }, 10000);
});
</script>
  