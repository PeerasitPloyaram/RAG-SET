<!-- <template>
    <div id="contatiner" class="w-96 h-24 flex-col rounded-3xl bg-[#202026] border border-[#E27C59]">
        <div>
            <input type="text" class="bg-[#202026] mx-2 my-2 w-11/12"
            placeholder="Have a Questions?">
        </div>
        <div class="mx-2 my-2">
            <button class="bg-[#2A2A33] w-16 rounded-lg">hello</button>
        </div>
    </div>
</template> -->


<template>
    <div class="relative px-[var(--chat-padding)] w-full max-w-chat mx-auto z-prompt">
        <div class="relative shadow-xs border backdrop-blur rounded-lg">
            <div class="border-b-px border-transparent" style="height: 0px;"><div class="overflow-hidden h-full border-bolt-elements-borderColor relative bg-bolt-elements-background-depth-2 transition-opacity duration-200 rounded-t-[0.44rem] border-b-px left-0 right-0 opacity-0"><div class="flex text-xs py-1.5 px-2.5 font-medium"><div class="flex-grow"></div><button class="bg-transparent text-bolt-elements-link hover:underline">Update</button></div></div></div>
                <div class="flex flex-col items-start space-y-2">
                    <div class="relative select-none">
                        <textarea v-model="message" @keydown="handleKeydown" placeholder="Type your message..." rows="1"
                        class="w-full pl-4 pt-4 pr-16 focus:outline-none resize-none text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary bg-transparent text-sm" style="min-height: 76px; max-height: 200px; height: 76px; overflow-y: hidden;">
                        </textarea>
                    </div>
                    <button @click="sendMessage" :disabled="!message.trim()"
                    class="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg disabled:bg-gray-300 cursor-pointer hover:bg-blue-700 transition-all duration-200">
                        Send
                    </button>
                <div class="pb-[var(--chat-padding)] bg-transparent"></div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      message: '' as string, // TypeScript type annotation for the message
    };
  },
  methods: {
    handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      } else if (event.key === 'Enter' && event.shiftKey) {
        this.message += '\n';
      }
    },

    // Method to handle message sending
    sendMessage() {
      if (this.message.trim()) {
        console.log('Message Sent:', this.message);
        this.message = '';
      }
    },
  },
});
</script>
  
  