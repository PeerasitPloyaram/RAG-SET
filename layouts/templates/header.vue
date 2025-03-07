<template>
    <div class="sticky top-0 bg-[#0c0c0c] bg-opacity-30 h-16 flex justify-between items-center px-4">
        <div class="flex flex-row items-center">
            <h1 class="text-white text-xl">STELLA</h1>
        </div>
        <div class="flex flex-row items-center"v-if=show_auth >
            <button class="text-white m-2 bg-orange-700 w-20 h-8 rounded-lg" @click="goToLogin">SignIn</button>
            <button class="text-white m-2 bg-[#262626] hover:bg-[#171717] w-20 h-8 rounded-lg" @click="goToSignUp">SignUp</button>
        </div>
        <div class="flex flex-row items-center"v-if=show_profile>
            <p class="text-white">{{ username }}</p>
            <button class="text-white m-2 bg-[#262626] hover:bg-[#171717] w-20 h-8 rounded-lg" @click="logOut">LogOut</button>
        </div>
    </div>
    <div class="flex flex-grow">
        <ToastContainer ref="toastContainer" />
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { reloadNuxtApp } from "nuxt/app";
const router = useRouter()
const myCookie = useCookie('stl_id');
const show_auth = ref(true)
const show_profile = ref(false)
const username = ref<string | null>(null)
const toastContainer = ref<InstanceType<typeof ToastContainer> | null>(null);

import ToastContainer from "@/components/ToastContainer.vue";

const { $bus } = useNuxtApp();

// const isToastVisible = ref(false);
// const toastTitle = ref("");
// const toastMessage = ref("");

if (!$bus) {
  throw new Error("Event bus not found! Make sure the plugin is registered.");
}

$bus.on("toast", (data) => {
    console.log(data);
    
    // toastTitle.value = data.title;
    // toastMessage.value = data.message;
    // isToastVisible.value = true;

    // setTimeout(() => {
    // isToastVisible.value = false;
    // }, 10000);
    if (toastContainer.value) {
        toastContainer.value.addToast(data.title, data.message);
    }
});



if (! myCookie.value){
    show_auth.value = true
}else{
    show_auth.value = false;
    show_profile.value = true
    username.value = myCookie.value
}



const goToLogin = () => {
    router.push("/signIn")
}

const goToSignUp = () => {
    router.push("/signUp")
}

const logOut = () => {
    // const show_auth = ref(true)
    myCookie.value = null
    reloadNuxtApp({
        path: "/chat",
        ttl: 1000, // default 10000
    });
}
</script>