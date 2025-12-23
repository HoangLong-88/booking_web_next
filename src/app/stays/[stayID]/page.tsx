'use client'
import React, { useState, use } from 'react'
import Link from 'next/link'
import { Input } from '@/component/ui/input'
import { Label } from '@/component/ui/label'
import FormSelect from '@/component/common/FormSelect'
import { useStayDetail } from '@/hook/stays/useStayDetails'
import { ReviewForm } from '@/component/stays/reviewForm'
import ReviewsSection from '@/component/review/reviewSection'
export default function StayDetailPage({
  params,
}: {
  params: Promise<{ stayID: string }>;
}) {
  const { stayID } = use(params);
  const [refreshKey, setRefreshKey] = useState(0);
    const { stay, loading, error } = useStayDetail(stayID, refreshKey);
  const handleReviewSuccess = () => {
    setRefreshKey((prev) => prev + 1); // trigger re-fetch
  };

  if (!stay) return
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 mt-[var(--spacing-top)]">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Center: gallery + info */}
        <section className="lg:col-span-2">
          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-serif text-slate-900 mb-4">{stay.stayName}</h1>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="col-span-1 row-span-2">
              <img
                src={stay.image_urls[0]}
                className="w-full h-full object-cover rounded-md shadow-sm"
              />
            </div>

            {stay.image_urls.slice(1, 5).map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${stay.stayName} ${i + 2}`}
                className="w-full h-28 object-cover rounded-md shadow-sm"
              />
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-slate-500">{stay.location}</div>
              <div className="mt-2 text-lg font-medium text-slate-900">{stay.address}</div>
            </div>

            <div className="space-y-2 text-right">
              <button className="inline-flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-md shadow hover:bg-emerald-800 transition">
                Check availability
              </button>
              <button className="inline-flex items-center gap-2 bg-white border px-3 py-1 rounded-md text-sm hover:shadow-sm transition">
                Share
              </button>
            </div>
          </div>

          {/* Tag / rating */}
          <div className="flex gap-4 items-center mb-6">
            <div className="rounded-lg border p-4 min-w-[220px] bg-white shadow-sm">
              <div className="text-sm text-slate-600">Guest Favourite</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="text-2xl font-semibold">{stay.rating !== null ? stay.rating : "—"}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <article className="prose prose-slate max-w-none">
            <h2 className="text-lg font-medium">Comfortably furnished rooms</h2>
          </article>
          <section aria-labelledby="reviews-heading" className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 id="reviews-heading" className="text-lg font-medium">Reviews</h3>
              <div className="text-sm text-slate-500">{stay.reviews ? stay.reviews.length : ""} total</div>
            </div>

            <div className="flex flex-col gap-5 ">
              <div>
                <ReviewForm serviceID={stay.serviceID} onSuccess={handleReviewSuccess}/>
              </div>

              <div className='w-full'>
                <ReviewsSection reviews={stay.reviews ?? []} onReviewDeleted={handleReviewSuccess} />
              </div>
            </div>
          </section>
        </section>

        {/* Right: booking card */}
        <aside className="space-y-4">
          <div className="sticky top-6 rounded-lg bg-white border p-4 shadow-sm">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-xs text-slate-500">From</div>
                <div className="text-2xl font-semibold">${stay.price}</div>
                <div className="text-xs text-slate-500">per night</div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium">{stay.rating !== null ? stay.rating : "—"}</div>
                <div className="text-xs text-slate-500">reviews</div>
              </div>
            </div>

            <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Label className="!relative !mb-1">Check-in</Label>
                <Input name="checkin" type="date" className="mt-1" />
              </div>

              <div>
                <Label className="!relative !mb-1">Check-out</Label>
                <Input name="checkout" type="date" className="mt-1" />
              </div>

              <div>
                <Label className="!relative !mb-1">Guests</Label>
                <FormSelect
                  name="guests"
                  value=""
                  options={[
                    { value: '1', label: '1 guest' },
                    { value: '2', label: '2 guests' },
                    { value: '3', label: '3 guests' },
                    { value: '4', label: '4 guests' }
                  ]}
                  onChange={() => {}}
                />
              </div>

              <button className="w-full bg-emerald-700 text-white py-2 rounded-md mt-2">Check availability</button>
            </form>
          </div>

          {/* Quick info card */}
          <div className="rounded-lg bg-white border p-4 text-sm shadow-sm">
            <div className="font-medium mb-2">What this place offers</div>
              <p>{stay.description}</p>
          </div>
        </aside>
      </div>
    </main>
  )
}