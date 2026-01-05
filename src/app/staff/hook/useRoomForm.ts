'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { roomService } from '@/app/staff/service/room.service'
import type { RoomFormData, RoomFormOptions } from '@/types/room'

export function useRoomForm() {
  /* ===== options ===== */
  const [options, setOptions] = useState<RoomFormOptions>({
    roomTypes: [],
    stays: []
  })

  /* ===== form data ===== */
  const [formData, setFormData] = useState<RoomFormData>({
    stayID: '',
    roomTypeID: '',

    roomName: '',
    capacity: 2,
    quantity: 1,
    currentPrice: 0,
    description: '',
    image: []
  })
   const roomTypeOptions = useMemo(() =>
      options.roomTypes.map(r => ({
        value: r.roomTypeID,
        label: r.roomType,
      })),
      [options.roomTypes]
    )

    const stayOptions = useMemo(() =>
      options.stays.map(s => ({
        value: s.stayID,
        label: s.stayName,
        address: s.address,
        images: s.images
      })),
      [options.stays]
    )



  useEffect(() => {
    roomService.getFormData?.()
      .then(res => {
        if (res?.ok) {
          console.log(res.data)
          setOptions({
            roomTypes: res.data ?? [],
            stays: res.data.stays ?? []
          })
        }
      })
      .catch(console.error)
  }, [])


  /* ===== handlers ===== */
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

    const setImages = (images: string[]) => {
      setFormData(prev => ({
          ...prev,
          image: images
      }))
    }
  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      image: [...(prev.image ?? []), '']
    }))
  }

  const clearForm = () => {
    setFormData({
      stayID: '',
      roomName: '',
      roomTypeID: '',
      capacity: 2,
      quantity: 1,
      currentPrice: 0,
      description: '',
      image: []
    })
  }

  const submit = async (image?: string[]) => {
    const fd = buildRoomFormData({
      ...formData,
      currentPrice: Number(formData.currentPrice),
      capacity: Number(formData.capacity),
      quantity: Number(formData.quantity),
      image: image
    })

    return roomService.createRoom(fd)
  }

  return {
    formData,
    options,
    stayOptions,
    roomTypeOptions,
    onChange,
    setImages,
    addImage,
    clearForm,
    submit
  }
}
function buildRoomFormData(data: RoomFormData): FormData {
  const fd = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return

    if (Array.isArray(value)) {
      value.forEach(v => {
        if (v instanceof File) {
          fd.append(`${key}[]`, v)
        } else {
          fd.append(`${key}[]`, String(v))
        }
      })
    } else {
      fd.append(key, String(value))
    }
  })

  return fd
}
