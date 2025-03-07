import { useCookie } from '#app';

export const CookieStorageSetExpire = (key:string, value:string) => {

    const myCookie = useCookie(key, {
        maxAge: 60 * 30,
        secure: false,
        sameSite: 'strict'
    });
    myCookie.value = JSON.stringify(value);

}