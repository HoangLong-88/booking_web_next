function getLanguageFromCookie(): string {
    if (typeof window === "undefined") return "en";
    const cookie = document.cookie.split("; ").find(row => row.startsWith("lang="));
    if (!cookie) return "en";
    const lang = cookie.split("=")[1];
    return lang || "en";
}
function setLanguageCookie(lang: string, maxAge: number = 31536000): void {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`; //1 year
}
function changeLanguage(lang: string | { locale?: string; code?: string },
    options?: { persist?: boolean; maxAge?: number }
): string {
    let locale = "en";
    if (typeof lang === "string") {
        locale = lang || "en";
    } else if (lang && typeof lang === "object") {
        locale = lang.locale || (lang.code ? String(lang.code).toLowerCase() : "en");
    }
    try {
        if (typeof document !== "undefined" && document.documentElement) {
            document.documentElement.lang = locale;
        }
    }
    catch (error) {}
    if (options?.persist !== false) {
        setLanguageCookie(locale, options?.maxAge);
    }
    return locale;
}
export { getLanguageFromCookie, setLanguageCookie, changeLanguage };