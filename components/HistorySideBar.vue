<template>
    <div class="flex flex-col bg-[#262626] w-56 h-screen m-6 rounded-lg items-center" v-if=show_sidebar>
        <div class="m-3 flex flex-row">
            <a>Close</a>
            <h1 class="text-white">History</h1>
        </div>
        <div class="flex flex-col">
            <a>c1</a>
            <a>c1</a>
            <a>c1</a>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const myCookie = useCookie('stl_id');
const show_sidebar = ref(true);

if (! myCookie.value) {
    show_sidebar.value = false;
}else{
    show_sidebar.value = true;
}
</script>