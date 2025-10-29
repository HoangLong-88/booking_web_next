import { useEffect } from "react";

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

function useLockBodyScroll(lock: boolean, onUnlock?: () => void ) {
  useEffect(() => {
    if (!lock) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';


    return () => {
      const top = document.body.style.top
      const scrollToY = -parseInt(top || '0', 10); 
    
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.overflow = originalOverflow;


      window.scrollTo(0, scrollToY);

      onUnlock?.();
    };
  }, [lock, onUnlock]);
}

export { SetUpNavbarScroll, useLockBodyScroll };