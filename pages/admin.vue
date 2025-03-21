<template>
    <Header />
  
    <div class="flex flex-col m w-full h-full md:flex-row">
        <div class="bg-[#171717] rounded-lg border border-[#3c3c3c] flex flex-col m-2 w-full">

            <div class="m-4 flex flex-col">
                <h2 class="text-xl font ml-4 mb-4 text-white">Add New Company</h2>
                <div class="mt-4 mb-4">
                    <input v-model="abbr_input" type="text" class="w-1/3 ml-6 h-14 rounded-lg bg-[#262626] border border-[#3c3c3c] text-white p-2 outline-none" placeholder="Stock"/>
                    <select name="chose" id="" class="w-1/2 ml-6 h-14 rounded-lg bg-[#262626] border border-[#3c3c3c] text-white outline-none cursor-pointer" @change="changeSector($event)">
                        <option value="" selected disabled>Select File Type</option>
                        <option v-for="(sector) in sectors" :key="sector.id" :value="sector.id">{{ sector.name }}</option>
                    </select>
                </div>
                <div class="flex flex-row">
                    <input v-model="name_th" type="text" class="mt-2 mb-2 w-1/2 ml-6 h-14 rounded-lg bg-[#262626] border border-[#3c3c3c] text-white p-2 outline-none" placeholder="บริษัท"/>
                    <input v-model="name_en" type="text" class="mt-2 mb-2 w-1/2 ml-6 h-14 rounded-lg bg-[#262626] border border-[#3c3c3c] text-white p-2 outline-none" placeholder="Company Name PCL"/>
                </div>
                <div class="flex flex-row h-14">
                    <p class="text-red-500 text-xl ml-6 mt-2 mb-2">{{ error_message_add_company }}</p>
                    <p class="text-green-500 text-xl ml-6 mt-2 mb-2">{{ success_message_add_company }}</p>
                </div>
                <button @click="addNewCompany" :disabled="disable_create_new_company_button" class="ml-6 w-1/4 h-12 rounded-lg mt-4 bg-green-800 hover:bg-green-900 text-white transition-colors hover:text-neutral-200">
                    <p v-if="show_text_create_new_company_button">Add New</p>
                    <i v-if="show_loading_create_new_company_button" class="fa-duotone fa-solid fa-spinner fa-xl animate-spin text-neutral-300"></i>
                </button>
                
            </div>

            <div class="m-10 flex flex-col h-100">
                <h2 class="text-xl font mb-4 text-white">Upload and View PDF</h2>

                <select name="chose" id="" class="w-36 ml-6 h-14 rounded-lg bg-[#262626] border border-[#3c3c3c] text-white outline-none cursor-pointer" @change="changeType($event)">
                    <option value="" selected disabled>Select File Type</option>
                    <option value="company">Company File</option>
                    <option value="general">General File</option>
                </select>

                <!-- Company -->
                <div v-if="visible_company_file" class="items-center">

                    <div class="flex items-center justify-center w-full mt-4 mb-4">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-[#3c3c3c] border-dashed rounded-lg cursor-pointer bg-gray-200 dark:bg-[#262626] hover:bg-gray-900 transition-colors">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">PDF File</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload"/>
                        </label>
                    </div> 


                    <div class="flex flex-col items-center">
                        <div class="flex h-10">
                            <p class="text-red-500 text-xl mt-2 mb-2">{{ error_message_upload_company }}</p>
                            <p class="text-green-500 text-xl mt-2 mb-2">{{ success_message_upload_company }}</p>
                        </div>
                        <div>
                            <h2 class="text-xl mt-6 mb-4 text-white">File Info</h2>
                            <select name="chose" id="" class="w-35 ml-6 h-14 rounded-lg bg-[#262626] border border-[#3c3c3c] text-white p-2 outline-none cursor-pointer" @change="chageReportType($event)">
                                <option value="" selected disabled>Select File Type</option>
                                <option value="56-1">One-Report</option>
                                <option value="esg">ESG-Report</option>
                                <option value="etc">Related File</option>
                            </select>

                            <select name="chose" id="" class="w-35 ml-6 h-14 rounded-lg bg-[#262626] border border-[#3c3c3c] text-white p-2 outline-none cursor-pointer" @change="showCompanyInfo($event)">
                                <option value="" selected disabled>Company</option>
                                <option v-for="(company) in companies" :key="company.abbr">
                                    {{ company.abbr }}
                                </option>
                            </select>

                            <select name="chose" id="" class="w-35 ml-6 h-14 rounded-lg bg-[#262626] border border-[#3c3c3c] text-white p-2 outline-none cursor-pointer" @change="getYear($event)">
                                <option value="" selected disabled>Year</option>
                                <option v-for="(year) in years" :key="year">
                                    {{ year }}
                                </option>
                            </select>

                            <div v-if="visible_company_info" class="mt-4 mb-2">
                                <p class="text-white ml-2 mb-2 text-xl font-semibold">Info</p>
                                <div class="flex flex-col border border-[#373737] bg-[#262626] rounded-xl">
                                    <span class="text-neutral-400 flex bg-[#262626] p-2 rounded-lg">Name:
                                        <p class="text-white ml-2"><span></span> {{ company?.abbr.toUpperCase() }}</p>
                                    </span>
                                    <span class="text-neutral-400 flex bg-[#171717] p-2">Name in Thai:
                                        <p class="text-white ml-2">{{ company?.name_th }}</p>
                                    </span>
                                    <span class="text-neutral-400 flex bg-[#262626] p-2">Name in English:
                                        <p class="text-white ml-2">{{ company?.name_en }}</p>
                                    </span>
                                    <span class="text-neutral-400 flex bg-[#171717] p-2">Sector:
                                        <p class="text-white ml-2">{{ company?.sector }}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col items-center justify-center">
                            <div class="flex flex-row">
                                <input v-model="company_etc_file_name_input" v-if="visible_company_etc_file" type="text" class="mr-2 ml-2 mt-4 mb-4 rounded-lg h-14 w-60 p-2 bg-[#262626] border border-[#3c3c3c] text-white" placeholder="Name Of File"/>
                                <input v-model="company_etc_file_start_page_input" v-if="visible_company_etc_start_page_file" type="text" class="mr-2 ml-2 mt-4 mb-4 rounded-lg h-14 w-36 p-2 bg-[#262626] border border-[#3c3c3c] text-white" placeholder="Start With Page 1"/>
                            </div>
                            <div class="flex flex-col w-full items-center">
                                <button @click="uploadCompanyFile" class=" w-1/4 h-12 rounded-lg mt-4 bg-green-800 hover:bg-green-900 text-white transition-colors">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- General -->
                <div v-if="visible_general_file">
                    <div class="flex items-center justify-center w-full mt-4 mb-4">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-[#3c3c3c] border-dashed rounded-lg cursor-pointer bg-gray-200 dark:bg-[#262626] hover:bg-gray-900 transition-colors">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">PDF File</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload"/>
                        </label>
                    </div> 
                    <h2 class="text-xl mt-6 mb-4 text-white">Info</h2>
                        <div class="flex flex-col">
                            <div class="flex h-10">
                                <p class="text-red-500 text-xl">{{ error_general_message }}</p>
                            </div>
                            <div class="flex flex-row w-full">
                                <input v-model="general_file_name_input" type="text" class="mr-2 ml-2 mt-4 mb-4 rounded-lg h-14 w-60 p-2 bg-[#262626] border border-[#3c3c3c] text-white" placeholder="Name of General File"/>
                                <input v-model="general_file_start_page_input" type="text" class="mr-2 ml-2 mt-4 mb-4 rounded-lg h-14 w-60 p-2 bg-[#262626] border border-[#3c3c3c] text-white" placeholder="Start With Page 1"/>
                            </div>
                            <textarea v-model="general_file_description" class="mr-2 ml-2 mt-4 mb-4 rounded-lg h-20 p-2 bg-[#262626] text-white border border-[#3c3c3c]" placeholder="Description of File Retriever"></textarea>
                        </div>
                    <button @click="uploadGeneralFile" class="w-1/4 h-12 rounded-lg mt-4 bg-green-800 hover:bg-green-900 text-white transition-colors">Upload</button>
                </div>

                <br><br>
            </div>


        </div>
        <div class="bg-[#262626] rounded-lg m-2 w-full">
            <div class="justify-center flex flex-row">
                <button @click="closePreview" class=" w-1/4 h-12 rounded-lg mt-4 bg-red-900 hover:bg-red-800 text-white transition-colors hover:text-neutral-200" v-if="close_preview_button">Close File</button>
                <div class="flex flex-row w-full justify-center" v-if="!fileUrl">
                    <button @click="render_company_data" class="m-2 w-1/4 h-12 rounded-lg mt-4 mb-4 bg-[#171717] hover:bg-[#1d1d1d] text-white transition-colors hover:text-neutral-200">Company</button>
                    <button @click="render_general_data" class="m-2 w-1/4 h-12 rounded-lg mt-4 mb-4 bg-[#171717] hover:bg-[#1d1d1d] text-white transition-colors hover:text-neutral-200">General</button>
                    <button @click="refreshButton" class="group m-2 w-1/4 h-12 rounded-lg mt-4 mb-4 bg-[#171717] hover:bg-[#1d1d1d] text-white transition-colors hover:text-neutral-200">
                        <div class="flex flex-row justify-center items-center">
                            <p class="group-hover:text-gray-300">Refresh</p>
                            <i class="ml-4 fa-solid fa-arrows-rotate fa-lg transition-all duration-700" :class="useRefresh"></i>
                        </div>
                    </button>
                </div>
            </div>

            <div>
                <iframe :src="fileUrl" class="w-full h-screen mt-4" v-if="show_preview_file"></iframe>
                <div class="m-8 text-white h-full" v-if="show_data_info">

                    <div v-if="visible_company_data">
                        <!-- Company Info -->
                        <p class="text-xl">Company Info</p>
                        <div class="relative mt-4 mb-4 h-96 overflow-y-auto rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-[#171717]">
                                <thead class="text-xs text-gray-900 dark:text-gray-400 sticky top-0 bg-[#171717]">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Stock
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Name Th
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Name En
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Sector
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(company) in companies" class="bg-white dark:bg-[#171717]">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-orange-500">
                                            {{ company.abbr.toUpperCase() }}
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ company.name_th }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ company.name_en }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ company.sector }}
                                        </td>
                                        <td class="px-6 py-4">
                                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="getGeneralFileDataInfo(company.abbr)">Info</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <p class="text-red-500 text-xl ml-6 mt-2 mb-2">{{ error_comapny_info }}</p>
                            <p class="text-green-500 text-xl ml-6 mt-2 mb-2">{{ success_company_info }}</p>
                            <div class="" v-if="visible_company_data_info">
                                <div class="flex flex-row items-center justify-between">
                                    <p class="text-white text-lg">File {{ company_info }} Info</p>
                                    <button @click="deleteCompanyButton" class=" w-1/4 h-12 rounded-lg bg-red-900 hover:bg-red-800 text-white transition-colors">Delete Company</button>
                                </div>
                                <div class="relative mt-4 mb-4 h-96 overflow-y-auto rounded-lg">
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-[#171717]">
                                        <thead class="text-xs text-gray-900 dark:text-gray-400 sticky top-0 bg-[#171717]">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    File
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Type
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(company) in companies_file" class="bg-white dark:bg-[#171717]">
                                                <td class="px-6 py-4">
                                                    {{ company.name }}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {{ company.type }}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <button class="font-medium text-red-600 dark:text-red-500 hover:underline" @click="deleteEachCompanyFile(company)">Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- General File Info -->
                    <div v-if="visible_general_data">
                        <p class="text-xl">General File Info</p>
                        <div class="relative mt-4 mb-4 h-80 overflow-y-auto rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-[#171717]">
                                <thead class="text-xs text-gray-900 dark:text-gray-400 sticky top-0 bg-[#171717]">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            File
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(general) in generalFiles" class="bg-white dark:bg-[#171717]">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-orange-500">
                                            {{ general.name.toUpperCase() }}
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ general.description }}
                                        </td>
                                        <td class="px-6 py-4">
                                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="getGeneralFileData(general)">Edit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="flex flex-row h-10 mb-4">
                        <p class="text-red-500 text-xl ml-6 mt-2 mb-2">{{ error_message_change_description }}</p>
                        <p class="text-green-500 text-xl ml-6 mt-2 mb-2">{{ success_message_change_description }}</p>
                    </div>
                    <div v-if="visible_change_general_file_data">
                        <div class="flex flex-row items-center justify-between">
                            <p>Change File {{ name_change_file }}</p>
                            <button @click="closeDescription" class="ml-6 w-8 h-8 rounded-lg bg-red-800 hover:bg-red-900 text-white transition-colors">
                                <i class="fa-solid fa-xmark hover:text-neutral-200"></i>
                            </button>
                        </div>
                        <textarea v-model="textarea_change_description" class="mt-4 mb-4 rounded-lg w-full h-20 p-2 bg-[#262626] text-white border border-[#3c3c3c]" placeholder="Description of File Retriever"></textarea>
                        <div class="flex flex-row items-center justify-between">
                            <button @click="deleteGeneral" :disabled="show_loading_delete_general_file_button" class="ml-6 w-28 h-10 rounded-lg mt-4 bg-red-800 hover:bg-red-900 text-white transition-colors">
                                <p v-if="!show_loading_delete_general_file_button">Delete File</p>
                                <i v-if="show_loading_delete_general_file_button" class="fa-duotone fa-solid fa-spinner fa-xl animate-spin text-neutral-300"></i>
                            </button>
                            <button @click="changeDescription" :disabled="show_loading_update_description_button" class="ml-6 w-1/4 h-12 rounded-lg mt-4 bg-green-800 hover:bg-green-900 text-white transition-colors">
                                <p v-if="!show_loading_update_description_button">Update</p>
                                <i v-if="show_loading_update_description_button" class="fa-duotone fa-solid fa-spinner fa-xl animate-spin text-neutral-300"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
  

<script setup lang="ts">
definePageMeta({
    middleware: ["auth"]
})

import {
    getCompanyData, getAllSectors,
    createNewCompany,getAllGeneralFile, updateDescription,
    deleteGeneralFile, deleteCompany, getCompanyFileData,
    requestDeleteEachCompanyFile
} from "@/composables/apiService"


import { ref } from 'vue'
import Header from '@/layouts/templates/header.vue';
import axios from 'axios'

useSeoMeta({
    title: 'STELLA/Manage',
    ogTitle: 'STELLA/Manage',
    description: '',
    ogDescription: '',
    ogImage: '',
})

const visible_company_file = ref(false)
const visible_general_file = ref(false)
const visible_company_info = ref(false)
const visible_change_general_file_data = ref(false)
const visible_general_data = ref(false)
const visible_company_data = ref(true)
const visible_company_data_info = ref(false)
const visible_company_etc_file = ref(false)
const visible_company_etc_start_page_file = ref(false)

const disable_create_new_company_button = ref(false)
const show_loading_create_new_company_button = ref(false)
const show_text_create_new_company_button = ref(true)

const show_loading_update_description_button = ref(false)
const show_loading_delete_general_file_button = ref(false)

const useRefresh = ref<string>("")

const raw_file = ref(null)
const fileUrl = ref<string | undefined>(undefined)
const config = useRuntimeConfig()
const sectors = ref<{ id: number; name: string; abbr:string;}[]>([])
const years = ref<string[]>(["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"])
const companies = ref<{ abbr: string; name_th: string; name_en:string; sector:string}[]>([])
const company = ref<{ abbr: string; name_th: string; name_en:string; sector:string}>()
const companies_file = ref<{ id: string; name: string; type:string}[]>([])
const generalFiles = ref<{ name: string; description: string;}[]>([])
const report_type = ref(null)
const year_input = ref(null)

const error_message_add_company = ref<string | null>(null)
const success_message_add_company = ref<string | null>(null)

const error_general_message = ref<string | null>(null)
const error_message_change_description = ref<string | null>(null)
const success_message_change_description = ref<string | null>(null)
const error_comapny_info = ref<string | null>(null)
const success_company_info = ref<string | null>(null)
const error_message_upload_company = ref<string | null>(null)
const success_message_upload_company = ref<string | null>(null)

const abbr_input = ref<string | null>(null)
const name_en = ref<string | null>(null)
const name_th = ref<string | null>(null)
const sector_input = ref<number | null>(null)
const close_preview_button = ref(false)
const show_preview_file = ref(false)
const show_data_info = ref(true)

const general_file_name_input = ref<string | null>(null)
const general_file_start_page_input = ref<string | null>(null)
const general_file_description = ref<string | null>(null)

const company_etc_file_name_input = ref<string | null> (null)
const company_etc_file_start_page_input = ref<string | null>(null)

const name_change_file = ref<string | null>(null)
const textarea_change_description = ref<string | null>(null)

const textarea_buffer = ref<string | null>(null)

const company_info = ref<string | null>(null)

const user_store = useCookie('stl_id');
const user_auth = user_store.value ? JSON.parse(user_store.value) : null;
const user_id:string = user_auth ? user_auth.user_id : "guest"

let company_info_buffer:string|null = null;


const render_general_data = () => {
    visible_general_data.value = true
    visible_company_data.value = false
}

const render_company_data = () => {
    error_message_change_description.value = ""
    success_message_change_description.value = ""
    visible_general_data.value = false
    visible_company_data.value = true
    success_company_info.value = null
    error_comapny_info.value = null
    visible_change_general_file_data.value = false
}

const changeSector = (event:any) => { sector_input.value = event.target.value }

const changeType = async (event:any) => {
    if (event.target.value == "company"){
        visible_company_file.value = true
        visible_general_file.value = false
    }else if (event.target.value == "general"){
        visible_company_file.value = false
        visible_general_file.value = true
    }
}
const chageReportType = (event:any) => {
    report_type.value = event.target.value
    if (report_type.value == "etc") {
        visible_company_etc_file.value = true
        visible_company_etc_start_page_file.value = true
    }else {
        visible_company_etc_file.value = false
        visible_company_etc_start_page_file.value = false
    }
};
const refreshButton = async () => {
    useRefresh.value = "animate-spin text-orange-500"
    await setUpFetch()
    setTimeout(() => {
        useRefresh.value = ""
    },460)
}

const showCompanyInfo = (event:any) => {
    for (let index = 0; index < companies.value.length; index++) {
        const element = companies.value[index];
        if (element.abbr == event.target.value){
            visible_company_info.value = true            
            company.value = element
        }
        
    }
}

const getYear = (event:any) => {
    year_input.value = event.target.value
}


// Set Up Fetch
const fetchGeneralFile = async () => {
    const response_gen_file = await getAllGeneralFile()
    const gen_file = response_gen_file?.data.info
    generalFiles.value = []
    if (!gen_file){
        return
    }
    
    for (let index = 0; index < gen_file.length; index++) {
        const element = gen_file[index];
        generalFiles.value.push({"name":element.name, "description":element.description})
    }
}

const fetchSectors = async () => {
    const response_sec = await getAllSectors()
    const sector = response_sec?.data.info
    sectors.value = []
    for (let index = 0; index < sector.length; index++) {
        const element = sector[index];
        sectors.value.push({"abbr":element.abbr, "name":element.name, "id":element.id})
    }
}

const fetchCompany = async () => {
    const response = await getCompanyData()
    const company = response?.data.info
    companies.value = []
    for (let index = 0; index < company.length; index++) {
        const element = company[index];
        companies.value.push({"abbr":element.abbr, "name_th":element.name_th, "name_en":element.name_en, "sector":element.sector})
    }
}

const setUpFetch = async () => {
    await fetchCompany()
    await fetchSectors()
    await fetchGeneralFile()
}
setUpFetch()


const handleFileUpload = async (event:any) => {
    raw_file.value = event.target.files[0]
    fileUrl.value = await URL.createObjectURL(event.target.files[0])

    show_preview_file.value = true
    close_preview_button.value = true
    show_data_info.value = false
}


const closePreview = () => {
    fileUrl.value = undefined
    raw_file.value = null

    show_preview_file.value = false
    close_preview_button.value = false
    show_data_info.value = true
}

const setCreateNewCompanyButton = () => {
    disable_create_new_company_button.value = !disable_create_new_company_button.value
    show_loading_create_new_company_button.value = !show_loading_create_new_company_button.value
    show_text_create_new_company_button.value = !show_text_create_new_company_button.value
}
const addNewCompany = async () => {
    const abbr:string | null = abbr_input.value ? abbr_input.value.toLowerCase() : null;
    const th:string | null = name_th.value ? name_th.value : null;
    const en:string | null = name_en.value ? name_en.value : null;
    if (! abbr || !th || !en || !sector_input.value){ error_message_add_company.value = "Please Enter Field"; success_message_add_company.value = ""; return}

    error_message_add_company.value = ""
    success_message_add_company.value = ""
    
    try{
        setCreateNewCompanyButton()
        const response = await createNewCompany(abbr, th, en, sector_input.value)
        abbr_input.value = ""
        name_th.value = ""
        name_en.value = ""
        
        if (response?.data.status == false){
            error_message_add_company.value = response?.data.message
            success_message_add_company.value = ""
        }else {
            fetchCompany()
                success_message_add_company.value = response?.data.message
                error_message_add_company.value = ""
            setTimeout(() => {
                success_message_add_company.value = ""
            }, 5000)
        }
        setCreateNewCompanyButton()
    }catch (error){
    }
    
}

const closeDescription = async () => {
    visible_change_general_file_data.value = false
    error_message_change_description.value = null
    success_message_change_description.value = null
}

const changeDescription = async () => {
    const name:string | null = name_change_file.value ? name_change_file.value.toLowerCase() : null
    const new_description:string | null = textarea_change_description.value ? textarea_change_description.value : null

    if (! name){
        error_message_change_description.value = "ERROR can't get name.";
        success_message_change_description.value = null
        return
    }
    if (! new_description){
        error_message_change_description.value = "Description must not empty.";
        success_message_change_description.value = null
        return
    }
    if (new_description == textarea_buffer.value){
        error_message_change_description.value = "Description Duplicated.";
        success_message_change_description.value = null
        return
    }

    // send to update
    try{
        show_loading_update_description_button.value = true
        const response = await updateDescription(name, new_description)
        if (response?.data.status == false){
            error_message_change_description.value = response.data.message
            success_message_change_description.value = null
        }else{
            error_message_change_description.value = null
            success_message_change_description.value = response?.data.message
            textarea_buffer.value = new_description
            fetchGeneralFile()
        }
        show_loading_update_description_button.value = false
    }catch{
        error_message_change_description.value = ""
    }
}

const deleteGeneral = async () => {
    const name:string | null = name_change_file.value ? name_change_file.value.toLowerCase() : null
    if (!name) {error_message_change_description.value = "Name Not Found"; return}
    
    try{
        show_loading_delete_general_file_button.value = true
        const response = await deleteGeneralFile(name)
        if (response?.data.status == false){
            error_message_change_description.value = response.data.message
            success_message_change_description.value = null
        }else{
            error_message_change_description.value = null
            success_message_change_description.value = response?.data.message
            setTimeout(() => {
                success_message_change_description.value = null
            }, 5000);
            visible_change_general_file_data.value = false
            fetchGeneralFile()
        }
        show_loading_delete_general_file_button.value = false
    }catch{

    }
}

const deleteCompanyButton = async () => {
    if (! company_info_buffer){
        return
    }    
    try{
        const response = await deleteCompany(company_info_buffer.toLowerCase())
        if (response?.data.status == false){
            error_comapny_info.value = response?.data.message
            success_company_info.value = null
        }else{
            success_company_info.value = response?.data.message
            error_comapny_info.value = null
            setTimeout(() => {
                success_company_info.value = null
            }, 5000);
            visible_company_data_info.value = false
            company_info_buffer = null
            fetchCompany()
        }
    }catch{

    }
}

const deleteEachCompanyFile = async (file:any) =>{
    const file_id:string = file.id
    const file_name:string = file.name
    const company_name:string| undefined = company_info.value?.toLowerCase()

    if (! company_name){
        return
    }

    try{
        const response = await requestDeleteEachCompanyFile(file_name, company_name)
        if (response?.data.status){
            success_company_info.value = response.data.message
            error_comapny_info.value = null
            await getGeneralFileDataInfo(company_name)
        }else{
            error_comapny_info.value = response?.data?.message
            success_company_info.value = null
        }
    }catch(err){
        console.log(err);
    }
        
}


const isNumeric = (value:any) => {
    return /^-?\d+$/.test(value);
}

const uploadGeneralFile = async () => {
    const name_file:string | null = general_file_name_input.value ? general_file_name_input.value : null;
    const descripton_file:string | null = general_file_description.value ? general_file_description.value : null;
    const start_page_file:string | null = general_file_start_page_input.value ? general_file_start_page_input.value : null;
    
    if (!name_file || !descripton_file || !raw_file.value || !start_page_file){ error_general_message.value = "Please Enter Field"; return}

    if (!isNumeric(start_page_file)){
        error_general_message.value = "Page Must is Number Only"; return
    }
    if (Number(start_page_file) <= 0){error_general_message.value = "Start Page Must Start with 1"; return}
    
    const formData = new FormData()
    if (!raw_file.value) {
        return
    }
    
    formData.append('file', raw_file.value)
    formData.append("name", name_file)
    formData.append("description", descripton_file)
    formData.append("start_page", start_page_file)

    try {
        const response = await axios.post(`${config.public.api_path}/manage/upload/generalFile/${user_id}`, formData, {});
            if (response.data.status == false){
                error_general_message.value = response.data.message
            }else{
                error_general_message.value = null
            }
    }catch (error:any) {
            console.error("Error sending data:", error.response?.data || error.message);
    }
}

const getGeneralFileDataInfo = async (company:any) => {
    try {
        const response = await getCompanyFileData(company);
        if (response?.data.status) {
            // sort by file name
            response.data.info.sort((a:any, b:any) => a.file_name.localeCompare(b.file_name));
            
            companies_file.value = response.data.info.map((element: any) => ({
                id: element.id,
                name: element.file_name,
                type: element.file_type
            }));
        }
        company_info.value = company.toUpperCase();
        company_info_buffer = company.toLowerCase();
        visible_company_data_info.value = true;
    } catch (error) {
        console.error("Error fetching company file data:", error);
    }
};


const getGeneralFileData = (file:{ name: string; description: string}) => {
    visible_change_general_file_data.value = true
    name_change_file.value = file.name.toUpperCase()
    textarea_change_description.value = file.description
    textarea_buffer.value = file.description

    error_message_change_description.value = null
    success_message_change_description.value = null
}

const uploadCompanyFile = async () => {
    const abbr:string | null = company.value ? company.value.abbr : null;
    const year:number | null = year_input.value ? year_input.value : null;
    const type:string | null = report_type.value ? report_type.value : null;
    const start_page:string | null = company_etc_file_start_page_input.value ?  company_etc_file_start_page_input.value : null
    const etc_file_name:string | null = company_etc_file_name_input.value ?  company_etc_file_name_input.value : null

    if (! abbr || !year || !type || !raw_file.value){ error_message_upload_company.value = "Please Enter Field"; return}
    if (type == "etc" && (!start_page || !etc_file_name)){ error_message_upload_company.value = "Pleddase Enter Field"; return}
    
    
    const formData = new FormData()
    if (!raw_file.value) {
        return
    }
    
    let file_name:string = ""
    let start_page_file:string = "1"

    if (type == "etc"){
        if (!isNumeric(start_page)){
            error_message_upload_company.value = "Page Must is Number Only"; return
        }
        if (Number(start_page) <= 0){error_message_upload_company.value = "Start Page Must Start with 1"; return}

        file_name = company_etc_file_name_input.value + "_" + year + ".pdf"
        start_page_file = String(start_page)
    }else {
        file_name = abbr + "_" + type + "_" + year +".pdf"
    }
    

    formData.append('file', raw_file.value)
    formData.append('file_name',file_name)
    formData.append("type", type)
    formData.append("partition", abbr)
    formData.append("start_page", start_page_file)


    try {
        const response = await axios.post(`${config.public.api_path}/manage/upload/companyFile/${user_id}`, formData, {});
            if (response.data.status == false){
                error_message_upload_company.value = response.data.message
                success_message_upload_company.value = null
            }else{
                success_message_upload_company.value = response.data.message
                error_message_upload_company.value = null
            }
    }catch (error:any) {
            console.error("Error sending data:", error.response?.data || error.message);
    }
}
</script>


<style>
body {
  background-color: rgb(12, 12, 12);
}
</style>