import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import {useAuthStore} from "@/";


export function NavBar(){
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    // const [isAuthenticated, user, logout, fetchCurrentUser] = useAuthStore()
    const [mounted, setMounted] = useState(false)
}