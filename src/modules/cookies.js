export function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name) {
    let lookFor = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for(let cookie of cookies) {
        while(cookie.charAt(0) == ' '){
            cookie = cookie.substring(1);
        }
        if(cookie.indexOf(lookFor) == 0) {
            return cookie.substring(lookFor.length, cookie.length);
        }
    }
    return "";
}

export function setSession(key, value){
    return new Promise((resolve, reject) => {
        try {
            sessionStorage.setItem(key, value);
            resolve(`Valor inicializado para chave: ${key}`);
        } catch (error) {
            reject(error);
        }
    });
}

export function getSession(key){
    return new Promise((resolve, reject) => {
        try {
            let value = sessionStorage.getItem(key);
            resolve(value);
        } catch (error) {
            reject(error);
        }
    })
}

export function removeSession(key){
    return new Promise((resolve, reject) => {
        try {
            sessionStorage.removeItem(key);
            resolve(`Valor removido para chave: ${key}`);
        } catch (error) {
            reject(error);
        }
    })
}