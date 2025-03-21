import { auth } from "@/composables/apiService";

export default defineNuxtRouteMiddleware(async (to, from) => {
        const myCookie = useCookie('stl_id');
        const user_auth = myCookie.value ? JSON.parse(myCookie.value) : null;
            
        
        if (!user_auth){
            if (to.path != "/chat"){
                return navigateTo("/chat")
            }

        }else{
            const res = await auth(user_auth.user_id.toString())
            if (from.path == "/admin" && res?.data.role !== "admin"){
                return navigateTo("/notFound")
            }
        }
})