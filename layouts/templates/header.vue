<template>
    <div class="sticky top-0 bg-[#0c0c0c] bg-opacity-30 h-16 flex justify-between items-center px-4">
        <div class="flex flex-row items-center ml-2">
            <a href="/chat" class="text-white text-xl">STELLA</a>
        </div>
        <div class="flex flex-row items-center"v-if=show_auth >
            <button class="text-white m-2 bg-orange-700 w-20 h-8 rounded-lg" @click="goToLogin">SignIn</button>
            <button class="text-white m-2 bg-[#262626] hover:bg-[#171717] w-20 h-8 rounded-lg" @click="goToSignUp">SignUp</button>
        </div>
        <div class="flex flex-row items-center"v-if=show_profile>
            <p class="text-white ml-4 mr-4 text-xl">{{ username }}</p>
            <button class="text-white m-2 bg-orange-700 hover:bg-orange-900 w-20 h-8 rounded-lg" @click="goToManage" v-if="showManageButton">Manage</button>
            <button class="text-white m-2 bg-[#262626] hover:bg-[#171717] w-20 h-8 rounded-lg" @click="goTologOut">LogOut</button>
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
const showManageButton = ref(false)

import ToastContainer from "@/components/ToastContainer.vue";

const { $bus } = useNuxtApp();


if (!$bus) {
  throw new Error("Event bus not found! Make sure the plugin is registered.");
}

$bus.on("toast", (data) => {
    console.log(data);
    if (toastContainer.value) {
        toastContainer.value.addToast(data.title, data.message);
    }
});



if (! myCookie.value){
    show_auth.value = true
}else{
    show_auth.value = false;
    show_profile.value = true
    const user_data = JSON.parse(myCookie.value)
    username.value = user_data.username
    if (user_data.role == "admin"){
        showManageButton.value = true
    }
}



const goToLogin = () => { navigateTo("/signIn") }
const goToSignUp = () => { navigateTo("/signUp") }
const goTologOut = () => {
    myCookie.value = null
    reloadNuxtApp({
        path: "/chat",
        ttl: 1000, // default 10000
    });
}
const goToManage = () => { navigateTo("/admin") }
</script>