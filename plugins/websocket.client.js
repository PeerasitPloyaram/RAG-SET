export default defineNuxtPlugin((nuxtApp) => {
    const user_store = useCookie('stl_id');
    const user_auth = user_store.value ? JSON.parse(user_store.value) : null;
    const user_id = user_auth ? user_auth.user_id : "guest"
    
    const config = useRuntimeConfig();
    if (!process.client) return;

    if (user_id == "guest"){
        return
    }

    const wsUrl = `${config.public.api_websocket}/ws/${user_id}`;
    const socket = new WebSocket(wsUrl);
  
    socket.onopen = () => {
        // console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
        // console.log("Contact: Notification from Server");
        const notification_contact = JSON.parse(event.data);
        
        nuxtApp.$bus.emit("toast", {
            title: notification_contact.title,
            message: notification_contact.message,
            type: notification_contact.type
        });
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        // console.log("WebSocket closed Reconnecting...");
        setTimeout(() => {
            socket = new WebSocket(wsUrl);
        }, 3000);
    };

    nuxtApp.provide("websocket", socket);
});