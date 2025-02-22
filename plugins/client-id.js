export default defineNuxtPlugin((nuxtApp) => {
    const generateClientId = () => {
        return 'STLC-' + Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    };

    const getClientId = () => {
        if (process.client) {
            let clientId = localStorage.getItem('chat_client_id');
            if (!clientId) {
                clientId = generateClientId();
                localStorage.setItem('chat_client_id', clientId);
            }
            return clientId;
        }
        return generateClientId();
    };

    const useClientId = () => {
        return ref(getClientId());
    };

    nuxtApp.provide('useClientId', useClientId);
});
