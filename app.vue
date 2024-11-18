<template>
  <div>
    <NuxtRouteAnnouncer/>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <h2>
		STELLA
      </h2>
      <h3>{{ modelLlm }}</h3>
      <p>Peerasit Ployaram</p>
      <div style="display: flex; flex-direction: row;">
        <input v-model="message" placeholder="Type me a Question" v-on:keyup.enter="chat(message)" style="
		height: 40px; width: 20rem; border-radius: 8px; border: solid 1px gray; padding: 1px 10px 1px 10px; font-size: 18px;"/>
        <button @click="chat(message)" style="margin-left: 5px;">enter</button>
      </div>

      <!-- <p style="border: solid 1px orange; border-radius: 12px; padding: 15px 5px 15px 5px; color: black;">
        {{ response }}
      </p> -->
      <div v-html=response></div>
      <p></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

useSeoMeta({
  title: 'SET Analytics',
  ogTitle: 'SET Analytics',
  description: '',
  ogDescription: '',
  ogImage: 'https://example.com/image.png',
  twitterCard: '',
})

const response = ref(null)
const modelLlm = ref(null)
const config = useRuntimeConfig()

function formatText(input: string) {
  const lines = input.split("\n"); // Split input by new lines
  const output: string[] = [];

  lines.forEach((line: string) => {
    let flag = false
    if (line.startsWith("```")) {
      // If it starts with "python", wrap the rest in <code> tags
      const code = line.replace("python", "").trim();
      output.push(`<code style="background-color: gray;">${code}</code>`);
      flag = true
    } else if (flag) {
      output.push(`<p style="background-color: gray;">${line.trim()}</p>`);
    } else {
      output.push(`<p>${line.trim()}</p>`);
    }
  });

  return output.join("\n")
}

async function chat(message:string) {
	if (message) {
    	try {
      		response.value = "Loading..."
      		const typhoon = await axios.post('https://api.opentyphoon.ai/v1/chat/completions', {
    			"model": "typhoon-v1.5x-70b-instruct",
				"max_tokens": 512,
				"messages": [{
            		"role": "system",
            		"content": "You are a helpful assistant. You must answer only in Thai."
        		}, {
            		"role": "user",
            		"content": message
        		}],
    			"temperature": 0.4,
    			"top_p": 0.9,
    			"top_k": 0,
    			"repetition_penalty": 1.05,
    			"min_p": 0.05
			},{
    			headers: {
    			Authorization: `Bearer ${config.public.typhon_api}`
    			}    
			});

		const text = typhoon.data.choices[0].message.content
		response.value = formatText(text)
  
    	} catch (error) {
      		response.value = "Cannot connect to ai server for now"
    	}
  	}
}
</script>