<template>
    <div class="flex flex-col h-screen justify-center items-center">
        <div class="m-4 flex flex-col border border-[#3c3c3c] items-center bg-[#171717] w-96 p-4 rounded-lg h-98">
            <div class="m-4">
                <h1 class="text-white text-2xl">Sign Up</h1>
            </div>
            <input type="text" class="outline-none mt-4 mb-4 rounded-lg h-14 w-60 py-2.5 sm:py-3 ps-4 pe-10 bg-[#262626] dark:placeholder-neutral-500 dark:focus:ring-neutral-600 text-neutral-100" placeholder="you@example.com" v-model="email"/>
            <input type="text" class="outline-none mb-4 rounded-lg h-14 w-60 py-2.5 sm:py-3 ps-4 pe-10 bg-[#262626] dark:placeholder-neutral-500 dark:focus:ring-neutral-600 text-white" placeholder="username" v-model="username"/>

            <div class="max-w-sm mb-4">
                <div class="relative">
                    <input v-model="password" :type=showPassword class="outline-none w-60 h-14 py-2.5 sm:py-3 ps-4 pe-10 block border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262626] dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter password">
                    <button @click="showPasswordIcon" type="button" class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-orange-600 dark:text-neutral-600 dark:focus:text-orange-500">
                    <svg class="transition-colors shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="iconshowPassword">
                        <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path class="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path class="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                        <path class="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle class="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                    </svg>
                    </button>
                </div>
            </div>

            <div class="max-w-sm mb-4">
                <div class="relative">
                    <input @keyup.enter="requestSignUp" v-model="confirmPassword" :type=showConfirmPassword class="outline-none w-60 h-14 py-2.5 sm:py-3 ps-4 pe-10 block border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262626] dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Confirm password">
                    <button @click="showConfirmPasswordIcon" type="button" class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden  dark:text-neutral-600">
                    <svg class="transition-colors shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="iconshowConfirmPassword">
                        <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path class="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path class="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                        <path class="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle class="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                    </svg>
                    </button>
                </div>
            </div>

            <div class="h-10 mt-4">
                <p class="text-red-500 text-xl">{{ error_input }}</p>
                <p class="text-green-500 text-xl">{{ succes_input }}</p>
            </div>
            
            <button class="mt-4 mb-4 rounded-lg h-14 w-60 p-2 text-white text-xl bg-orange-700 hover:bg-orange-900 transition-colors" @click="requestSignUp">Sign Up</button>
            <div class="mt-4">
                <p class="text-neutral-600">Have an account?<button @click="goToLogin" class="ml-2 text-orange-700">Log In</button></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CreateNewUser } from '@/composables/apiService';
import { ref } from 'vue';

const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const showPassword = ref<string>("password");
const iconshowPassword = ref<string>("text-gray-500")
const showConfirmPassword = ref<string>("password");
const iconshowConfirmPassword = ref<string>("text-gray-500")

const error_input = ref("");
const succes_input = ref("");

useSeoMeta({
    title: 'STELLA/SignUp',
    ogTitle: 'STELLA/SignUp',
    description: '',
    ogDescription: '',
    ogImage: '',
})

const showPasswordIcon = () => {
    if (showPassword.value == "password"){
        showPassword.value = "text";
        iconshowPassword.value = "text-orange-500"
    }else{
        showPassword.value = "password";
        iconshowPassword.value = "text-gray-500"
    }
}

const showConfirmPasswordIcon = () => {
    if (showConfirmPassword.value == "password"){
        showConfirmPassword.value = "text";
        iconshowConfirmPassword.value = "text-orange-500"
    }else{
        showConfirmPassword.value = "password";
        iconshowConfirmPassword.value = "text-gray-500"
    }
}

const validateInput = (username:string, password:string, confirmPassword:string, email:string) => {
    if (username == "" || password == "" ||  confirmPassword == "" || email == ""){
        error_input.value = "Please Enter Fields";
        return;
    }else {
        const validateEmailRegex:RegExp = /^\S+@\S+\.\S+$/;
        if (confirmPassword !== password){
            error_input.value = "Password Not Match";
            return;
        }

        if (! validateEmailRegex.test(email)){
            error_input.value = "Email Format Not Correct";
            return;
        }
        error_input.value = ""
        return;
    }
}

const requestSignUp = async () => {
    validateInput(username.value, password.value, confirmPassword.value, email.value);
    if (error_input.value === "") {
        try{
            const res = await CreateNewUser(username.value, password.value, email.value);
            if (res?.data.status){
                succes_input.value = res.data.message;
                setTimeout(() => {
                    succes_input.value = "";
                }, 5000)
            }else{
                error_input.value = res?.data.message;
            }
        }catch (error){
            console.error(error);   
        }
    }
}

const goToLogin = () => {
    navigateTo("/signIn")
}
</script>

<style>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background: rgb(12,12,12);
    background: linear-gradient(333deg, rgba(12,12,12,1) 64%, rgba(36,15,0,1) 83%, rgba(65,36,4,1) 93%, rgba(89,53,6,1) 100%, rgba(122,83,12,1) 100%, rgba(161,91,9,1) 100%, rgba(185,97,7,1) 100%, rgba(255,113,0,1) 100%);
    background-attachment: fixed;
    background-size: cover;
}
</style>