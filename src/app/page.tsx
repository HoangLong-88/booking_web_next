import { Card, CardTitle, CardSubTitle } from "@/component/ui/Card";
import {
  LateEscapeDeal,
  FamilyHoliday,
  CreditCardOffer,
  DisabledDiscount
} from "@/component/ui/Image";
import Link from "next/link";
import { HomeSearchBar } from "@/component/ui/SearchBar";
import { HeroHomePage } from "@/component/layout/Hero";
import { HotelTagsArrowScroll, NoteTags } from "@/component/ui/TagScroll";
import { TrendingDestinationsRecommendation } from "@/component/layout/gridLayout";


export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <header className="mt-[var(--spacing-top)]">
        {/* background image + dark vignette */}
        <HeroHomePage />
        <HomeSearchBar />
      </header>
      <div className="min-h-screen p-20 bg-white text-black overflow-hidden">
        <TrendingDestinationsRecommendation/>
        <div className="pb-10">
          <p className="text-4xl font-bold pb-2">
            Hot Offers
          </p>
          <p className="text-stone-400 text-xl pb-5">
            Promotions, deals and special offers for you
          </p>
          <div className="grid grid-cols-2 gap-3">
            <LateEscapeDeal />
            <FamilyHoliday />
            <CreditCardOffer />
            <DisabledDiscount />
          </div>
        </div>
        <p className="text-3xl font-bold mb-7 mt-10">
          Spotlight this month
        </p>
        <div className="grid grid-cols-3 gap-x-9 gap-y-3">
          <Card>
            <img src="https://img.freepik.com/premium-photo/young-woman-wearing-denim-jacket-hat-stands-city-street-with-her-backpack-phone-her-hand-sun-is-setting-background_14117-717019.jpg"
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
        <div className="mb-7 mt-15">
          <p className="text-3xl font-bold">Stay Guest Love</p>
          <HotelTagsArrowScroll />
        </div>
        <div className="mb-7 mt-20">
            <p className="text-2xl font-bold mb-5">Why should be SKYLINK ?</p>
            <NoteTags/>
        </div>
      </div>
    </>
  );
}
