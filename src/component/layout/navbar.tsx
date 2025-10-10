'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import {useAuthStore} from "@/";

const Nav = [
    {name: 'Stays',href: '/stays', }
]

export function NavBar() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    // const [isAuthenticated, user, logout, fetchCurrentUser] = useAuthStore()
    // const [mounted, setMounted] = useState(false)

    return (
        <nav className="bg-blue-300 text-black px-10 py-3 flex justify-between items-center">
            {/* Logo */}
            <div className="font-bold text-3xl mr-7">
                <Link href="/">SKYLINK</Link>
            </div> 

            {/* Menu button (mobile) */}
            <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                ☰
            </button>

            {/* Menu items */}
            <ul
                className={`ml-20 md:flex md:space-x-6 absolute md:static left-0 w-full md:w-auto bg-blue-600 
                    md:bg-transparent transition-all ${mobileMenuOpen ? "top-12" : "-top-60"}`}
            >
                <li className="p-2 md:p-0">
                    <Link href="/stays">Stays</Link>
                </li>
                <li className="p-2 md:p-0">
                    <Link href="/flights">Flights</Link>
                </li>
                <li className="p-2 md:p-0">
                    <Link href="/cars">Cars</Link>
                </li>
                <li className="p-2 md:p-0">
                    <Link href="/atractions">Attractions</Link>
                </li>
                <li className="p-2 md:p-0">
                    <Link href="/taxis">Taxis</Link>
                </li>
            </ul>

            <div className={`md:flex md:space-x-6 absolute md:static left-0 w-full md:w-auto bg-blue-600 md:bg-transparent transition-all ${mobileMenuOpen ? "top-12" : "-top-60"
                    }`}>
                <button className="rounded-xl">
                        VND
                </button>
                <div>🇻🇳</div>
                <div>Sign Up</div>
                <div>Sign In</div>
            </div>
        </nav>
    );
}