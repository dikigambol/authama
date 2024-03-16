export function setToken(name, value) {
    const expirationTime = new Date(Date.now() + (12 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expirationTime.toUTCString()};path=/`;
}

export function getToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'jwt') {
            return value;
        }
    }
    return null;
}

export function deleteCookies() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, _] = cookie.trim().split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}