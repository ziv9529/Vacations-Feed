export function setTokenLS(token: string) {
    if (!token) return;
    localStorage.setItem("token", token)
}

export function clearTokenLS() {
    localStorage.clear()
}

export function getTokenLS(): string {
    const result = localStorage.getItem("token");
    if (!result) return ""
    return result
}