export interface StayObject {
    stayName: string;
    address: string;
    rating: string;
    price: string;
    image?: string[];
    days?: number;
    totalPrice?: number; 
}
export interface StayHome {
  stayName: string;
  address: string;
  rating: number | null;
  price: string;
  images: string[];
}

export interface StayFormData {
  locationID: string
  serviceID: string
  categoryID: string

  stayName: string
  description?: string | null
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

