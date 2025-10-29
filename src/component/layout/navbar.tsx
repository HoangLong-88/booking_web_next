'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { LanguageSelector } from "../modal/language_selector";
import { SetUpNavbarScroll } from "@/utils/dom/Scroll";
import { Auth_Icon } from "../ui/Icon";

const navItems = [
  { name: "Stays", href: "/stays" },
  { name: "FlighSign Ints", href: "/flights" },
  { name: "Cars", href: "/cars" },
  { name: "Attractions", href: "/atractions" },
];

function NavBar({isAuthPage}:{isAuthPage: boolean}) {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navbarRef =  useRef<HTMLElement>(null)
    // const [isAuthenticated, user, logout, fetchCurrentUser] = useAuthStore()
    // const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (navbarRef.current) {
            const cleanup = SetUpNavbarScroll(navbarRef.current)
            return cleanup
        }
    }, [])  

    return (
        <nav ref={navbarRef} className={`${isAuthPage ? 'h-[5rem]' : 'h-[6.5rem]'} 
        fixed px-4 py-3 px-[2.5rem] flex justify-between z-35 w-full transition-transform duration-300 
         items-center shadow-sm`} style={{ background: "var(--navbar-background)"}}>
            {/* Logo */}
            <div>
                <div className={`font-bold ${ !isAuthPage ? 'text-5xl' : 'text-4xl'} text-amber-50`}>
                    <Link href="/">SKYLINK</Link>
                </div>
                {!isAuthPage && <div className="text-1xl text-amber-50">Your travel partner</div>} 
            </div>

            {/* Menu button (mobile) */}    
            <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                ☰
            </button>

            {/* Menu items */}
            {!isAuthPage &&
                <ul
                    className={`md:flex md:space-x-2 md:static  
                        absolute 
                        md:w-auto bg-(#C9AE85)
                        md:bg-transparent 
                        text-[#7e644e]
                        text-1xl 
                        transition-all ${mobileMenuOpen ? "top-12" : "-top-60"}`}
                >
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`py-2 px-3 rounded-2xl font-semibold transition-colors duration-200 ${
                                isActive
                                    ? `bg-transparent
                                        text-gray-100 border-1`
                                    : "text-gray-200 hover:bg-neutral-400"
                                }`} 
                            >
                                {item.name}
                            </Link>
                            </li>
                        );
                    })}
                </ul>
            }
            <div className={`md:flex md:space-x-6 absolute md:static left-0 w-full md:w-auto bg-blue-600 md:bg-transparent transition-all ${mobileMenuOpen ? "top-12" : "-top-60"
                    }`}>
                <LanguageSelector />
                {!isAuthPage && <Auth_Icon />}
            </div>
        </nav>
    );
}
export { NavBar };