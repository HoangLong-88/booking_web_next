'use client'
import { Footer } from "@/component/layout/footer";
import { NavBar } from "@/component/layout/navbar";
import { usePathname } from "next/navigation";

export function ClientLayout({children}:{children: React.ReactNode}){
    const pathName = usePathname()
    const isAuthPage = pathName.startsWith("/auth")
    const isAdminPage = pathName.startsWith("/admin")
    
    return(
        <div className="flex min-h-screen flex-col">
        <NavBar isAuthPage={isAuthPage} isAdminPage={isAdminPage}/>
        <main 
              className={isAdminPage ? "flex-1 pt-[72px]" : "flex-1"}
            >
              {children}
        </main>
        {!isAuthPage && !isAdminPage && <Footer/>}
        </div>
    )
}