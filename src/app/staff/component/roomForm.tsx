'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Input } from '@/component/ui/input'
import { Label } from '@/component/ui/label'
import FormSelect from '@/component/common/FormSelect'
import DragAndDropUpload from '@/component/ui/DragAndDropUpload'
import { useStayDetail } from '@/hook/stays/useStayDetails'
import { useRoomForm } from '../hook/useRoomForm'
import  { useMultipleFileUpload }  from "@/hook/useMultipleFileUpload"

export default function RoomsForm() {
  const {
  formData,
  roomTypeOptions,
  imagePreviews,
  onChange,
  setImages,
  submit,
  clearForm
} = useRoomForm(stayID)

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{stay.stayName} — Rooms</h1>
          <div className="text-sm text-slate-600">{stay.address}</div>
        </div>
        <Link href={`/stays/${stayID}`} className="text-sm text-emerald-700 hover:underline">Back to stay</Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: add room form */}
        <section className="lg:col-span-2 bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Add room</h2>

          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <Input name="roomName" value={form.roomName} onChange={onChange} placeholder="Room name" required />
              <Label>Room name</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <Input name="capacity" value={form.capacity} onChange={onChange} placeholder="Capacity" />
                <Label>Capacity</Label>
              </div>

              <div className="relative">
                <Input name="price" type="number" value={form.price} onChange={onChange} placeholder="Price" />
                <Label>Price</Label>
              </div>

              <div>
                <FormSelect
                  name="categoryID"
                  value={form.categoryID}
                  options={(stay?.categories ?? []).map((c: any) => ({ value: c.categoryID, label: c.categoryName }))}
                  placeholder="Category"
                  onChange={onChange}
                />
              </div>
            </div>

            <div>
              <Label className="!relative !mb-1">Description</Label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Description"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[88px] peer placeholder-transparent"
              />
            </div>

            <div>
              <Label className="!relative !mb-1">Images</Label>
              <DragAndDropUpload
                preview={imagePreviews}
                onUploadMultiple={handleFiles}
                accept="image/*"
                multiple
                havingImagePreview
              />
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={submitting} className="px-4 py-2 bg-emerald-700 text-white rounded-md">
                {submitting ? 'Adding...' : 'Add room'}
              </button>
              <button type="button" onClick={clearForm} className="px-4 py-2 border rounded-md">Clear</button>
              {message && <div className="text-sm text-slate-600">{message}</div>}
            </div>
          </form>
        </section>

        {/* RIGHT: room list */}
        <aside className="space-y-4">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-3">Rooms ({rooms.length})</h3>

            <ul className="flex flex-col gap-3">
              {rooms.map((r) => (
                <li key={r.id} className="flex items-center gap-3">
                  <div className="w-20 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {r.images && r.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.images[0]} alt={r.roomName} className="w-full h-full object-cover" />
                    ) : r.image_urls && r.image_urls[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.image_urls[0]} alt={r.roomName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">No photo</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{r.roomName ?? r.name ?? 'Untitled'}</div>
                      <div className="text-sm text-slate-500">${r.price ?? form.price}</div>
                    </div>
                    <div className="text-xs text-slate-600">{r.capacity} guests</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
}