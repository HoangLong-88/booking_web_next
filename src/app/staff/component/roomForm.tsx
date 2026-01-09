'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Input } from '@/component/ui/input'
import { Label } from '@/component/ui/label'
import { CustomButton } from '@/component/ui/Button'
import FormSelect from '@/component/common/FormSelect'
import DragAndDropUpload from '@/component/ui/DragAndDropUpload'
import { useRoomForm } from '../hook/useRoomForm'
import  { useMultipleFileUpload }  from "@/hook/useMultipleFileUpload"
import { StaySearchBar } from '@/component/home/StaySearchBar'
import { SetUpNavbarScroll } from "@/utils/dom/Scroll";
import type { StaySuggestion } from '@/types/stays'
import { useRoomsByStay } from '@/hook/rooms/useRoomsByStay'
import { Stroke_Loader } from '@/component/ui/Icon'
import { EllipsisVertical, Trash2 } from 'lucide-react';

export default function RoomsForm() {
  const {
    formData,
    options,
    roomTypeOptions,
    onChange,
    setImages,
    addImage,
    clearForm,
    submit
} = useRoomForm()
    const [navbarHidden, setNavbarHidden] = useState(false);
    const navbarRef =  useRef<HTMLDivElement>(null)
  const {
    previews,
    createPreviews,
    clear,
    handleUpload,
    } = useMultipleFileUpload ({
        onUploaded: async (files) => {
            setImages(files.map(f => f.path))
        },
    })
  const [reloadKey, setReloadKey] = useState(0);

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [selectedStay, setSelectedStay] = useState<StaySuggestion | null>(null);
  
  const { rooms, loading, error } =
    useRoomsByStay(selectedStay?.stayID, reloadKey);
  useEffect(() => {

      if (!navbarRef.current) return; 
      const initialHidden = window.scrollY > 50;
      setNavbarHidden(initialHidden);
      navbarRef.current.style.transform = initialHidden ? 'translateY(-100%)' : 'translateY(0)';
      
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
        fixed left-0 right-0 z-30
        flex items-center 
        transition-all duration-300
      " 
      style={{
          top: navbarHidden ? 135 : 165,
          transform: navbarHidden ? 'translateY(-100%)' : 'translateY(0)'
      }}>
        <StaySearchBar 
          showDatePicker={false} 
          havingSearchButton={false}
          className='!max-w-3xl'
          formClassName='!bg-gray-800' 
          keySuggestClassName='!bg-gray-800' 
          onSelectStay={(stay) => {
            setSelectedStay(stay)
            setReloadKey(prev => prev + 1)
          }}
        />
    </div>
    <main className="max-w-6xl mx-auto px-4 py-10 mt-[3rem]">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{selectedStay?.stayName + ' — '} Rooms</h1>
          <div className="text-sm text-slate-600">{selectedStay?.address}</div>
        </div>  
        <Link href={`/stays/${selectedStay?.stayID}`} className="text-sm text-emerald-700 hover:underline">Back to stay</Link>
      </header>

      <div className="flex flex-row gap-6">
        <section className="max-w-[26rem] lg:col-span-2 dark:bg- border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Add room {'— ' + selectedStay?.stayName}</h2>

          <form 
          onSubmit={async (e) => {
            e.preventDefault()
            setSubmitting(true)
            setMessage(null)
            try {
                if (!selectedStay) {
                  setMessage('Please select a stay first')
                  return
                } 

                const uploaded = await handleUpload('uploads/rooms');
    
                formData.stayID = selectedStay?.stayID || ''

                await submit(uploaded.map(f => f.path))
                setMessage('Created room successfully')
                setReloadKey(prev => prev + 1)
            } catch (err) {
                console.error(err)
              setMessage('Failed to create stay')
            } finally {
                setSubmitting(false)
            }
          }} 
          className="space-y-2">
            <div className="relative">
              <Input name="roomName" value={formData.roomName} onChange={onChange} placeholder="Room name" required />
              <Label>Room name</Label>
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative">
                <Input name="capacity" value={formData.capacity} onChange={onChange} placeholder="Capacity" />
                <Label>Capacity</Label>
              </div>
              <div className="relative">
                <Input name="quantity" value={formData.quantity} onChange={onChange} placeholder="Quantity" />
                <Label>Quantity</Label>
              </div>
              <div className="relative">
                <Input 
                name="currentPrice" 
                type="number" 
                min={0}
                step={1000}
                value={formData.currentPrice}
                onChange={onChange} 

                placeholder="Price" />
                <Label>Price</Label>
              </div>

              <div>
                <FormSelect
                  name="roomTypeID"
                  value={formData.roomTypeID}
                  options={roomTypeOptions.map(option => ({ value: option.value, label: option.label }))}
                  placeholder="Room type"
                  onChange={onChange}
                />
              </div>
            </div>

            <div>
              <Label className="!relative !mb-1">Description</Label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                placeholder="Description"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[88px] peer placeholder-transparent"
              />
            </div>

            <div>
              <Label className="!relative !mb-1">Images</Label>
              <DragAndDropUpload
                preview={previews}
                onUploadMultiple={createPreviews}
                accept="image/*"
                multiple
                havingImagePreview
              />
            </div>

            <div className="flex items-center gap-3">
              <CustomButton 
                type="submit" 
                onClick={addImage}
                disabled={submitting} 
                className="px-4 py-2 bg-emerald-700 text-white rounded-md">
                {submitting ? 'Adding...' : 'Add room'}
              </CustomButton>
              <CustomButton type="button" onClick={() => {clearForm(); clear()}} className="px-4 py-2 border rounded-md">
                Clear
              </CustomButton>
              {message && <div className="text-sm text-slate-600">{message}</div>}
            </div>
          </form>
        </section>
        <aside className="space-y-4 flex-1">
          <div className="bg-gray-800 border rounded-lg p-4 shadow-sm">
            {loading ? 
              <div className='flex items-center justify-center'>
                <Stroke_Loader
                 /> 
              </div>
            : <>
              <h3 className="font-medium mb-3">Rooms ({rooms.length})</h3>

              <ul className="flex flex-col gap-3 bg-gray-800">
                {rooms.map((r) => (
                  <li key={r.id} className="flex items-start bg-gray-800 gap-3">
                    <div className="w-20 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      {r.image_urls && r.image_urls[0] ? (
                        <img src={r.image_urls[0]} alt={r.roomName} className="w-full h-full object-cover" />
                      ) : r.image_urls && r.image_urls[0] ? (
                        <img src={r.image_urls[0]} alt={r.roomName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">No photo</div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="font-extrabold text-md rounded-lg mb-2">
                        {r.roomName ?? 'Untitled'}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-sm text-white bg-emerald-900 rounded-lg px-2 py-1">
                          ${r.currentPrice ?? '__'}
                        </div>

                        <div className="text-xs text-white font-bold bg-slate-700 rounded-lg px-2 py-1">
                          {r.capacity} guests
                        </div>

                        <div className="text-xs text-white font-bold bg-slate-700 rounded-lg px-2 py-1">
                          {r.roomType} 
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>}
          </div>
        </aside>
      </div>
    </main>
    </>
  )
}