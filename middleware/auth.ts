import { CookieStorageSetExpire } from "@/composables/utils"
import { auth } from "@/composables/apiService";

export default defineNuxtRouteMiddleware(async (to, from) => {
        const router = useRouter()
        const myCookie = useCookie('stl_id');
        console.log("COOKIE",myCookie.value);
            
        
        if (!myCookie.value){
            if (to.path != "/chat"){
                return navigateTo("/chat")
            }

        }else{
            // CALL AUTH API
            const res = await auth(myCookie.value.toString())
            if (from.path == "/admin" && res?.data.role !== "admin"){
                return navigateTo("/test2")
            }
        }
})