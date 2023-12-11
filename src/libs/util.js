export function getToken(key) {
    return localStorage.getItem(key)
}

export function setToken(key, token) {
    return localStorage.setItem(key, JSON.stringify(token))
}

export function removeToken(key) {
    return localStorage.removeItem(key)
}