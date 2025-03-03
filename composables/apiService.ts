import axios from "axios";

export const CreateNewUser = async (username:string, password:string) => {
    const config = useRuntimeConfig()
    try {
        const response = await axios.post(`${config.public.api_path}/sign_up/`, {
            username: username,
            password: password
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        console.log("Response:", response.data);
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
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        console.log("Response:", response.data);
        return response
    } catch (error: any) {
        console.error("Error sending data:", error.response?.data || error.message);
    }
};