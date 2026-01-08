'use client'
import React, { useState, useRef, useEffect, use } from 'react'
import Link from 'next/link'
import { Input } from '@/component/ui/input'
import { useStayDetail } from '@/hook/stays/useStayDetails'
import { ReviewForm } from '@/component/review/reviewForm'
import ReviewsSection from '@/component/review/reviewSection'
import { useRoomsByStay } from '@/hook/rooms/useRoomsByStay'
import RoomCard from '@/component/room/RoomCard'
import { SetUpNavbarScroll } from "@/utils/dom/Scroll";
import type { StayDetail } from '@/types/stays';
import { HeaderStayContent } from '@/component/stays/headerStayContent'
import { useRoomAvailability } from '@/hook/rooms/useRoomAvailability'

export default function StayDetailPage({
  params,
}: {
  params: Promise<{ stayID: string }>;
}) {
  const { stayID } = use(params);
  const [refreshKey, setRefreshKey] = useState(0);
    const { stay } = useStayDetail(stayID, refreshKey);
  const { rooms, loading: roomsLoading, error: roomsError } = useRoomsByStay(stayID);
    const hook = useRoomAvailability(stayID, rooms, () => {
      setRefreshKey((k) => k + 1);
    });
  const handleReviewSuccess = () => {
    setRefreshKey((prev) => prev + 1); // trigger re-fetch
  };
  const [navbarHidden, setNavbarHidden] = useState(false);
  const navbarRef =  useRef<HTMLDivElement>(null)
  useEffect(() => {
        if (!navbarRef.current) return; 
        const initialHidden = window.scrollY > 50;
        setNavbarHidden(initialHidden);
        navbarRef.current.style.transform = initialHidden ? 'translateY(-100%)' : 'translateY(0%)';
        
        const cleanup = SetUpNavbarScroll(navbarRef.current, setNavbarHidden);
  
        return () => {
          if (cleanup) cleanup();
        };
      }, []);

  return (
    <>
      <div 
      ref={navbarRef}
      className=" 
        lg:col-span-1 right-0 mx-10 fixed z-30
        flex items-center 
        transition-all duration-300"
          style={{
            top: navbarHidden ? 250 : 130,
            transform: navbarHidden ? 'translateY(-100%)' : 'translateY(0%)',
        }}>
      <HeaderStayContent hook={hook} stay={stay} />
      </div>
    {stay ? <main className="max-w-6xl mx-auto px-4 py-10 mt-[var(--spacing-top)]">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-6">
        <ol className="flex gap-2 items-center">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li>→</li>
          <li><Link href="/stays" className="hover:underline">Stays</Link></li>
          <li>→</li>
          <li className="text-gray-900">{stay.location}</li>
        </ol>
      </nav>

      <section className="-mx-6 mb-10">
      {/* Title */}
      <div className="px-6">
        <h1 className="text-2xl lg:text-3xl font-serif text-slate-900">
          {stay.stayName}
        </h1>
      </div>

      {/* Gallery */}
      <div className="mt-4 grid grid-cols-2 gap-2 px-6">
        <div className="row-span-2">
          <img
            src={stay.image_urls[0]}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {stay.image_urls.slice(1, 5).map((src, i) => (
          <img
            key={i}
            src={src}
            className="h-28 w-full object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Location + CTA */}
      <div className="px-6 mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{stay.location}</p>
          <p className="text-lg font-medium">{stay.address}</p>
        </div>
      </div>
    </section>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="lg:col-span-full space-y-10">
        <div className="border rounded-lg p-4 bg-white shadow-sm w-fit">
          <p className="text-sm text-slate-500">Guest favourite</p>
          <p className="text-2xl font-semibold mt-2">
            {stay.rating ?? "—"}
          </p>
        </div>
        <article className="prose prose-slate max-w-none">
          <h2>Comfortably furnished rooms</h2>
          <p>{stay.description}</p>
        </article>
          <section aria-labelledby="rooms-heading" className='w-full'>
            <h2 id="rooms-heading" className="text-lg font-medium mb-4">
              Rooms
            </h2>

            <div className="flex flex-col gap-4">
              {hook.loading && <p>Loading rooms...</p>}
              {hook.error && <p>Error loading rooms</p>}
              {hook.roomsToShow?.map((room) => {
                const isAvailable =
                  hook.dates.check_in && hook.dates.check_out
                    ? (room.availableQuantity ?? 0) > 0
                    : true;

                return (
                  <div
                    key={room.id}
                    className={`transition ${
                      !isAvailable ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <RoomCard room={room} />
                  </div>
                );
              })}
            </div>
          </section>
          <section aria-labelledby="reviews-heading">
            <div className="flex items-center justify-between mb-4">
              <h3 id="reviews-heading" className="text-lg font-medium">
                Reviews
              </h3>
              <span className="text-sm text-slate-500">
                {stay.reviews?.length ?? 0} total
              </span>
            </div>

            <div className="space-y-6">
              <ReviewForm
                serviceID={stay.serviceID}
                onSuccess={handleReviewSuccess}
              />

              <ReviewsSection
                reviews={stay.reviews ?? []}
                onReviewDeleted={handleReviewSuccess}
              />
            </div>
          </section>
        </section>
      </div>
    </main> : null}
    </>
  )
}
