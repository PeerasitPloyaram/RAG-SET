<template>
  	<div class="min-h-screen flex">
		<!-- Sidebar -->
		<div class="fixed m-2 z-50 left-6 transition-all duration-300"
			style="top: 12rem;" v-if="show_icon_sidebar" 
			:class="{'translate-x-0': show_sidebar, '-translate-x-7': !show_sidebar}">
			<a class="text-white cursor-pointer bg-[#171717] hover:bg-[#101010] w-10 h-10 rounded-lg text-center flex justify-center items-center" @click="showSidebarButton">
				<pre v-html="iconShowing"></pre>
			</a>
		</div>

		<!-- new chat -->
		<div class="fixed flex flex-row items-center justify-start top-32 left-3 transition-all duration-300" v-if="show_new_session"
		:class="{'translate-x-0': show_sidebar, '-translate-x-7': !show_sidebar}">
			<button class="bg-[#262626] w-12 h-12 rounded-lg ml-4 mt-2" @click="newSession">
				<i class="fa-duotone fa-solid fa-note-sticky text-neutral-400 fa-2x hover:text-neutral-600 transition-colors"></i>
			</button>
		</div>
		
			<div class="flex flex-col bg-[#262626] border border-[#3c3c3c] w-56 m-4 rounded-lg items-center fixed transition-all duration-300"
				:class="{'translate-x-0': show_sidebar, '-translate-x-full': !show_sidebar}"
				style="height: 32rem; top: 11rem;" v-if="show_sidebar">
				<div class="mt-4 flex flex-row w-full px-3 items-center text-end">
					<h1 class="text-white mr-4 text-end w-full font-semibold">Chat History</h1>
				</div>

				<div class="w-full h-0.5 bg-[#3c3c3c] my-4"></div>

				<!-- Chat history list with scrolling -->
				<div class="flex flex-col w-full px-3 space-y-2 text-white  h-96" style="max-height: 40rem;">
					<div class="flex flex-col overflow-auto">
						<button class="bg-[#171717] hover:bg-[#101010] rounded-lg pt-3 pb-3 mt-2 mb-2 flex flex-row justify-between items-centers transition-colors pl-2" @click="getSession(chat, $event)" v-for="(chat) in chatHistory" :key="chat.session_id">
							{{ chat.name }}
							<span class="w-5 h-5 text-neutral-500 hover:text-white cursor-pointer mr-2 transition-colors" @click.stop="togglePopup(chat.session_id, $event)">
								<i class="fa-solid fa-ellipsis"></i>
							</span>
						</button>
					</div>

					<!-- Popup -->
					<div ref="popupMenu" :style="popupStyles" v-if="popupOpen" class="absolute mt-2 w-28 bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg shadow-lg">
					<button class="w-full px-3 py-2 hover:bg-[#2c2c2c] text-left" @click="">
						Share
					</button>
					<button class="w-full px-3 py-2 hover:bg-[#2c2c2c] text-left text-red-400" @click="requestDropUserSession">
						Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

  
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { userSession } from '@/composables/utils'
import { dropUserSession } from '@/composables/apiService';

const props = defineProps<{
	chatHistory: {name:string; session_id:string, create_at:string}[]
}>();
const emit = defineEmits(['getMessageHistory']);

const myCookie = useCookie('stl_id');
const show_sidebar = ref(false);
const show_icon_sidebar = ref(false);
const show_new_session = ref(false)
const popupOpen = ref<string | null>(null);
const popupMenu = ref<HTMLElement | null>(null);
const popupStyles = ref<any>({});
const iconShowing = ref<string>('<i class="fa-sharp-duotone fa-solid fa-eye fa-lg text-neutral-300"></i>');

const togglePopup = (sessionId: string, event: MouseEvent) => {
	popupOpen.value = popupOpen.value === sessionId ? null : sessionId;
	session_id_buffer.value = sessionId;
	const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
	
	popupStyles.value = {
		top: `${buttonRect.top - 200}px`,
		left: `${buttonRect.left + window.scrollX + 12}px`,
	};
};

const session_id_buffer = ref<string>("");
const getSession = async (chat_session:any) => {
	const user_store = useCookie('stl_id');
    const user_auth = user_store.value ? JSON.parse(user_store.value) : null;
    const user_id:string = user_auth ? user_auth.user_id : "guest";

	const s = await getAllChathistoryName(user_id, chat_session.session_id);
	if (s?.data.status){
		const chat_history = s.data.message;
		const session_store = useCookie('stl_session');
		session_store.value = null;
		userSession(chat_session.session_id);

		emit('getMessageHistory', chat_history.last_message);	
	}
}

const newSession = () =>{
    const getChatSession = useCookie("stl_session");
    getChatSession.value = null;
    window.location.reload();
}

const requestDropUserSession = async() => {
	const user_store = useCookie('stl_id');
    const user_auth = user_store.value ? JSON.parse(user_store.value) : null;
    const user_id:string = user_auth ? user_auth.user_id : "guest";
	
	const res = await dropUserSession(user_id, session_id_buffer.value);
	if (res?.data.status){
		console.log(res.data.message);
		window.location.reload();
	}
}

onClickOutside(popupMenu, () => {
  	popupOpen.value = null;
});

const showSidebarButton = () => {
	if (show_sidebar.value){
		show_sidebar.value = false;
		iconShowing.value = '<i class="fa-duotone fa-solid fa-eye-slash fa-lg text-orange-300"></i>';
	}else{
		show_sidebar.value = true;
		iconShowing.value = '<i class="fa-sharp-duotone fa-solid fa-eye fa-lg text-neutral-300"></i>';
	}
}

if (!myCookie.value) {
	show_sidebar.value = false;
	show_icon_sidebar.value = false;
	show_new_session.value = false;
} else {
	show_sidebar.value = true;
	show_icon_sidebar.value = true;
	show_new_session.value = true;
}
</script>

<style scoped>
/* Ensuring the sticky sidebar behavior */
</style>
  