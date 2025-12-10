const REMEMBER_TOKEN_KEY = "remember_token";
const SESSION_TOKEN_KEY = "session_token";

function saveToken(token: string, keepLoggedIn: boolean) {
    const maxAge = keepLoggedIn ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 1;

    document.cookie = `session_token=${token}; Path=/; Max-Age=${maxAge};; SameSite=Lax`;

    if (keepLoggedIn) {
        localStorage.setItem(REMEMBER_TOKEN_KEY, token);
    } else {
        sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    }
}
function getToken(): string | null {
    
    const cookieMatch = document.cookie.match(/session_token=([^;]+)/);
    if (cookieMatch) return cookieMatch[1];

    return localStorage.getItem(REMEMBER_TOKEN_KEY) || sessionStorage.getItem(SESSION_TOKEN_KEY);
}
function clearToken() {
    document.cookie = "session_token=; Path=/; Max-Age=0;";
    localStorage.removeItem(REMEMBER_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
}

export { saveToken, getToken, clearToken }