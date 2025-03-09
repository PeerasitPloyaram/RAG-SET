<template>
    <slot></slot>
    <footer class="mt-4 bottom-0 left-0 z-20 w-full p-4 shadow-sm bg-[#171717] flex flex-col items-center justify-center md:p-6">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 flex flex-row items-center justify-center"> © 2025 <a :href="url" class="hover:underline ml-1 mr-2">Stella</a> All Rights Reserved.
        </span>
    </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const url:string = `${config.public.api_front_path}`
</script>