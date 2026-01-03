'use client'

import { useEffect, useRef, useState } from 'react'
import { roomService } from '@/app/staff/service/room.service'
import type { RoomFormData, RoomFormOptions } from '@/types/room'

export function useRoomForm(stayID: string) {
  /* ===== options ===== */
  const [options, setOptions] = useState<RoomFormOptions>({
    roomTypes: []
  })

  /* ===== form data ===== */
  const [formData, setFormData] = useState<RoomFormData>({
    stayID,
    roomName: '',
    roomTypeID: '',
    capacity: 2,
    quantity: 1,
    currentPrice: 0,
    description: '',
    image: []
  })

  /* ===== image preview ===== */
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const imageFilesRef = useRef<File[]>([])
  const objectUrlsRef = useRef<string[]>([])

  /* ===== fetch select data ===== */
  useEffect(() => {
    roomService.getFormData?.()
      .then(res => {
        if (res?.ok) {
          setOptions({
            roomTypes: res.data.roomTypes ?? []
          })
        }
      })
      .catch(console.error)
  }, [])

  /* ===== cleanup preview ===== */
  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(u => URL.revokeObjectURL(u))
      objectUrlsRef.current = []
    }
  }, [])

  /* ===== handlers ===== */
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const setImages = (files: File[]) => {
    objectUrlsRef.current.forEach(u => URL.revokeObjectURL(u))
    objectUrlsRef.current = []

    imageFilesRef.current = files
    const previews = files.map(f => {
      const url = URL.createObjectURL(f)
      objectUrlsRef.current.push(url)
      return url
    })

    setImagePreviews(previews)
    setFormData(prev => ({ ...prev, image: files }))
  }

  const clearForm = () => {
    setFormData({
      stayID,
      roomName: '',
      roomTypeID: '',
      capacity: 2,
      quantity: 1,
      currentPrice: 0,
      description: '',
      image: []
    })

    imageFilesRef.current = []
    imagePreviews.forEach(u => URL.revokeObjectURL(u))
    setImagePreviews([])
    objectUrlsRef.current = []
  }

  /* ===== submit ===== */
  const submit = async () => {
    const fd = buildRoomFormData({
      ...formData,
      currentPrice: Number(formData.currentPrice),
      capacity: Number(formData.capacity),
      quantity: Number(formData.quantity)
    })

    return roomService.createRoom(fd)
  }

  /* ===== select options ===== */
  const roomTypeOptions = options.roomTypes.map(r => ({
    value: r.roomTypeID,
    label: r.roomTypeName
  }))

  return {
    formData,
    options,
    roomTypeOptions,

    imagePreviews,

    onChange,
    setImages,
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
