const REMEMBER_TOKEN_KEY = "remember_token";
const SESSION_TOKEN_KEY = "session_token";

function saveToken(token: string, keepLoggedIn: boolean) {
    if (keepLoggedIn) {
        localStorage.setItem(REMEMBER_TOKEN_KEY, token);
    } else {
        sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    }
}
function getToken(): string | null {
    return localStorage.getItem(REMEMBER_TOKEN_KEY) || sessionStorage.getItem(SESSION_TOKEN_KEY);
}
function clearToken() {
    localStorage.removeItem(REMEMBER_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
}

export { saveToken, getToken, clearToken }