<template>
  <Header/>
    <div class="flex flex-row items-center">
        <div>
            <HistorySideBar/>
        </div>
        
        <div class="flex flex-col w-full justify-center items-center">
    
            <div id="main_chat" class="flex-grow text-white w-full  p-16 border border-orange-800 rounded-lg overflow-y-auto min-h-0 space-y-4">
                <div v-for="(msg, index) in messages" :key="index" :class="msg.isUser ? 'text-right': 'text-left'">
                    <div :class="msg.isUser ? 'bg-orange-600 text-white p-3 rounded-lg inline-block' : 'text-left bg-[#262626] rounded-lg inline-block text-white p-4'">
                        <div v-html="msg.text"></div>
                    </div>
                    <!-- <p :class="msg.isUser ? 'bg-orange-600 text-white p-3 rounded-lg inline-block': 'text-left bg-[#262626] rounded-lg inline-block text-white p-4'">
                        {{ msg.text }}
                    </p> -->
                </div>
                <!-- <div class="text-right">
                    <span class=" bg-orange-600 text-white p-3 rounded-lg inline-block">What is BTS</span>
                </div>
                <div class="text-left">
                    <span class="text-left bg-[#262626] text-white p-3 rounded-lg inline-block">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam aperiam accusantium amet optio reiciendis debitis praesentium, voluptatem vitae ea nobis eaque. Saepe eaque suscipit eius, nobis animi laudantium quo perferendis!</span>
                </div>
                <div class="text-left bg-[#262626] rounded-lg inline-block text-white p-4">
                    <span>shelo</span>
                    <span>sdflk</span>
                    <span class="text-2xl">sljfsdskf</span>
                </div> -->

                <!-- <pre v-html="response" class="text-white"></pre> -->
            </div>

            <div class="flex flex-row border border-[#9b442e] rounded-lg w-96 h-12 bg-[#262626]">
                <input class="bg-transparent w-full text-white" v-model="chat_input" placeholder="Ask me" v-on:keyup.enter="chat(chat_input)"/>
                <a @click="chat(chat_input)" style="margin-left: 5px;"  class="bg-[#1B1B20]">enter</a>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ["auth"]
  })
import Header from '@/layouts/templates/header.vue';
import { ref } from 'vue'
import HistorySideBar from '~/components/HistorySideBar.vue';


// useSeoMeta({
//   title: 'STELLA',
//   ogTitle: 'STELLA',
//   description: '',
//   ogDescription: '',
//   ogImage: 'https://example.com/image.png',
// })

const response = ref<any | null>(null)
const modelLlm = ref(null)
const user_massage = ref('')
const config = useRuntimeConfig()
const chat_input = ref<string | null>(null)
const messages = ref<{ text: string; isUser: boolean }[]>([
    //   { text: 'Hello! How can I assist you today?', isUser: false },
    //   {text: '', isUser: true}
]);

function formatStructuredText(input: string) {
    return input
        .replace(/### (.*?)\n/g, '<h2 class="text-xl font-bold mt-4">$1</h2>') // H2 Section Headers
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') // Bold Text
        .replace(/\n- (.*?)\n/g, '<li class="ml-4">$1</li>') // Bullet List Items
        .replace(/\n/g, '<br>'); // Preserve line breaks
}


async function chat(message: string | null) {
    if (message) {
        messages.value.push({ text: message, isUser: true }); // Push user message

        const url = `${config.public.api_path}/chat/`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: message, session: "1" }),
            });

            if (!response.body) throw new Error("ReadableStream not supported!");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let result = "";
            let currentIndex = messages.value.length; // Index of last message

            const processStream = async () => {
                messages.value.push({ text: "Thinking...", isUser: false });
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    result += decoder.decode(value, { stream: true });

                    // Update last message instead of pushing a new one
                    messages.value[currentIndex].text = formatStructuredText(result) + ""; // Cursor effect
                }

                // Remove cursor after full response is received
                messages.value[currentIndex].text = formatStructuredText(result);
            };

            await processStream();
        } catch (error) {
            console.error("Fetch error:", error);
            messages.value.push({ text: "Error fetching data.", isUser: false });
        }
    }
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