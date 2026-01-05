import { useEffect, useState } from 'react'
import { stayService } from '../service/stay.service'
import type { StayFormData, StayFormOptions } from '@/types/stays'

export function useStayForm() {
  const [options, setOptions] = useState<StayFormOptions>({
    locations: [],
    categories: []
  })

  const [formData, setFormData] = useState<StayFormData>({
    locationID: '',
    serviceID: '',
    categoryID: '',

    stayName: '',
    description: '',
    address: '',

    price: '',
    rate: '',

    image: []
  })
    const locationOptions = options.locations.map((l) => ({
        value: l.locationID,
        label: l.locationName
    }))

    const categoryOptions = options.categories.map((c) => ({
        value: c.categoryID,
        label: c.categoryName
    }))


  /* ===== fetch selector data ===== */
  useEffect(() => {
  stayService.getFormData()
    .then(res => {
      if (res.ok) {
        setOptions({
          locations: res.data.locations ?? [],
          categories: res.data.categories ?? []
        })
      }
    })
    .catch(console.error)
}, [])

  /* ===== handlers ===== */
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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

  const submit = async (images?: string[]) => {  
        const fd = buildStayFormData({
        ...formData,  
        image: images,
        price: Number(formData.price),
        rate: formData.rate ? Number(formData.rate) : null
    })

    return stayService.createStay(fd)
  }

  return {
    options,
    formData,
    locationOptions,
    categoryOptions,
    onChange,
    setImages,
    addImage,
    submit
  }
}

export function buildStayFormData(data: StayFormData): FormData {
  const fd = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return

    if (Array.isArray(value)) {
      value.forEach(v => {
        fd.append(`${key}[]`, String(v))
      })
    } else {
      fd.append(key, String(value))
    }
  })

  return fd
}
