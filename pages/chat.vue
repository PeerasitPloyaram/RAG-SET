<template>
    <Header/>
    <div class="flex flex-row items-center">
        <div>
            <HistorySideBar :chatHistory="chat_history_sidebar" @getMessageHistory="handleDataHistory"/>
        </div>
        
        <div class="flex flex-col w-full justify-center items-center">
    
            <div id="main_chat" ref="chatContainer"  class="flex-grow text-white md:w-8/12 p-16 rounded-lg overflow-y-auto min-h-0 space-y-4">
                <div v-for="(msg, index) in messages" :key="index" :class="msg.isUser ? 'text-right': 'text-left'">
                    <div :class="msg.isUser ? 'bg-orange-700 text-white p-3 rounded-xl inline-block' : 'text-left bg-[#262626] rounded-xl inline-block text-white p-4'">
                        <div v-html="msg.text"></div>
                    </div>
                </div>
            </div>

            <!-- Input -->
            <div class="bg-gradient-to-b from-orange-800 to-[#262626] dark:to-[#171717] flex w-1/2 rounded-2xl">
                <div class="flex flex-col  rounded-2xl w-full sm:h-12 md:h-28 bg-[#262626] m-0.5">
                <div class="flex flex-row items-center justify-center">
                    <input class="bg-transparent w-full text-white p-4 h-full text-xl outline-none"
                    v-model="chat_input" placeholder="How can I help you?" v-on:keyup.enter="chat(chat_input)"/>

                    <a @click="chat(chat_input)" class="bg-[#373737] hover:bg-[#191919] transition-colors m-2 h-12 w-12 rounded-full justify-center items-center flex cursor-pointer">
                        <i class="fa-duotone fa-solid fa-wand-sparkles fa-lg text-neutral-400 hover:text-orange-300 transition-colors"></i>
                    </a>
                </div>
            </div>
            </div>

        </div>

    </div>
    <Footer/>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["auth"]
})
import Header from '@/layouts/templates/header.vue';
import Footer from '@/layouts/templates/footer.vue';
import { ref } from 'vue';
import HistorySideBar from '~/components/HistorySideBar.vue';
import { userSession } from '@/composables/utils';
import { getAllChathistoryName } from '@/composables/apiService';

useSeoMeta({
    title: 'STELLA',
    ogTitle: 'STELLA',
    description: '',
    ogDescription: '',
    ogImage: '',
})


const fetchHistory = async () => {
    const user_store = useCookie('stl_id');
    const session_store = useCookie('stl_session');
    console.log(session_store.value);
    

    const session:string = session_store.value ? session_store.value : "";
    const user_auth = user_store.value ? JSON.parse(user_store.value) : null;
    const user_id:string = user_auth ? user_auth.user_id : "guest";
    const ch = await getAllChathistoryName(user_id, session);
    if (ch?.data.status){
        const chat_history = ch.data.message;
        if (chat_history.type === "guest"){
            if (chat_history.last_message && chat_history.last_message.length == 0){
                session_store.value = null;
            }

            for (let index = 0; index < chat_history.message.length; index++) {
                const element = chat_history.message[index];
                messages.value.push(element);
            }
        }else if(chat_history.type === "user"){
            for (let index = 0; index < chat_history.last_message.length; index++) {
                const element = chat_history.last_message[index];
                messages.value.push(element);
            }

            for (let index = 0; index < chat_history.chat_history.length; index++) {
                const element = chat_history.chat_history[index];
                chat_history_sidebar.value.push({
                    "name":element.chat_name.slice(0, 21),
                    "session_id":element.chat_session,
                    "create_at": element.create_date
                })
            } 
        }
    }
}
fetchHistory();



const fetchOnlyUserHistory = async () => {
    const user_store = useCookie('stl_id');
    const session_store = useCookie('stl_session');
    

    const session:string = session_store.value ? session_store.value : "";
    const user_auth = user_store.value ? JSON.parse(user_store.value) : null;
    const user_id:string = user_auth ? user_auth.user_id : "guest";
    const ch = await getAllChathistoryName(user_id, session);
    chat_history_sidebar.value = [];

    if (ch?.data.status){
        const chat_history = ch.data.message;
        if (chat_history.type === "guest"){
            if (chat_history.last_message && chat_history.last_message.length == 0){
                session_store.value = null;
            }
        }else if(chat_history.type === "user"){
            for (let index = 0; index < chat_history.chat_history.length; index++) {
                const element = chat_history.chat_history[index];
                chat_history_sidebar.value.push({
                    "name":element.chat_name.slice(0, 21),
                    "session_id":element.chat_session,
                    "create_at": element.create_date
                })
            } 
        }
    }
}


const fetchSession = async () => {
    const user_store = useCookie('stl_id');
    const session_store = useCookie('stl_session');

    const session:string = session_store.value ? session_store.value : "";
    const user_auth = user_store.value ? JSON.parse(user_store.value) : null;
    const user_id:string = user_auth ? user_auth.user_id : "guest";

    const res = await requestSession(user_id, session);
    if (res?.data.status){
        userSession(res.data.message);
    }    
}

const handleDataHistory = (data:{"text":string; "isUser":boolean;}[]) => {
    messages.value = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        messages.value.push(element);
    }
    
}

const chat_history_sidebar = ref<{name:string; session_id:string, create_at:string}[]>([]);
const config = useRuntimeConfig();
const chat_input = ref<string | null>(null);
const messages = ref<{ text: string; isUser: boolean }[]>([]);

function formatStructuredText(input: string) {
    return input
        .replace(/### (.*?)\n/g, '<h2 class="text-xl font-bold mt-4">$1</h2>') // H2 Section Headers
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') // Bold Text
        .replace(/\n- (.*?)\n/g, '<li class="ml-4">$1</li>') // Bullet List Items
        .replace(/\n/g, '<br>'); // Preserve line breaks
}


async function chat(message: string | null) {
    if (message) {
        messages.value.push({ text: message, isUser: true });
        const url = `${config.public.api_path}/chat/`;

        try {
            await fetchSession();
            const getChatSession = useCookie("stl_session");
            const session_id:string = getChatSession.value ?? "";
            
            
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: message, session: session_id }),
            });

            if (!response.body) throw new Error("ReadableStream not supported!");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let result = "";
            let currentIndex = messages.value.length;

            const processStream = async () => {
                messages.value.push({ text: "Thinking...", isUser: false });
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    result += decoder.decode(value, { stream: true });
                    messages.value[currentIndex].text = formatStructuredText(result) + "";
                }
                messages.value[currentIndex].text = formatStructuredText(result);
            };
            chat_input.value = ""
            
            await processStream();
        } catch (error) {
            console.error("Fetch error:", error);
            messages.value.push({ text: "Error fetching data.", isUser: false });
        }
        await fetchOnlyUserHistory();
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