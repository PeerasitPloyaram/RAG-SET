<template>
    <div class="sticky top-0 bg-[#0c0c0c] bg-opacity-30 h-16 flex justify-between items-center px-4 z-50">
        <div class="flex flex-row items-center ml-1">
            <a href="/chat" class="text-white text-xl flex flex-row items-center justify-center">
                <img src="../../public/main_logo.png"  alt="logo" class="w-10 h-10 ml-2 mr-2"/>
                STELLA
            </a>
			<button class="group bg-[#262626] w-10 h-10 rounded-lg ml-4 mr-2 mt-2 mb-2 hover:bg-[#242424] opacity-85" @click="newSession">
				<i class="fa-duotone fa-solid fa-note-sticky text-neutral-400 fa-lg group-hover:text-neutral-600 transition-colors"></i>
			</button>
        </div>
        <div class="flex flex-row items-center"v-if=show_auth >
            <button class="text-white hover:text-neutral-200 font-medium m-2 bg-orange-700 hover:bg-orange-900 w-20 h-8 rounded-lg transition-colors" @click="goToLogin">SignIn</button>
            <button class="text-white hover:text-neutral-200 font-medium m-2 bg-[#262626] hover:bg-[#171717] w-20 h-8 rounded-lg transition-colors" @click="goToSignUp">SignUp</button>
        </div>
        <div class="flex flex-row items-center"v-if=show_profile>
            <div class="flex flex-row justify-center items-center">
                <div class="flex bg-[#262626] w-10 h-10 justify-center items-center rounded-full">
                    <i class="fa-solid fa-user fa-xl text-neutral-300"></i>
                </div>
                <p class="text-neutral-300 ml-4 mr-4 text-xl font-medium">{{ username }}</p>
            </div>
            <button class="text-white hover:text-neutral-200 font-medium m-2 bg-orange-700 hover:bg-orange-900 w-20 h-8 rounded-lg transition-colors" @click="goToManage" v-if="showManageButton">Manage</button>
            <button class="text-white hover:text-neutral-200 font-medium m-2 bg-[#262626] hover:bg-[#171717] w-20 h-8 rounded-lg transition-colors" @click="goTologOut">LogOut</button>
        </div>
    </div>
    <div class="flex flex-grow">
        <ToastContainer ref="toastContainer" />
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { reloadNuxtApp } from "nuxt/app";
const myCookie = useCookie('stl_id');
const chatSession = useCookie('stl_session');
const show_auth = ref(true);
const show_profile = ref(false);
const username = ref<string | null>(null);
const toastContainer = ref<InstanceType<typeof ToastContainer> | null>(null);
const showManageButton = ref(false);

import ToastContainer from "@/components/ToastContainer.vue";

const { $bus } = useNuxtApp();


if (!$bus) {
  throw new Error("Event bus not found! Make sure the plugin is registered.");
}

$bus.on("toast", (data) => {
    if (toastContainer.value) {
        toastContainer.value.addToast(data.title, data.message, data.type);
    }
});


const newSession = () =>{
    const getChatSession = useCookie("stl_session");
    getChatSession.value = null;
    const route = useRoute();
    
    if (route.name == "admin"){
        navigateTo("/chat");
    }else{
        window.location.reload();
    }
}


if (! myCookie.value){
    show_auth.value = true;
}else{
    show_auth.value = false;
    show_profile.value = true;
    const user_data = JSON.parse(myCookie.value);
    username.value = user_data.username;
    if (user_data.role == "admin"){
        showManageButton.value = true;
    }
}



const goToLogin = () => { navigateTo("/signIn"); }
const goToSignUp = () => { navigateTo("/signUp"); }
const goTologOut = () => {
    myCookie.value = null;
    chatSession.value = null;
    reloadNuxtApp({
        path: "/chat",
        ttl: 1000
    });
}
const goToManage = () => { navigateTo("/admin"); }
</script>