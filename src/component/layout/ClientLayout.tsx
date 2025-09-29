import { Footer } from "@/component/layout/footer";
import { NavBar } from "@/component/layout/navbar";

export function ClientLayout({children}:{
    children: React.ReactNode
}){
    
    return(
        <div className="flex min-h-screen flex-col">
        <NavBar/>
        <main className="flex-1">{children}</main>
        <Footer/>
        </div>
    )
}