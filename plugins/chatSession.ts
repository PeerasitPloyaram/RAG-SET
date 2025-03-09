export default defineNuxtPlugin(() => {
    return {
        provide: {
            userSession: (session_id: string) => {
                const new_session = useCookie("stl_session", {
                    secure: false,
                    sameSite: 'strict'
                });

                new_session.value = session_id;
            }
        }
    };
});