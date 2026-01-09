"use client";
import { Card, CardSubTitle, CardTitle } from "../ui/Card";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import TagsArrowScroll from "@/component/ui/TagScroll";
import { useFetchStayHomePage } from "@/hook/stays/useFetchStayHomePage";

export {
  StaysTagsArrowScroll,
  NoteTags
};

function StaysTagsArrowScroll() {
  const {stays, loading, error} = useFetchStayHomePage();
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
      <TagsArrowScroll>
        {stays.map((stay, index) => (
          <Link
            key={stay.stayID}
            href={`/stays/${stay.stayID}`}
          >
            <Card
              key={index}
              className="min-w-[270px] max-w-[420px] h-full rounded-2xl relative overflow-hidden duration-200 mb-2"
            >
              <img
                src={Array.isArray(stay?.images) ? stay.images[0] : stay?.images}
                alt={stay.stayName}
                className="object-cover h-45 w-full"
              />

              <div className="flex flex-col mx-3">
                <CardTitle className="text-lg my-1">
                  {stay.stayName}

                  <CardSubTitle className="text-xs">
                    {stay.address}
                  </CardSubTitle>

                  {/* Rate */}
                  <div className="inline-flex items-center gap-1 bg-sky-600 text-white rounded-md px-2 py-0.5 my-2 w-fit">
                    <span className="text-sm font-semibold">
                      {stay.rating ?? "N/A"}
                    </span>

                    <img
                      src="/icon/tags/blueStar.png"
                      alt="star"
                      className="w-4 h-4"
                    />
                  </div>

                  {/* Price */}
                  <div className="pt-10">
                    <p>
                      <span className="text-xs font-normal text-blue-400">
                        Starting with
                      </span>{" "}
                      {Number(stay.price).toLocaleString()} VND
                    </p>
                  </div>
                </CardTitle>
              </div>
            </Card>
          </Link>
        ))}
      </TagsArrowScroll>
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
        <Card key={tag.id} className="bg-orange-200 rounded-sm px-3 py-5 shadow-sm w-66">
          <img
            src={'/' + tag.img} alt={tag.name}
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
