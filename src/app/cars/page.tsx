import { HeroCarPage } from "@/component/layout/Hero";
import { QAList } from "@/component/ui/Dropdown";
import { CarSearchBar } from "@/component/ui/SearchBar";
import { title } from "process";

export default function CarsPage() {
  const Ads = [
    {
      title: 'Sẵn sàng hỗ trợ bạn',
      description: 'Hỗ trợ khách hàng bằng hơn 5 ngôn ngữ',
      img: '/icon/tags/calling-assistant.png',
      alt: 'SupportService',

    },
    {
      title: 'Miễn phí hủy xe',
      description: 'Lên đến 48 giờ trước khi nhận xe, đối với hầu hết đơn đặt',
      img: '/icon/tags/time-schedule-vector.png',
      alt: 'FreeCarCancel',
    },
    {
      title: 'Hơn 1 triệu đánh giá',
      description: 'Bởi khách hàng thật đã được xác minh',
      img: '/icon/tags/rating-vector.png',

      alt: 'RatingReviews',
    },
  ]

  return (
    <>
      <header className="mt-[var(--spacing-top)]">
        <HeroCarPage />
        <CarSearchBar />
      </header>
      <main className="px-20 py-3">
        <p className="text-3xl font-semibold mb-3 mt-5 text-center text-orange-300">Thuê xe với SKYLINK</p>
        <div className="bg-sky-100 py-17 flex mb-12 rounded-xl border-3 border-orange-300">
            {Ads.map((item) => (
              <div className="flex items-center mx-10">
                <img src={item.img} alt={item.alt} className="w-22 h-22" />
                <div className="ml-2">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-xs">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        <div>
          <p className="text-2xl font-bold">Các câu hỏi thường gặp</p>
          <QAList />
        </div>
      </main>
    </>
  );
}
