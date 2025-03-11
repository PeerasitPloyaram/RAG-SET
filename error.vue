<template>
    <div class="flex flex-col justify-center items-center text-white top-0 bottom-0 right-0 left-0 absolute">
        <div class="flex flex-row bg-gradient-to-b from-orange-900 to-[#262626] dark:to-[#171717] w-1/2 justify-center items-center rounded-xl m-1">
            <div class="flex justify-center items-center bg-gradient-to-b from-[#262626] to-[#171717] dark:to-[#171717] w-full h-72 rounded-xl m-0.5">
                <div class="w-28">
                    <i class="fa-solid fa-star-half fa-9x text-orange-500"></i>
                </div>
                <div class="flex flex-col ml-8 mr-8 justify-center items-center">
                    <h1 class="text-8xl mt-2 mb-12 font-extrabold">404</h1>
                    <div class="text-xl font-bold">
                        <p>Oops...</p>
                        <p>Page Not Found</p>
                    </div>
                </div>
            </div>
        </div>
      <button @click="goBack" class="font-bold text-white hover:text-neutral-300 rounded-lg w-20 h-14 bg-orange-700 hover:bg-orange-900 transition-colors m-4 text-xl">Back</button>
    </div>
</template>
  
<script setup lang="ts">

useSeoMeta({
    title: '404 Page Not Found',
    ogTitle: '404 Page Not Found',
    description: '',
    ogDescription: '',
    ogImage: '',
})

const goBack = () => {
  navigateTo("/chat")
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