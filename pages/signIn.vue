<template>
    <div class="flex flex-col h-screen justify-center items-center">
        <div class="m-4 flex flex-col border border-[#3c3c3c] items-center bg-[#171717] w-96 p-4 rounded-lg h-98">
            <div class="m-4">
                <h1 class="text-white text-2xl">Welcome Back!</h1>
            </div>
            <input type="text" class="mt-4 mb-4 rounded-lg h-14 w-60 py-2.5 sm:py-3 ps-4 pe-10 bg-[#262626] dark:placeholder-neutral-500 dark:focus:ring-neutral-600 text-white" placeholder="Username" v-model="username"/>
            <!-- <input type="text" class="mt-4 mb-4 rounded-lg h-14 w-60 p-2 bg-[#262626] border border-[#3c3c3c] text-white" v-model="password"/> -->
        
            <div class="max-w-sm">
                <!-- <label class="block text-sm mb-2 dark:text-white">Password</label> -->
                <div class="relative">
                    <input v-model="password" :type=showPassword class="w-60 h-14 py-2.5 sm:py-3 ps-4 pe-10 block border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262626] dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter password">
                    <button @click="showPasswordIcon" type="button" class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-orange-600 dark:text-neutral-600 dark:focus:text-orange-500">
                    <svg class="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                <!-- <p class="text-white">test</p> -->
                <p class="text-red-500">{{ error_input }}</p>
            </div>
            
            <button class="mt-4 mb-4 rounded-lg h-14 w-60 p-2 text-white text-xl bg-orange-700 hover:bg-orange-900" @click="requestLogin">SignIn</button>
            <div class="mt-4">
                <p class="text-neutral-600">No account?<a href="/signUp" class="ml-2 text-orange-700">Sign up</a></p>
            </div>
        </div>
    </div>
</template>
  
  <script setup lang="ts">
  import { login } from '@/composables/apiService';
  import { ref } from 'vue';
  import { CookieStorageSetExpire } from '@/composables/utils'

  const username = ref("")
  const password = ref("")
  const error_input = ref("")
  const router = useRouter()
  
  const showPassword = ref<string>("password")

  const showPasswordIcon = () => {
    if (showPassword.value == "password"){
        showPassword.value = "text"
    }else{
        showPassword.value = "password"
    }
  }
  
  
  const validateInput = (username:string, password:string) => {
    if (username == "" || password == ""){
      error_input.value = "Plese Enter Input Field"
    }
    else {
      return true
    }
  }
  
  const requestLogin = async () => {
    if (validateInput(username.value, password.value)) {
      const res = await login(username.value, password.value)
      if (res?.data.status != true){
        error_input.value = "Username or Password incorrect"
      }
      else{
        const user_id = res.data.user_id
        CookieStorageSetExpire("stl_id", JSON.stringify({"user_id":user_id, "username":res.data.username, "role":res.data.role}))

        // Read the cookie value
        error_input.value = ""
        navigateTo("/chat")
      }
    }
  }
  </script>