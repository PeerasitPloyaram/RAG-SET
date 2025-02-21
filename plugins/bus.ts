import mitt from "mitt";

export default defineNuxtPlugin((nuxtApp) => {
  const emitter = mitt();
  nuxtApp.provide("bus", emitter); // This registers the event bus globally

  console.log("✅ Event bus plugin initialized"); // Debugging log
});
