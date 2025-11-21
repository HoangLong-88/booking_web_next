"use client";
import { Card, CardSubTitle, CardTitle } from "./Card";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { describe } from "node:test";
import { useTranslation } from "react-i18next";
export {
  HotelTagsArrowScroll,
  NoteTags
};


function HotelTagsArrowScroll() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const DanangHotelTag = [
    {
      id: 1,
      name: 'Hilton Danang',
      address: '50 Bach Dang St, Hai Chau Ward, Da Nang',
      rate: 4.9,
      price: '3,538,394',
      reviews: {
        quantity: 9999,
        level: 'Exceptional'
      },
      href: '/staylink?=',
      img: 'https://th.bing.com/th/id/R.102644a9d897e34d7648b61caed9fa71?rik=myKPuKNPDr%2bXBA&pid=ImgRaw&r=0',
    },
    {
      id: 2,
      name: 'Diamond Sea Hotel',
      address: '232 Vo Nguyen Giap St, Ngu Hanh Son Ward, Da Nang',
      rate: 4.9,
      price: '3,538,394',
      reviews: {
        quantity: 9999,
        level: 'Exceptional'
      },
      href: '/staylink?=',
      img: 'https://pix10.agoda.net/hotelImages/861432/-1/1c1abb90c28013840d46e9ef77ced95f.jpg?s=1024x768',
    },
    {
      id: 3,
      name: 'HAIAN beach hotel & spa',
      address: '277 Vo Nguyen Giap St, Ngu Hanh Son Ward, Da Nang',
      rate: 4.9,
      price: '3,538,394',
      reviews: {
        quantity: 9999,
        level: 'Exceptional'
      },
      href: '/staylink?=',
      img: 'https://indochinatreks.com/wp-content/uploads/2022/12/Haian-h-1swim.jpg',
    },
    {
      id: 4,
      name: 'Furama Villas Danang',
      address: '107 Vo Nguyen Giap St, Ngu Hanh Son Ward, Da Nang',
      rate: 4.9,
      price: '3,538,394',
      reviews: {
        quantity: 9999,
        level: 'Exceptional'
      },
      href: '/staylink?=',
      img: 'https://www.ministryofvillas.com/wp-content/uploads/2018/08/vietnam-furamavillasdanang-04.jpg',
    },
    {
      id: 5,
      name: 'DLG Hotel Danang',
      address: '258 Vo Nguyen Giap St, Ngu Hanh Son Ward, Da Nang',
      rate: 4.9,
      price: '3,538,394',
      reviews: {
        quantity: 9999,
        level: 'Exceptional'
      },
      href: '/staylink?=',
      img: 'https://media.mia.vn/uploads/blog-du-lich/dlg-hotel-danang-khach-san-5-sao-thanh-lich-sang-trong-va-cao-cap-01-1653437999.jpg'
    }
  ];

  // Scroll handler
  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 400; // px per click
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Theo dõi khi cuộn để ẩn hiện mũi tên
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    handleScroll(); // khởi tạo
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* Nút trái */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/4 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Thanh tag */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar py-2"
      >
        {DanangHotelTag.map(tag => (
          <Link href={`/stays/${tag.href}${tag.name}`}
            className="block"
          >
            <Card
              key={tag.id}
              className="min-w-[270px] max-w-[420px] h-full rounded-2xl relative overflow-hidden duration-200 mb-2"
            >
              <img
                src={tag.img}
                alt={tag.name}
                className="object-cover h-45"
              />
              <div className="mx-3">
                <CardTitle className="text-lg my-1">
                  {tag.name}
                  <CardSubTitle className="text-xs">
                    {tag.address}
                  </CardSubTitle>
                  {/* Rate & reviews */}
                  <div className="flex my-2">
                    <p className="text-base mx-1/2">
                      {tag.rate}
                    </p>
                    <img src="icon/tags/blueStar.png"
                      alt="blueskystar"
                      className="w-5 h-5 rounded-sm" />
                    <div className="mx-2">
                      <p className="text-sm">{tag.reviews?.level}</p>
                      <p className="text-xs font-normal">Reviews: {tag.reviews?.quantity}</p>
                    </div>
                  </div>
                  <div className="justify-items-end pt-10">
                    <p>
                      <span className="text-xs font-normal text-blue-400">Starting with</span> {tag.price} VND</p>
                  </div>
                </CardTitle>
              </div>
            </Card>
          </Link>

        ))}
      </div>

      {/* Nút phải */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/4 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

function NoteTags() {
  const { t } = useTranslation()
  const WhyTag = [
    {
      id: 1,
      name: 'booking-icon',
      content: t('homepage:note_tags.why_tags.id_1.content'),
      description: t('homepage:note_tags.why_tags.id_1.description'),
      img: 'icon/tags/booking-icon.png'
    },
    {
      id: 2,
      name: 'loving-favourite-icon',
      content: 'Hơn 5 triệu đánh giá từ khách khác',
      description: 'Tham khảo thông tin đáng tin cậy từ du khách như bạn',
      img: 'icon/tags/heart-favourite-icon.png'
    },
    {
      id: 3,
      name: 'map-guide-icon',
      content: 'Hơn 50 ngàn chỗ nghỉ trên toàn quốc',
      description: 'Khách sạn, guest house, căn hộ và nhiều loại chỗ ở khác…',
      img: 'icon/tags/pngtree-meb-map-guide.png',
    },
    {
      id: 4,
      name: 'customer-service-assistant-icon',
      content: 'Dịch vụ khách hàng đáng tin cậy, hoạt động 24/7',
      description: 'Chúng tôi luôn sẵn sàng giúp đỡ bạn',
      img: 'icon/tags/CustomerServiceAssistant.png',
    }
  ];

  return (
    <div className="grid grid-cols-4">
      {WhyTag.map((tag) => (
        <Card className="bg-orange-200 rounded-sm px-3 py-5 shadow-sm w-66">
          <img
            key={tag.id} src={'/' + tag.img} alt={tag.name}
            className="w-17 h-17 rounded-xl"
          />
          <div className="mt-5">
              <p className="text-xl font-bold">{tag.content}</p>
              <p className="text-sm py-2">{tag.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
