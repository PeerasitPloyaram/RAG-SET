import axios from "axios";
export const CreateNewUser = async (username:string, password:string, email:string) => {
    const config = useRuntimeConfig()
    try {
        const response = await axios.post(`${config.public.api_path}/sign_up/`, {
            username: username,
            password: password,
            email: email
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
};

export const requestSession = async (user_id:string, session_id:string) => {
    const config = useRuntimeConfig()
    try {
        const response = await axios.post(`${config.public.api_path}/session/`, {
            user_id: user_id.toString(),
            current_session: session_id.toString(),
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
};


export const login = async (username:string, password:string) => {
    const config = useRuntimeConfig()
    try {        
        const response = await axios.post(`${config.public.api_path}/sign_in/`, {
            username: username,
            password: password
        },
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
};


export const auth = async (id:string) => {
    const config = useRuntimeConfig()
    try {        
        const response = await axios.post(`${config.public.api_path}/auth/`, {
            id:id
        },
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
};


export const getInfo = async () => {
    const config = useRuntimeConfig()
    try {        
        const response = await axios.get(`${config.public.api_path}/manage/info`,
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}


export const getCompanyData = async () => {
    const config = useRuntimeConfig()

    try {        
        const response = await axios.get(`${config.public.api_path}/manage/get/company`,
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}

export const getAllChathistoryName = async (user_id:string, session_id:string) => {
    const config = useRuntimeConfig()

    try {        
        const response = await axios.get(`${config.public.api_path}/session/getHistory/`,
		{
            params: {
                "user_id": user_id,
                "session_id": session_id
            },
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}

export const dropUserSession = async (id:string, session_id:string) => {
    const config = useRuntimeConfig()
    try {        
        const response = await axios.post(`${config.public.api_path}/session/deleteSession`, {
            "user_id":String(id),
            "current_session":session_id
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
};


export const getCompanyFileData = async (company_name:string) => {
    const config = useRuntimeConfig()
    const name:string = company_name.toLowerCase()

    try {        
        const response = await axios.get(`${config.public.api_path}/manage/get/companyFile/${name}`,{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}

export const getAllGeneralFile = async () => {
    const config = useRuntimeConfig()

    try {        
        const response = await axios.get(`${config.public.api_path}/manage/get/general`,
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}

export const getAllSectors = async () => {
    const config = useRuntimeConfig()

    try {        
        const response = await axios.get(`${config.public.api_path}/manage/get/sectors`,
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}


export const createNewCompany = async (abbr:string, name_th:string, name_en:string, sector_id:number) => {
    const config = useRuntimeConfig()

    try {        
        const response = await axios.post(`${config.public.api_path}/manage/addCompany`,{
            abbr: abbr,
            name_th: name_th,
            name_en: name_en,
            sector_id: sector_id
        },
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}


export const updateDescription = async (name:string, description:string) => {
    const config = useRuntimeConfig()

    try {        
        const response = await axios.post(`${config.public.api_path}/manage/update/description`,{
            name: name,
            description: description,
        },
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}


export const deleteGeneralFile = async (name:string) => {
    const config = useRuntimeConfig()

    try {        
        const response = await axios.post(`${config.public.api_path}/manage/delete/generalFile`,{
            name: name,
        },
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}

export const deleteCompany = async (name:string) => {
    const config = useRuntimeConfig()

    try {        
        const response = await axios.post(`${config.public.api_path}/manage/delete/company`,{
            name: name,
        },
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}


export const requestDeleteEachCompanyFile = async (file_name:string, abbr:string) => {
    const config = useRuntimeConfig()

    try {        
        const response = await axios.post(`${config.public.api_path}/manage/delete/companyFile`,{
            file_name: file_name,
            abbr: abbr
        },
		{
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
}