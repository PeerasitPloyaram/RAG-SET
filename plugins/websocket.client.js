export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (!process.client) return;

  const wsUrl = `ws://${config.public.api_path}/ws/U1234`;
  const socket = new WebSocket(wsUrl);
  
  socket.onopen = () => {
    console.log("WebSocket Connected");
  };

  socket.onmessage = (event) => {
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