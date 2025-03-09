export default defineNuxtPlugin((nuxtApp) => {
    const user_store = useCookie('stl_id');
    const user_auth = user_store.value ? JSON.parse(user_store.value) : null;
    const user_id = user_auth ? user_auth.user_id : "guest"
    console.log("sdfsd", user_id);
    
    const config = useRuntimeConfig();
    if (!process.client) return;

    if (user_id == "guest"){
        return
    }

    const wsUrl = `${config.public.api_websocket}/ws/${user_id}`;
    const socket = new WebSocket(wsUrl);
  
    socket.onopen = () => {
        console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
        console.log("Contact: Notification from Server");
        nuxtApp.$bus.emit("toast", {
            title: "New Notification",
            message: event.data,
        });
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket closed Reconnecting...");
        setTimeout(() => {
            socket = new WebSocket(wsUrl);
        }, 3000);
    };

    nuxtApp.provide("websocket", socket);
});