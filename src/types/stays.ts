export interface StayObject {
    stayName: string;
    location: string;
    address: string;
    rating: string;
    price: string;
    image?: string;
    days?: number; // Số ngày lưu trú
    totalPrice?: number; // Tổng giá (PascalCase để khớp với BE)
}
export interface StayFormData {
  locationID: string
  serviceID: string
  categoryID: string

  stayName: string
  description?: string | null
  location?: string | null
  address?: string | null

  price: number | string
  rate?: number | string | null

  image?: string[]
}
export interface LocationOption {
  locationID: string
  locationName: string
}

export interface ServiceOption {
  serviceID: string
  serviceType: string
}

export interface CategoryOption {
  categoryID: string
  categoryName: string
}

export interface StayFormOptions {
  locations: LocationOption[]
  services: ServiceOption[]
  categories: CategoryOption[]
}

