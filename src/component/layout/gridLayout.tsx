'client server'
import Link from "next/link"
export { TrendingDestinationsRecommendation }


function TrendingDestinationsRecommendation() {
    return (
        <>
            <p className="text-4xl font-bold mb-5 mt-10">
                Hot trending destinations
            </p>
            <div className="pb-10">
                <div className="grid grid-cols-2 gap-3 py-3">
                    <Link href='/' className="relative block">
                        <img className="rounded-xl h-80 w-full object-cover"
                            src="https://static.vinwonders.com/production/Da-Nang-weather-in-November-1.jpg" alt="Danang" />
                        <p className="absolute text-white p-3 text-2xl font-bold top-0 flex">
                            <img 
                            src="/icon/flags/vietnam.png" 
                            alt="vn" 
                            className="w-7 h-7 mr-2"/>
                            Danang 
                        </p>
                    </Link>
                    <Link href='/' className="relative block">
                        <img className="rounded-xl h-80 w-full object-cover"
                            src="https://1.bp.blogspot.com/-LkY1ZIjboUk/VENBGHRpQRI/AAAAAAAAPOc/3o4EXQiJyZs/s1600/Ben+Thanh+Market+2014.jpg" alt="HoChiMinhCity" />
                        <p className="absolute text-white p-3 text-2xl font-bold top-0 flex">
                            <img 
                            src="/icon/flags/vietnam.png" 
                            alt="vn" 
                            className="w-7 h-7 mr-2"/>
                            Ho Chi Minh City
                        </p>
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-3 pb-10">
                    <Link href='/' className="relative block">
                        <img className="rounded-xl h-full object-cover"
                            src="https://www.gpsmycity.com/img/gd_sight/52374.jpg" alt="Hanoi" />
                        <p className="absolute text-white p-3 text-2xl font-bold top-0 flex">
                            <img 
                            src="/icon/flags/vietnam.png" 
                            alt="vn" 
                            className="w-7 h-7 mr-2"/>
                            Hanoi
                        </p>
                    </Link>
                    <Link href='/' className="relative block">
                        <img className="rounded-xl h-full object-cover"
                            src="https://premiumtravel.info/wp-content/uploads/2017/10/viet-nam-package-tour-9.jpg" alt="Hoian" />
                        <p className="absolute text-white p-3 text-2xl font-bold top-0 flex">
                            <img 
                            src="/icon/flags/vietnam.png" 
                            alt="vn" 
                            className="w-7 h-7 mr-2"/>
                            Hoi An
                        </p>
                    </Link>
                    <Link href='/' className="relative block">
                        <img className="rounded-xl h-full object-cover"
                            src="https://media.techcity.cloud/vietnam.vn/2023/06/2022052714322311-Chieu-Da-Lat-scaled.jpg" alt="DaLat" />
                            <p className="absolute text-white p-3 text-2xl font-bold top-0 flex">
                            <img 
                            src="/icon/flags/vietnam.png" 
                            alt="vn" 
                            className="w-7 h-7 mr-2"/>
                            Da Lat
                        </p>
                    </Link>
                </div>
            </div>
        </>
    )
}



