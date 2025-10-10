import { Card, CardTitle, CardSubTitle } from "@/component/ui/Card";
import { 
  LateEscapeDeal,
  FamilyHoliday,
  CreditCardOffer, 
  DisabledDiscount
} from "@/component/ui/Image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="overflow-hidden bg-blue-300 text-black">
        <div className="p-10">
          <div className="font-bold text-5xl py-5">
            WELCOME TO MY WEBSITE!
          </div>
          <div className="font-bold text-2xl">
            Search low prices on hotels, homes and much more...
          </div>
        </div>
      </div>
      <div className="min-h-screen p-10 bg-white text-black overflow-hidden ">
        <p className="text-4xl font-bold mb-5 mt-10">
          Hot trending destination
        </p>
        <div className="pb-10">
          <div className="grid grid-cols-2 gap-3 py-3">
            <img className="rounded-xl h-80 w-full object-cover"
              src="https://static.vinwonders.com/production/Da-Nang-weather-in-November-1.jpg" alt="Danang" />
            <p className="absolute text-white p-3 text-4xl font-bold">
                Danang
            </p>
            <img className="rounded-xl h-80 w-full object-cover"
              src="https://1.bp.blogspot.com/-LkY1ZIjboUk/VENBGHRpQRI/AAAAAAAAPOc/3o4EXQiJyZs/s1600/Ben+Thanh+Market+2014.jpg" alt="HoChiMinhCity" />
          </div>
          <div className="grid grid-cols-3 gap-3 pb-10">
            <img className="rounded-xl h-full object-cover"
              src="https://www.gpsmycity.com/img/gd_sight/52374.jpg" alt="Hanoi" />
            <img className="rounded-xl h-full object-cover"
              src="https://premiumtravel.info/wp-content/uploads/2017/10/viet-nam-package-tour-9.jpg" alt="Hoian" />
            <img className="rounded-xl h-full object-cover"
              src="https://media.techcity.cloud/vietnam.vn/2023/06/2022052714322311-Chieu-Da-Lat-scaled.jpg" alt="DaLat" />
          </div>
        </div>
        <div className="pb-10">
            <p className="text-4xl font-bold pb-2">
                Hot Offers
            </p>
            <p className="text-stone-400 text-xl pb-5">
                Promotions, deals and special offers for you
            </p>
            <div className="grid grid-cols-2 gap-3">
                <LateEscapeDeal/>
                <FamilyHoliday />
                <CreditCardOffer />
                <DisabledDiscount />
            </div>
        </div>
        <p className="text-4xl font-bold mb-7 mt-10">
          Spotlight this month
        </p>
        <div className="grid grid-cols-3 gap-x-9 gap-y-3">
          <Card>
            <img src="https://th.bing.com/th?id=OIF.pTmjQ%2f%2bqj7%2bcAp9pNjClDw&cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Trang An sailing" className="h-50 w-full object-cover" />
            <div className="py-2 px-3">
              <CardSubTitle>
                ACTIVITIES FOR LOVERS
              </CardSubTitle>
              <CardTitle>
                Up to 15% off hotels
              </CardTitle>
              <p className="mt-1 mb-5">
                Book over 300,000 travel activities in more than 200 countries worldwide!
              </p>
              <Link href="/" className="text-blue-500 hover:underline py-2">
                Learn more
              </Link>
            </div>
          </Card>
          <Card>
            <img src="https://wallup.net/wp-content/uploads/2016/05/13/348370-relaxation-couple-men-women-landscape-nature-beach-sea-relaxing-tropical-vacation.jpg"
              alt="a-relaxtion-couple" className="h-50 w-full object-cover" />
            <div className="py-2 px-3">
              <CardSubTitle>
                ACTIVITIES FOR LOVERS
              </CardSubTitle>
              <CardTitle>
                BOO(k) a last-minute cruise deal
              </CardTitle>
              <p className="mt-1 mb-5">
                Book over 300,000 travel activities in more than 200 countries worldwide!
              </p>
              <Link href="/" className="text-blue-500 hover:underline">
                Learn more
              </Link>
            </div>
          </Card>
          <Card>
            <img src="https://indochinatreks.com/wp-content/uploads/2022/11/Ninh_binh_-boat-along-Ngo-Dong-River.jpg"
              alt="Trang An sailing" className="h-50 w-full object-cover" />
            <div className="py-2 px-3">
              <CardSubTitle>
                ACTIVITIES FOR LOVERS
              </CardSubTitle>
              <CardTitle>
                Trying VIETNAM Experiences
              </CardTitle>
              <p className="mt-1 mb-5">
                Book over 300,000 travel activities in more than 200 countries worldwide!
              </p>
              <Link href="/" className="text-blue-500 hover:underline">
                Learn more
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
