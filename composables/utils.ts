import { useCookie } from '#app';

export const CookieStorageSetExpire = (key:string, value:string) => {

    const myCookie = useCookie(key, {
        maxAge: 60 * 30,
        secure: false,
        sameSite: 'strict'
    });
    myCookie.value = JSON.stringify(value);

}

export const userSession = (session_id:string) => {

    const new_session = useCookie("stl_session", {
        secure: false,
        sameSite: 'strict'
    });
    new_session.value = session_id

}