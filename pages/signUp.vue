<template>
  <div class="flex flex-col h-screen justify-center items-center">
    <div class="m-4 flex flex-col border border-[#3c3c3c] items-center bg-[#171717] w-96 p-4 rounded-lg h-96">
        <div class="m-4">
            <h1 class="text-white text-2xl">Sign Up</h1>
        </div>
        <input type="text" class="mt-4 mb-4 rounded-lg h-14 w-60 p-2 bg-[#262626] border border-[#3c3c3c] text-white" placeholder="you@example.com" v-model="username"/>
        <input type="text" class="mt-4 mb-4 rounded-lg h-14 w-60 p-2 bg-[#262626] border border-[#3c3c3c] text-white" v-model="password"/>

        <div class="h-10">
          <!-- <p class="text-white">test</p> -->
           <p class="text-white">{{ error_input }}</p>
        </div>
        
        <button class="mt-4 mb-4 rounded-lg h-14 w-60 p-2 
        text-white text-xl bg-orange-700 " @click="requestLogin">SignIn
        </button>


    </div>
  </div>
</template>

<script setup lang="ts">
import { CreateNewUser } from '@/composables/apiService';
import { ref } from 'vue';

const username = ref("")
const password = ref("")
const error_input = ref("")

const validateInput = (username:string, password:string) => {
  if (username == "" || password == ""){
    error_input.value = " EEEEE"
  }
  else {
    return true
  }
}

const requestLogin = async () => {
  if (validateInput(username.value, password.value)) {
    const res = await CreateNewUser(username.value, password.value)
    error_input.value = res?.data.message
    

  }
}
</script>