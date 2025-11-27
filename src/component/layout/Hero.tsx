import React from "react";
import Link from "next/link";
import { CustomButton } from "../ui/Button";


const HeroHomePage: React.FC = () => {
    return (<div
          className="h-[420px] md:h-[490px] w-full bg-cover bg-center "
          style={{ backgroundImage: "url('https://overatours.com/wp-content/uploads/2024/06/Scenery-view.jpg')" }}
        >
          <div className="relative 
          
          inset-0 
          bg-gradient-to-r 
          from-black/60 
          via-black/5
          to-black/60 
          
          " />

          <div className="relative 
          z-10 
           mx-[2.5rem]
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
              Giảm đến 15% khi đặt<br/>tham gia các trải nghiệm
            </h1>

            <p className="mt-6 
            text-white/90 
            text-lg 
            md:text-xl 
            max-w-xl">
              Dịch vụ đặt các hoạt động trải nghiệm tin cậy — nhanh chóng, tiện lợi và đáng giá cho mọi hành trình.
            </p>

            <div className="mt-8">
              <CustomButton asChild variant="default" size="lg" className="mr-[1.5rem]">
               <Link href="/" className="px-6 py-2 text-white hover:bg-white hover:text-sky-400 hover">
                 ĐẶT NGAY ĐÂY
               </Link>
             </CustomButton>
             <CustomButton asChild variant='ghost' size='lg'>
                <Link href="/learn-more" className="px-6 py-2 hover:text-white hover:border-white text-orange-400 border-1 border-orange-300">
                  Tìm hiểu thêm
                </Link>
             </CustomButton>
            </div>
          </div>
        </div>
    );
};

const HeroAttractionsPage: React.FC = () => {
    return(
      <>
        <div
          className="h-[420px] md:h-[475px] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://localvietnam.com/wp-content/uploads/2024/07/driving-motorbike-sapa-2.jpg')" }}
        >
          <div className="relative 
          
          inset-0 
          bg-gradient-to-r 
          from-black/60 
          via-black/5
          to-black/60 
          
          " />
          <div className="relative 
          z-10 
           mx-[2.5rem]
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
                Hãy thử trải nghiệm theo<br /> cách mà bạn yêu thích
            </h1>

            <p className="mt-6 
            text-white/90 
            text-lg 
            md:text-xl 
            max-w-xl">
              Dịch vụ đặt các hoạt động trải nghiệm tin cậy — nhanh chóng, tiện lợi và đáng giá cho mọi hành trình.
            </p>
          </div>
        </div>
      </>
    );
};


const HeroCarPage: React.FC = () => {
    return(
      <>
        <div
          className="h-[420px] md:h-[475px] w-full bg-cover bg-center "
          style={{ backgroundImage: "url('https://www.nissanusa.com/content/dam/Nissan/us/rental-cars/nissan-rental-car-lineup-hero-v3.jpg.ximg.l_full_m.smart.jpg')" }}
        ></div>
      </>
    );
};


export { HeroHomePage , HeroAttractionsPage, HeroCarPage};