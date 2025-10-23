import React from "react";
import Link from "next/link";
import { CustomButton } from "./Button";


const HeroHomePage: React.FC = () => {
    return (<div
          className="h-[420px] md:h-[520px] w-full bg-cover bg-center relative"
          style={{ backgroundImage: "url('https://www.nissanusa.com/content/dam/Nissan/us/rental-cars/nissan-rental-car-lineup-hero-v3.jpg.ximg.l_full_m.smart.jpg')" }}
        >
          <div className="absolute 
          inset-0 
          bg-gradient-to-r 
          from-black/70 
          via-black/30
          to-black/70 
          
          " />

          <div className="relative 
          z-10 
          max-w-7xl
           mx-auto 
           px-[2.5rem]
            h-full
             flex 
             flex-col
              justify-center">
            <h1 className="text-4xl
             md:text-6xl 
             lg:text-5xl
              font-extrabold 
              text-white 
              drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]
               leading-tight">
              Giảm đến 15% khi thuê<br/>xe
            </h1>

            <p className="mt-6 
            text-white/90 
            text-lg 
            md:text-xl 
            max-w-xl">
              Dịch vụ đặt xe tin cậy — nhanh chóng, tiện lợi cho mọi hành trình.
            </p>

            <div className="mt-8">
              <CustomButton asChild variant="default" size="lg" className="shadow-lg">
               <Link href="/book" className="px-6 py-2">
                 Đặt xe ngay bây giờ
               </Link>
             </CustomButton>
             <CustomButton asChild variant='ghost' size='lg'>
                <Link href="/learn-more" className="px-6 py-2">
                  Tìm hiểu thêm
                </Link>
             </CustomButton>
            </div>
          </div>
        </div>
    );
}
export { HeroHomePage };