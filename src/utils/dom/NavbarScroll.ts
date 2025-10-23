let lastScrollY = 0

function navbarScroll(navbar: HTMLElement) {

    const mobileBreakpoint = 768;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollThreshold = documentHeight * 0.25;

        if (window.innerWidth < mobileBreakpoint) {
            navbar.style.transform = 'translateY(0)';
            return;
        }
        if (currentScrollY > scrollThreshold && currentScrollY > lastScrollY) {
            navbar.style.transform = 'translateY(-100%)';
        }
        if (currentScrollY <= scrollThreshold) {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
    };
}
function SetUpNavbarScroll(navbar: HTMLElement) {
    if (!navbar) {
        return
    }
    return navbarScroll(navbar)
}
export { SetUpNavbarScroll };